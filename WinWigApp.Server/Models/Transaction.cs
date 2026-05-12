namespace WinWigApp.Server.Models;

public enum TransactionType
{
    Buy,
    Sell
}

public class Transaction
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public TransactionType Type { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal Total { get; set; }
    public decimal? StopLoss { get; set; }
    public DateTime Timestamp { get; set; }

    // Foreign keys and navigation properties
    public User User { get; set; } = null!;
    public Stock Stock { get; set; } = null!;
}
