using WinWigApp.Server.Data;
using WinWigApp.Server.DTOs;

namespace WinWigApp.Server.Services;

public interface IWalletService
{
    Task<DepositResponse> DepositAsync(Guid userId, DepositRequest request);
    Task<List<DepositsResponse>> GetDepositsAsync(Guid userId);
    Task<BalanceResponse> GetBalanceAsync(Guid userId);
}

public class WalletService : IWalletService
{
    private readonly WinWigDbContext _context;

    public WalletService(WinWigDbContext context)
    {
        _context = context;
    }

    public async Task<DepositResponse> DepositAsync(Guid userId, DepositRequest request)
    {
        // Validate amount
        if (request.Amount <= 0)
            throw new InvalidOperationException("Kwota musi być większa niż 0");

        if (string.IsNullOrWhiteSpace(request.Method))
            throw new InvalidOperationException("Metoda płatności jest wymagana");

        // Get user
        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        if (user == null)
            throw new InvalidOperationException("Użytkownik nie znaleziony");

        // Update balance
        user.Balance += request.Amount;

        // Create deposit record
        var deposit = new Models.Deposit
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Amount = request.Amount,
            Method = request.Method,
            Timestamp = DateTime.UtcNow
        };

        _context.Deposits.Add(deposit);
        await _context.SaveChangesAsync();

        return new DepositResponse
        {
            Id = deposit.Id.ToString(),
            Amount = request.Amount,
            Method = request.Method,
            Timestamp = deposit.Timestamp,
            NewBalance = user.Balance
        };
    }

    public async Task<List<DepositsResponse>> GetDepositsAsync(Guid userId)
    {
        var deposits = _context.Deposits
            .Where(d => d.UserId == userId)
            .OrderByDescending(d => d.Timestamp)
            .ToList();

        return deposits.Select(d => new DepositsResponse
        {
            Id = d.Id.ToString(),
            Amount = d.Amount,
            Method = d.Method,
            Timestamp = d.Timestamp
        }).ToList();
    }

    public async Task<BalanceResponse> GetBalanceAsync(Guid userId)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        if (user == null)
            throw new InvalidOperationException("Użytkownik nie znaleziony");

        return new BalanceResponse
        {
            Balance = user.Balance
        };
    }
}
