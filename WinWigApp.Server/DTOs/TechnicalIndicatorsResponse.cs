namespace WinWigApp.Server.DTOs;

public class MacdIndicator
{
    public decimal Value { get; set; }
    public decimal Signal { get; set; }
    public decimal Histogram { get; set; }
}

public class TechnicalIndicatorsResponse
{
    public decimal[] Rsi { get; set; } = [];
    public MacdIndicator[] Macd { get; set; } = [];
    public decimal[] Sma50 { get; set; } = [];
    public decimal[] Sma200 { get; set; } = [];
}
