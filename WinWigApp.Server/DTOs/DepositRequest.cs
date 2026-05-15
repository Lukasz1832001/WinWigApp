namespace WinWigApp.Server.DTOs;

public class DepositRequest
{
    public decimal Amount { get; set; }
    public string Method { get; set; } = string.Empty;
}
