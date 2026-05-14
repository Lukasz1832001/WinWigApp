namespace WinWigApp.Server.DTOs;

public class StockResponse
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
}
