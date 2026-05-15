namespace WinWigApp.Server.DTOs;

public class DepositsResponse
{
    public string Id { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Method { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
}
