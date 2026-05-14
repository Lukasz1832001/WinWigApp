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
    private static readonly List<StockResponse> WIG20_STOCKS = new()
    {
        new() { Symbol = "PKO", Name = "PKO Bank Polski", CurrentPrice = 48.25m, Volume = 2150000, OpenPrice = 47.80m, ClosePrice = 48.10m, PeRatio = 8.5m, PbRatio = 1.2m, Roe = 12.3m, Change = 0.45m, ChangePercent = 0.94m },
        new() { Symbol = "PZU", Name = "PZU", CurrentPrice = 42.15m, Volume = 1850000, OpenPrice = 42.50m, ClosePrice = 42.00m, PeRatio = 7.8m, PbRatio = 1.1m, Roe = 11.5m, Change = -0.35m, ChangePercent = -0.82m },
        new() { Symbol = "PGE", Name = "PGE Polska Grupa Energetyczna", CurrentPrice = 8.92m, Volume = 3200000, OpenPrice = 8.75m, ClosePrice = 8.88m, PeRatio = 15.2m, PbRatio = 0.8m, Roe = 5.2m, Change = 0.17m, ChangePercent = 1.94m },
        new() { Symbol = "KGHM", Name = "KGHM Polska MiedŸ", CurrentPrice = 125.40m, Volume = 980000, OpenPrice = 123.50m, ClosePrice = 124.80m, PeRatio = 12.4m, PbRatio = 1.5m, Roe = 9.8m, Change = 1.90m, ChangePercent = 1.54m },
        new() { Symbol = "PKNORLEN", Name = "PKN Orlen", CurrentPrice = 54.30m, Volume = 1650000, OpenPrice = 54.80m, ClosePrice = 54.00m, PeRatio = 6.9m, PbRatio = 0.9m, Roe = 13.1m, Change = -0.50m, ChangePercent = -0.91m },
        new() { Symbol = "ALIOR", Name = "Alior Bank", CurrentPrice = 78.50m, Volume = 720000, OpenPrice = 77.20m, ClosePrice = 78.00m, PeRatio = 9.2m, PbRatio = 1.3m, Roe = 10.5m, Change = 1.30m, ChangePercent = 1.68m },
        new() { Symbol = "CCC", Name = "CCC", CurrentPrice = 95.80m, Volume = 540000, OpenPrice = 94.50m, ClosePrice = 95.20m, PeRatio = 18.5m, PbRatio = 2.1m, Roe = 8.7m, Change = 1.30m, ChangePercent = 1.37m },
        new() { Symbol = "CDPROJEKT", Name = "CD Projekt", CurrentPrice = 185.20m, Volume = 1250000, OpenPrice = 182.50m, ClosePrice = 184.00m, PeRatio = 22.3m, PbRatio = 3.2m, Roe = 15.4m, Change = 3.70m, ChangePercent = 2.04m },
        new() { Symbol = "CYFRPLSAT", Name = "Cyfrowy Polsat", CurrentPrice = 12.45m, Volume = 1850000, OpenPrice = 12.30m, ClosePrice = 12.38m, PeRatio = 11.8m, PbRatio = 1.6m, Roe = 9.2m, Change = 0.15m, ChangePercent = 1.22m },
        new() { Symbol = "DINOPL", Name = "Dino Polska", CurrentPrice = 385.00m, Volume = 420000, OpenPrice = 380.50m, ClosePrice = 383.20m, PeRatio = 28.5m, PbRatio = 5.8m, Roe = 22.5m, Change = 4.50m, ChangePercent = 1.18m },
        new() { Symbol = "JSW", Name = "Jastrzêbska Spó³ka Wêglowa", CurrentPrice = 28.75m, Volume = 1120000, OpenPrice = 28.20m, ClosePrice = 28.50m, PeRatio = 5.2m, PbRatio = 0.7m, Roe = 14.8m, Change = 0.55m, ChangePercent = 1.95m },
        new() { Symbol = "LPP", Name = "LPP", CurrentPrice = 14250.00m, Volume = 12000, OpenPrice = 14100.00m, ClosePrice = 14200.00m, PeRatio = 21.5m, PbRatio = 4.2m, Roe = 18.3m, Change = 150.00m, ChangePercent = 1.06m },
        new() { Symbol = "LOTOS", Name = "Grupa Lotos", CurrentPrice = 68.40m, Volume = 890000, OpenPrice = 67.80m, ClosePrice = 68.10m, PeRatio = 8.7m, PbRatio = 1.1m, Roe = 11.2m, Change = 0.60m, ChangePercent = 0.88m },
        new() { Symbol = "MBANK", Name = "mBank", CurrentPrice = 520.50m, Volume = 165000, OpenPrice = 515.00m, ClosePrice = 518.00m, PeRatio = 10.3m, PbRatio = 1.4m, Roe = 12.8m, Change = 5.50m, ChangePercent = 1.07m },
        new() { Symbol = "ORANGEPL", Name = "Orange Polska", CurrentPrice = 7.85m, Volume = 2850000, OpenPrice = 7.75m, ClosePrice = 7.80m, PeRatio = 13.2m, PbRatio = 1.0m, Roe = 7.5m, Change = 0.10m, ChangePercent = 1.29m },
        new() { Symbol = "PEKAO", Name = "Bank Pekao", CurrentPrice = 165.80m, Volume = 580000, OpenPrice = 164.20m, ClosePrice = 165.00m, PeRatio = 9.8m, PbRatio = 1.5m, Roe = 13.5m, Change = 1.60m, ChangePercent = 0.97m },
        new() { Symbol = "PGN", Name = "Polskie Górnictwo Naftowe i Gazownictwo", CurrentPrice = 5.62m, Volume = 4200000, OpenPrice = 5.55m, ClosePrice = 5.58m, PeRatio = 14.5m, PbRatio = 0.9m, Roe = 6.2m, Change = 0.07m, ChangePercent = 1.26m },
        new() { Symbol = "SANPL", Name = "Santander Bank Polska", CurrentPrice = 425.00m, Volume = 245000, OpenPrice = 420.50m, ClosePrice = 423.00m, PeRatio = 11.2m, PbRatio = 1.6m, Roe = 14.2m, Change = 4.50m, ChangePercent = 1.07m },
        new() { Symbol = "TAURONPE", Name = "Tauron Polska Energia", CurrentPrice = 1.82m, Volume = 5800000, OpenPrice = 1.78m, ClosePrice = 1.80m, PeRatio = 8.5m, PbRatio = 0.5m, Roe = 4.8m, Change = 0.04m, ChangePercent = 2.25m },
        new() { Symbol = "TPE", Name = "Tauron Polska Energia (TPE)", CurrentPrice = 3.45m, Volume = 3200000, OpenPrice = 3.38m, ClosePrice = 3.42m, PeRatio = 9.8m, PbRatio = 0.7m, Roe = 5.5m, Change = 0.07m, ChangePercent = 2.07m }
    };

    public Task<List<StockResponse>> GetStocksAsync()
    {
        return Task.FromResult(WIG20_STOCKS);
    }

    public Task<List<CandlestickData>> GetCandlestickDataAsync(string symbol, int days)
    {
        var stock = WIG20_STOCKS.FirstOrDefault(s => s.Symbol == symbol);
        if (stock == null)
            return Task.FromResult(new List<CandlestickData>());

        var candleData = GenerateCandlestickData(stock.CurrentPrice, days);
        return Task.FromResult(candleData);
    }

    public Task<TechnicalIndicatorsResponse> GetTechnicalIndicatorsAsync(string symbol, int days)
    {
        var stock = WIG20_STOCKS.FirstOrDefault(s => s.Symbol == symbol);
        if (stock == null)
            return Task.FromResult(new TechnicalIndicatorsResponse());

        var candleData = GenerateCandlestickData(stock.CurrentPrice, days);
        var indicators = CalculateTechnicalIndicators(candleData);
        
        return Task.FromResult(indicators);
    }

    private static List<CandlestickData> GenerateCandlestickData(decimal basePrice, int days)
    {
        var data = new List<CandlestickData>();
        decimal price = basePrice * 0.9m;
        var random = new Random();

        for (int i = 0; i < days; i++)
        {
            var open = price;
            const decimal volatility = 0.03m;
            var change = (decimal)(random.NextDouble() - 0.48) * price * volatility;
            var close = open + change;
            var high = Math.Max(open, close) * (1 + (decimal)random.NextDouble() * 0.02m);
            var low = Math.Min(open, close) * (1 - (decimal)random.NextDouble() * 0.02m);
            var volume = (long)(random.NextDouble() * 2000000) + 500000;

            data.Add(new CandlestickData
            {
                Timestamp = new DateTimeOffset(DateTime.UtcNow.AddDays(-(days - i))).ToUnixTimeMilliseconds(),
                Open = open,
                High = high,
                Low = low,
                Close = close,
                Volume = volume
            });

            price = close;
        }

        return data;
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
                rsi.Add(50);
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

            var avgGain = gains.Count > 0 ? gains.Sum() / 14 : 0;
            var avgLoss = losses.Count > 0 ? losses.Sum() / 14 : 0;

            if (avgLoss == 0)
            {
                rsi.Add(100);
            }
            else
            {
                var rs = avgGain / avgLoss;
                var rsiValue = 100 - (100 / (1 + rs));
                rsi.Add(rsiValue);
            }
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
                Value = macdLine[i],
                Signal = signal[i],
                Histogram = macdLine[i] - signal[i]
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
        var k = 2m / (period + 1);
        var ema = new List<decimal> { data[0] };

        for (int i = 1; i < data.Count; i++)
        {
            var value = data[i] * k + ema[i - 1] * (1 - k);
            ema.Add(value);
        }

        return ema;
    }
}
