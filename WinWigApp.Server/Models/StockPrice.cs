using System;

namespace WinWigApp.Server.Models;

public class StockPrice
{
    public long Id { get; set; }
    public string StockSymbol { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal Open { get; set; }
    public decimal High { get; set; }
    public decimal Low { get; set; }
    public decimal Close { get; set; }
    public long Volume { get; set; }
    public DateTime CreatedAt { get; set; }

    // Historyczne wartości wskaźników dla danego dnia giełdowego (nullable, na wypadek braków danych)
    public decimal? PeRatio { get; set; }
    public decimal? PbRatio { get; set; }
    public decimal? Roe { get; set; }

    // Foreign key i nawigacja do głównego słownika spółek
    public Stock? Stock { get; set; }
}