using Microsoft.EntityFrameworkCore;
using WinWigApp.Server.Data;
using WinWigApp.Server.DTOs;

namespace WinWigApp.Server.Services;

public interface IStockService
{
    Task<List<StockResponse>> GetStocksAsync();
    Task<List<CandlestickData>> GetCandlestickDataAsync(string symbol, int days);
    Task<TechnicalIndicatorsResponse> GetTechnicalIndicatorsAsync(string symbol, int days);
}

public class StockService : IStockService
{
    private readonly WinWigDbContext _context;
    private readonly ILogger<StockService> _logger;

    private static readonly List<StockResponse> WIG20_STOCKS = new()
    {
        new() { Symbol = "PKO", Name = "PKO Bank Polski", CurrentPrice = 48.25m, Volume = 2150000, OpenPrice = 47.80m, ClosePrice = 48.10m, PeRatio = 8.5m, PbRatio = 1.2m, Roe = 12.3m, Change = 0.45m, ChangePercent = 0.94m },
        new() { Symbol = "PZU", Name = "PZU SA", CurrentPrice = 42.15m, Volume = 1850000, OpenPrice = 42.50m, ClosePrice = 42.00m, PeRatio = 7.8m, PbRatio = 1.1m, Roe = 11.5m, Change = -0.35m, ChangePercent = -0.82m },
        new() { Symbol = "PGE", Name = "PGE", CurrentPrice = 8.92m, Volume = 3200000, OpenPrice = 8.75m, ClosePrice = 8.88m, PeRatio = 15.2m, PbRatio = 0.8m, Roe = 5.2m, Change = 0.17m, ChangePercent = 1.94m },
        new() { Symbol = "KGH", Name = "KGHM Polska Miedü", CurrentPrice = 125.40m, Volume = 980000, OpenPrice = 123.50m, ClosePrice = 124.80m, PeRatio = 12.4m, PbRatio = 1.5m, Roe = 9.8m, Change = 1.90m, ChangePercent = 1.54m },
        new() { Symbol = "PKN", Name = "ORLEN", CurrentPrice = 54.30m, Volume = 1650000, OpenPrice = 54.80m, ClosePrice = 54.00m, PeRatio = 6.9m, PbRatio = 0.9m, Roe = 13.1m, Change = -0.50m, ChangePercent = -0.91m },
        new() { Symbol = "ALR", Name = "Alior Bank", CurrentPrice = 78.50m, Volume = 720000, OpenPrice = 77.20m, ClosePrice = 78.00m, PeRatio = 9.2m, PbRatio = 1.3m, Roe = 10.5m, Change = 1.30m, ChangePercent = 1.68m },
        new() { Symbol = "BDX", Name = "Budimex", CurrentPrice = 95.80m, Volume = 540000, OpenPrice = 94.50m, ClosePrice = 95.20m, PeRatio = 18.5m, PbRatio = 2.1m, Roe = 8.7m, Change = 1.30m, ChangePercent = 1.37m },
        new() { Symbol = "CDR", Name = "CD Projekt", CurrentPrice = 185.20m, Volume = 1250000, OpenPrice = 182.50m, ClosePrice = 184.00m, PeRatio = 22.3m, PbRatio = 3.2m, Roe = 15.4m, Change = 3.70m, ChangePercent = 2.04m },
        new() { Symbol = "DNP", Name = "Dino Polska", CurrentPrice = 385.00m, Volume = 420000, OpenPrice = 380.50m, ClosePrice = 383.20m, PeRatio = 28.5m, PbRatio = 5.8m, Roe = 22.5m, Change = 4.50m, ChangePercent = 1.18m },
        new() { Symbol = "KRU", Name = "Kruk", CurrentPrice = 68.40m, Volume = 890000, OpenPrice = 67.80m, ClosePrice = 68.10m, PeRatio = 8.7m, PbRatio = 1.1m, Roe = 11.2m, Change = 0.60m, ChangePercent = 0.88m },
        new() { Symbol = "MBK", Name = "mBank", CurrentPrice = 520.50m, Volume = 165000, OpenPrice = 515.00m, ClosePrice = 518.00m, PeRatio = 10.3m, PbRatio = 1.4m, Roe = 12.8m, Change = 5.50m, ChangePercent = 1.07m },
        new() { Symbol = "PEO", Name = "Bank Pekao", CurrentPrice = 165.80m, Volume = 580000, OpenPrice = 164.20m, ClosePrice = 165.00m, PeRatio = 9.8m, PbRatio = 1.5m, Roe = 13.5m, Change = 1.60m, ChangePercent = 0.97m },
        new() { Symbol = "TPE", Name = "Tauron Polska Energia", CurrentPrice = 1.82m, Volume = 5800000, OpenPrice = 1.78m, ClosePrice = 1.80m, PeRatio = 8.5m, PbRatio = 0.5m, Roe = 4.8m, Change = 0.04m, ChangePercent = 2.25m }
    };

    public StockService(WinWigDbContext context, ILogger<StockService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<StockResponse>> GetStocksAsync()
    {
        try
        {
            _logger.LogInformation("GetStocksAsync: Starting to fetch latest stock prices from database");

            // Pobieranie najnowszych cen per symbol ó GroupBy z OrderByDescending w ramach grupy
            var latestPrices = await _context.StockPrices
                .GroupBy(sp => sp.StockSymbol)
                .Select(g => g.OrderByDescending(sp => sp.Date).First())
                .ToListAsync();

            _logger.LogInformation("GetStocksAsync: Found {Count} stock price records in database", latestPrices.Count);

            if (!latestPrices.Any())
            {
                _logger.LogWarning("GetStocksAsync: Database is empty (no StockPrice records found). Returning mock data as fallback.");
                return WIG20_STOCKS;
            }

            var stocks = await _context.Stocks.ToListAsync();
            _logger.LogInformation("GetStocksAsync: Found {Count} stock definitions in database", stocks.Count);

            var stockMap = stocks.ToDictionary(s => s.Symbol, s => s);

            var result = latestPrices.Select(sp =>
            {
                var hasMeta = stockMap.TryGetValue(sp.StockSymbol, out var meta);
                decimal change = sp.Close - sp.Open;
                decimal changePercent = sp.Open != 0 ? (change / sp.Open) * 100m : 0m;

                return new StockResponse
                {
                    Symbol = sp.StockSymbol,
                    CurrentPrice = sp.Close,
                    OpenPrice = sp.Open,
                    ClosePrice = sp.Close,
                    Volume = sp.Volume,
                    Name = hasMeta ? meta!.Name : sp.StockSymbol,
                    Change = Math.Round(change, 2),
                    ChangePercent = Math.Round(changePercent, 2),
                    // Pobieranie wartoúci zapisanych przez zaktualizowany Wig20DataService
                    PeRatio = hasMeta ? meta!.PeRatio : (sp.PeRatio ?? 0m),
                    PbRatio = hasMeta ? meta!.PbRatio : (sp.PbRatio ?? 0m),
                    Roe = hasMeta ? meta!.Roe : (sp.Roe ?? 0m)
                };
            }).ToList();

            _logger.LogInformation("GetStocksAsync: Successfully returning {Count} stocks with current data", result.Count);
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "GetStocksAsync: Error fetching data from database. Returning mock data as fallback.");
            return WIG20_STOCKS;
        }
    }

    public async Task<List<CandlestickData>> GetCandlestickDataAsync(string symbol, int days)
    {
        try
        {
            var cutoffDate = DateTime.UtcNow.Date.AddDays(-days);

            var stockPrices = await _context.StockPrices
                .Where(sp => sp.StockSymbol == symbol && sp.Date >= cutoffDate)
                .OrderBy(sp => sp.Date)
                .ToListAsync();

            if (!stockPrices.Any()) return new List<CandlestickData>();

            return stockPrices.Select(sp => new CandlestickData
            {
                Timestamp = new DateTimeOffset(sp.Date).ToUnixTimeMilliseconds(),
                Open = sp.Open,
                High = sp.High,
                Low = sp.Low,
                Close = sp.Close,
                Volume = sp.Volume
            }).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving candlestick data for {Symbol}", symbol);
            return new List<CandlestickData>();
        }
    }

    public async Task<TechnicalIndicatorsResponse> GetTechnicalIndicatorsAsync(string symbol, int days)
    {
        try
        {
            int totalDaysToFetch = days + 260;
            var cutoffDate = DateTime.UtcNow.Date.AddDays(-totalDaysToFetch);

            var stockPrices = await _context.StockPrices
                .Where(sp => sp.StockSymbol == symbol && sp.Date >= cutoffDate)
                .OrderBy(sp => sp.Date)
                .ToListAsync();

            if (!stockPrices.Any())
                return new TechnicalIndicatorsResponse();

            var candleData = stockPrices.Select(sp => new CandlestickData
            {
                Timestamp = new DateTimeOffset(sp.Date).ToUnixTimeMilliseconds(),
                Open = sp.Open,
                High = sp.High,
                Low = sp.Low,
                Close = sp.Close,
                Volume = sp.Volume
            }).ToList();

            var fullIndicators = CalculateTechnicalIndicators(candleData);
            int itemsToTake = Math.Min(days, candleData.Count);
            int startIndex = Math.Max(0, fullIndicators.Rsi.Length - itemsToTake);

            return new TechnicalIndicatorsResponse
            {
                Rsi = fullIndicators.Rsi.Skip(startIndex).Select(v => Math.Round(v, 2)).ToArray(),
                Macd = fullIndicators.Macd.Skip(startIndex).ToArray(),
                Sma50 = fullIndicators.Sma50.Skip(startIndex).Select(v => Math.Round(v, 2)).ToArray(),
                Sma200 = fullIndicators.Sma200.Skip(startIndex).Select(v => Math.Round(v, 2)).ToArray()
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calculating technical indicators for {Symbol}", symbol);
            return new TechnicalIndicatorsResponse();
        }
    }

    private static TechnicalIndicatorsResponse CalculateTechnicalIndicators(List<CandlestickData> candleData)
    {
        var closes = candleData.Select(c => c.Close).ToList();

        var rsi = CalculateRSI(closes);
        var macd = CalculateMACD(closes);
        var sma50 = CalculateSMA(closes, 50);
        var sma200 = CalculateSMA(closes, 200);

        return new TechnicalIndicatorsResponse
        {
            Rsi = rsi.ToArray(),
            Macd = macd.ToArray(),
            Sma50 = sma50.ToArray(),
            Sma200 = sma200.ToArray()
        };
    }

    private static List<decimal> CalculateRSI(List<decimal> closes)
    {
        var rsi = new List<decimal>();
        for (int i = 0; i < closes.Count; i++)
        {
            if (i < 14)
            {
                rsi.Add(50m);
                continue;
            }

            var gains = new List<decimal>();
            var losses = new List<decimal>();

            for (int j = i - 13; j <= i; j++)
            {
                var change = closes[j] - closes[j - 1];
                if (change > 0)
                    gains.Add(change);
                else
                    losses.Add(Math.Abs(change));
            }

            var avgGain = gains.Count > 0 ? gains.Sum() / 14m : 0m;
            var avgLoss = losses.Count > 0 ? losses.Sum() / 14m : 0m;

            if (avgLoss == 0)
                rsi.Add(100m);
            else
                rsi.Add(100m - (100m / (1m + (avgGain / avgLoss))));
        }
        return rsi;
    }

    private static List<MacdIndicator> CalculateMACD(List<decimal> closes)
    {
        var ema12 = CalculateEMA(closes, 12);
        var ema26 = CalculateEMA(closes, 26);
        var macdLine = ema12.Select((v, i) => v - ema26[i]).ToList();
        var signal = CalculateEMA(macdLine, 9);

        var macd = new List<MacdIndicator>();
        for (int i = 0; i < macdLine.Count; i++)
        {
            macd.Add(new MacdIndicator
            {
                Value = Math.Round(macdLine[i], 4),
                Signal = Math.Round(signal[i], 4),
                Histogram = Math.Round(macdLine[i] - signal[i], 4)
            });
        }
        return macd;
    }

    private static List<decimal> CalculateSMA(List<decimal> closes, int period)
    {
        var sma = new List<decimal>();
        for (int i = 0; i < closes.Count; i++)
        {
            if (i < period - 1)
            {
                sma.Add(closes[i]);
            }
            else
            {
                var sum = closes.Skip(i - period + 1).Take(period).Sum();
                sma.Add(sum / period);
            }
        }
        return sma;
    }

    private static List<decimal> CalculateEMA(List<decimal> data, int period)
    {
        if (!data.Any()) return new List<decimal>();

        var k = 2m / (period + 1);
        var ema = new List<decimal> { data[0] };

        for (int i = 1; i < data.Count; i++)
        {
            var value = data[i] * k + ema[i - 1] * (1m - k);
            ema.Add(value);
        }
        return ema;
    }
}