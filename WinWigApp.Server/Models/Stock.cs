namespace WinWigApp.Server.Models;

public class Stock
{
    public string Symbol { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal CurrentPrice { get; set; }
    public long Volume { get; set; }
    public decimal OpenPrice { get; set; }
    public decimal ClosePrice { get; set; }
    public decimal PeRatio { get; set; }
    public decimal PbRatio { get; set; }
    public decimal Roe { get; set; }
    public decimal Change { get; set; }
    public decimal ChangePercent { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation properties
    public ICollection<Transaction> Transactions { get; set; } = [];
    public ICollection<Portfolio> Portfolios { get; set; } = [];
}
