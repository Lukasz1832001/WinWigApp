namespace WinWigApp.Server.Models;

public class Deposit
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public decimal Amount { get; set; }
    public string Method { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }

    // Foreign keys and navigation properties
    public User User { get; set; } = null!;
}
