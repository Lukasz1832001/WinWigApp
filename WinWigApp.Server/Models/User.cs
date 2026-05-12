namespace WinWigApp.Server.Models;

public class User
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation properties
    public ICollection<Transaction> Transactions { get; set; } = [];
    public ICollection<Portfolio> Portfolios { get; set; } = [];
    public ICollection<Deposit> Deposits { get; set; } = [];
    public ICollection<Strategy> Strategies { get; set; } = [];
}
