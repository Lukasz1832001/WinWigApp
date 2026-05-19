using System;
using System.Collections.Generic;

namespace WinWigApp.Server.Models;

public class Stock
{
    // Klucz główny (np. "PKO", "PKN")
    public string Symbol { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    // Dane cenowe z ostatniej aktualizacji
    public decimal CurrentPrice { get; set; }
    public long Volume { get; set; }
    public decimal OpenPrice { get; set; }
    public decimal ClosePrice { get; set; }
    public decimal Change { get; set; }
    public decimal ChangePercent { get; set; }
    public DateTime UpdatedAt { get; set; }

    // POPRAWKA: Dodane wskaźniki fundamentalne aktualizowane z ostatnią sesją
    public decimal PeRatio { get; set; }
    public decimal PbRatio { get; set; }
    public decimal Roe { get; set; }

    // Navigation properties (Twoje dotychczasowe relacje)
    public ICollection<Transaction> Transactions { get; set; } = [];
    public ICollection<Portfolio> Portfolios { get; set; } = [];

    // Relacja do tabeli historycznej cen giełdowych
    public ICollection<StockPrice> Prices { get; set; } = [];
}