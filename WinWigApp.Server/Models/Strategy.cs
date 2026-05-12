namespace WinWigApp.Server.Models;

public class Strategy
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal TargetReturn { get; set; }
    public int InvestmentHorizon { get; set; }
    public decimal RsiLow { get; set; }
    public decimal RsiHigh { get; set; }
    public bool MacdBuy { get; set; }
    public bool Sma50Above200 { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }

    // Foreign keys and navigation properties
    public User User { get; set; } = null!;
}
