namespace WinWigApp.Server.Models;

public class Portfolio
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal AvgPrice { get; set; }
    public decimal? StopLoss { get; set; }

    // Foreign keys and navigation properties
    public User User { get; set; } = null!;
    public Stock Stock { get; set; } = null!;
}
