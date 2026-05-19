using System.Globalization;
using Microsoft.EntityFrameworkCore;
using WinWigApp.Server.Data;
using WinWigApp.Server.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace WinWigApp.Server.Services;

public interface IWig20DataService
{
    Task UpdateDailyDataAsync();
}

public class Wig20DataService : BackgroundService, IWig20DataService
{
    private readonly HttpClient _httpClient;
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<Wig20DataService> _logger;
    private readonly string[] _symbols = new[]
    {
        "ALR", "ALE", "BDX", "CDR", "DNP", "EBP", "KTY", "KGH",
        "KRU", "LPP", "MBK", "MDV", "PEO", "PCO", "PGE", "PKN", "PKO",
        "PZU", "TPE", "ZAB"
    };

    public Wig20DataService(
        HttpClient httpClient,
        IServiceProvider serviceProvider,
        ILogger<Wig20DataService> logger)
    {
        _httpClient = httpClient;
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("========== Wig20DataService.ExecuteAsync STARTED ==========");

        try
        {
            _logger.LogInformation("Wig20DataService: Initial data fetch started");
            await UpdateDailyDataAsync();
            _logger.LogInformation("Wig20DataService: Initial data fetch completed");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wig20DataService: Error in initial data fetch");
        }

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var now = DateTime.Now;
                var nextRun = GetNextUpdateTime(now);
                var timeUntilNextRun = nextRun - now;

                _logger.LogInformation("Wig20DataService: Next update scheduled in {Hours:F2} hours at {Time}",
                    timeUntilNextRun.TotalHours, nextRun);

                await Task.Delay(timeUntilNextRun, stoppingToken);

                if (!stoppingToken.IsCancellationRequested)
                {
                    await UpdateDailyDataAsync();
                }
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation("Wig20DataService scheduled update was cancelled");
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Wig20DataService: Error in scheduled update");
                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }
        }

        _logger.LogInformation("========== Wig20DataService.ExecuteAsync STOPPED ==========");
    }

    private DateTime GetNextUpdateTime(DateTime now)
    {
        // DEVELOPMENT MODE: Update every hour (instead of every 6 hours)
        // This allows testing without waiting 6 hours
        var nextRun = now.AddHours(1);

        // Skip weekends
        while (nextRun.DayOfWeek == DayOfWeek.Saturday || nextRun.DayOfWeek == DayOfWeek.Sunday)
        {
            nextRun = nextRun.AddDays(1);
        }

        return nextRun;
    }

    public async Task UpdateDailyDataAsync()
    {
        _logger.LogInformation("========== UpdateDailyDataAsync: Starting daily stock data update ==========");

        try
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<WinWigDbContext>();

                // Sprawdzenie liczby istniejących Stock records
                var stockCount = await dbContext.Stocks.CountAsync();
                _logger.LogInformation("UpdateDailyDataAsync: Found {Count} Stock records in database", stockCount);

                if (stockCount == 0)
                {
                    _logger.LogError("UpdateDailyDataAsync: No Stock records found! DbInitializer may not have run. Aborting update.");
                    return;
                }

                int successCount = 0;
                int errorCount = 0;

                foreach (var symbol in _symbols)
                {
                    try
                    {
                        await FetchAndSaveStockData(dbContext, symbol);
                        successCount++;
                    }
                    catch (Exception ex)
                    {
                        errorCount++;
                        _logger.LogError(ex, "UpdateDailyDataAsync: Error fetching data for symbol {Symbol}", symbol);
                    }
                }

                try
                {
                    var saveCount = await dbContext.SaveChangesAsync();
                    var totalPriceRecords = await dbContext.StockPrices.CountAsync();

                    _logger.LogInformation(
                        "========== UpdateDailyDataAsync: Completed. Saved {SaveCount} changes | Success: {SuccessCount} | Errors: {ErrorCount} | Total StockPrice records in DB: {TotalRecords} ==========",
                        saveCount, successCount, errorCount, totalPriceRecords);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "UpdateDailyDataAsync: Error saving changes to database. Ensure Stock records exist.");
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "========== UpdateDailyDataAsync: Fatal error ==========");
        }
    }

    private async Task FetchAndSaveStockData(WinWigDbContext dbContext, string symbol)
    {
        const int maxRetries = 3;
        const int retryDelayMs = 500;

        for (int attempt = 1; attempt <= maxRetries; attempt++)
        {
            try
            {
                _logger.LogDebug("FetchAndSaveStockData: Fetching data for symbol {Symbol} (attempt {Attempt}/{MaxRetries})", symbol, attempt, maxRetries);

                var url = $"https://stooq.pl/q/l/?s={symbol}&f=sd2t2ohlcvm3m8&h&e=csv";

                using (var cts = new CancellationTokenSource(TimeSpan.FromSeconds(15)))
                {
                    var csv = await _httpClient.GetStringAsync(url, cts.Token);
                    var lines = csv.Split('\n');

                    if (lines.Length < 2)
                    {
                        _logger.LogWarning("FetchAndSaveStockData: No data returned for symbol {Symbol}", symbol);
                        return;
                    }

                    var data = lines[1].Split(',');

                    if (data.Length < 10)
                    {
                        _logger.LogWarning("FetchAndSaveStockData: Incomplete data for symbol {Symbol} (expected 10+ columns, got {Count})", symbol, data.Length);
                        return;
                    }

                    if (!DateTime.TryParseExact(data[1], "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var date))
                    {
                        _logger.LogWarning("FetchAndSaveStockData: Could not parse date for symbol {Symbol}: {Date}", symbol, data[1]);
                        return;
                    }

                    // Parsowanie wskaźników fundamentalnych ze Stooq
                    decimal peRatio = ParseDecimal(data[8]);
                    decimal pbRatio = ParseDecimal(data[9]);

                    // Matematyczne wyliczenie wskaźnika ROE
                    decimal roe = 0m;
                    if (peRatio > 0)
                    {
                        roe = Math.Round((pbRatio / peRatio) * 100m, 2);
                    }

                    var existingPrice = await dbContext.StockPrices
                        .FirstOrDefaultAsync(sp => sp.StockSymbol == symbol && sp.Date == date);

                    if (existingPrice != null)
                    {
                        _logger.LogDebug("FetchAndSaveStockData: Updating existing price record for {Symbol} on {Date}", symbol, date.Date);

                        existingPrice.Open = ParseDecimal(data[3]);
                        existingPrice.High = ParseDecimal(data[4]);
                        existingPrice.Low = ParseDecimal(data[5]);
                        existingPrice.Close = ParseDecimal(data[6]);
                        existingPrice.Volume = ParseLong(data[7]);

                        // Aktualizacja wskaźników w rekordzie historycznym
                        existingPrice.PeRatio = peRatio;
                        existingPrice.PbRatio = pbRatio;
                        existingPrice.Roe = roe;
                    }
                    else
                    {
                        _logger.LogDebug("FetchAndSaveStockData: Creating new price record for {Symbol} on {Date}", symbol, date.Date);

                        var stockPrice = new StockPrice
                        {
                            StockSymbol = symbol,
                            Date = date,
                            Open = ParseDecimal(data[3]),
                            High = ParseDecimal(data[4]),
                            Low = ParseDecimal(data[5]),
                            Close = ParseDecimal(data[6]),
                            Volume = ParseLong(data[7]),

                            // Zapis wskaźników fundamentalnych
                            PeRatio = peRatio,
                            PbRatio = pbRatio,
                            Roe = roe,
                            CreatedAt = DateTime.UtcNow
                        };

                        dbContext.StockPrices.Add(stockPrice);
                    }

                    // Opcjonalnie: Aktualizacja tabeli słownikowej Stocks (metryki globalne spółki)
                    var stockSummary = await dbContext.Stocks.FirstOrDefaultAsync(s => s.Symbol == symbol);
                    if (stockSummary != null)
                    {
                        stockSummary.PeRatio = peRatio;
                        stockSummary.PbRatio = pbRatio;
                        stockSummary.Roe = roe;
                    }

                    _logger.LogInformation("FetchAndSaveStockData: Successfully processed {Symbol} on {Date} | Close: {Close} | PE: {PE} | PB: {PB}", 
                        symbol, date.Date, ParseDecimal(data[6]), peRatio, pbRatio);

                    return; // Success - exit retry loop
                }
            }
            catch (HttpRequestException ex)
            {
                _logger.LogWarning(ex, "FetchAndSaveStockData: HTTP error fetching data for symbol {Symbol} (attempt {Attempt}/{MaxRetries})", symbol, attempt, maxRetries);

                if (attempt < maxRetries)
                {
                    await Task.Delay(retryDelayMs * attempt, CancellationToken.None);
                }
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogWarning(ex, "FetchAndSaveStockData: Request timeout for symbol {Symbol} (attempt {Attempt}/{MaxRetries})", symbol, attempt, maxRetries);

                if (attempt < maxRetries)
                {
                    await Task.Delay(retryDelayMs * attempt, CancellationToken.None);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "FetchAndSaveStockData: Unexpected error processing data for symbol {Symbol} (attempt {Attempt}/{MaxRetries})", symbol, attempt, maxRetries);

                if (attempt < maxRetries)
                {
                    await Task.Delay(retryDelayMs * attempt, CancellationToken.None);
                }
            }
        }

        _logger.LogError("FetchAndSaveStockData: Failed to fetch data for symbol {Symbol} after {MaxRetries} attempts", symbol, maxRetries);
    }

    private decimal ParseDecimal(string value)
    {
        return decimal.TryParse(value, NumberStyles.Any, CultureInfo.InvariantCulture, out var result)
            ? result
            : 0m;
    }

    private long ParseLong(string value)
    {
        return long.TryParse(value, NumberStyles.Any, CultureInfo.InvariantCulture, out var result)
            ? result
            : 0L;
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Wig20DataService is stopping");
        await base.StopAsync(cancellationToken);
    }
}