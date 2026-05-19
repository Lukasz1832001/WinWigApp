using Microsoft.AspNetCore.Mvc;
using WinWigApp.Server.DTOs;
using WinWigApp.Server.Services;

namespace WinWigApp.Server.Controllers;

[ApiController]
[Route("api/stocks")]
public class StocksController : ControllerBase
{
    private readonly IStockService _stockService;
    private readonly IWig20DataService _dataService;
    private readonly ILogger<StocksController> _logger;

    public StocksController(
        IStockService stockService,
        IWig20DataService dataService,
        ILogger<StocksController> logger)
    {
        _stockService = stockService;
        _dataService = dataService;
        _logger = logger;
    }

    /// <summary>
    /// Pobiera listê spó³ek WIG20
    /// </summary>
    /// <returns>Lista spó³ek z aktualnym cen¹ i danymi technicznymi</returns>
    [HttpGet]
    public async Task<ActionResult<List<StockResponse>>> GetStocks()
    {
        try
        {
            var stocks = await _stockService.GetStocksAsync();
            return Ok(stocks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving stocks");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "B³¹d pobierania listy spó³ek" });
        }
    }

    /// <summary>
    /// Pobiera dane œwiecowe dla spó³ki
    /// </summary>
    /// <param name="symbol">Symbol spó³ki (np. PKO)</param>
    /// <param name="days">Liczba dni danych (1, 7, 30, 90, 252)</param>
    /// <returns>Lista œwiec (OHLCV)</returns>
    [HttpGet("{symbol}/candlestick")]
    public async Task<ActionResult<List<CandlestickData>>> GetCandlestickData(
        [FromRoute] string symbol,
        [FromQuery] int days = 90)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(symbol))
                return BadRequest(new { message = "Symbol jest wymagany" });

            if (days < 1 || days > 252)
                return BadRequest(new { message = "Liczba dni musi byæ miêdzy 1 a 252" });

            var candleData = await _stockService.GetCandlestickDataAsync(symbol, days);
            return Ok(candleData);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving candlestick data for {Symbol}", symbol);
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "B³¹d pobierania danych œwiecowych" });
        }
    }

    /// <summary>
    /// Pobiera wskaŸniki techniczne dla spó³ki
    /// </summary>
    /// <param name="symbol">Symbol spó³ki (np. PKO)</param>
    /// <param name="days">Liczba dni danych (1, 7, 30, 90, 252)</param>
    /// <returns>WskaŸniki techniczne (RSI, MACD, SMA50, SMA200)</returns>
    [HttpGet("{symbol}/technical")]
    public async Task<ActionResult<TechnicalIndicatorsResponse>> GetTechnicalIndicators(
        [FromRoute] string symbol,
        [FromQuery] int days = 90)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(symbol))
                return BadRequest(new { message = "Symbol jest wymagany" });

            if (days < 1 || days > 252)
                return BadRequest(new { message = "Liczba dni musi byæ miêdzy 1 a 252" });

            var indicators = await _stockService.GetTechnicalIndicatorsAsync(symbol, days);
            return Ok(indicators);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving technical indicators for {Symbol}", symbol);
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "B³¹d pobierania wskaŸników technicznych" });
        }
    }

    /// <summary>
    /// Rêcznie pobiera aktualne dane WIG20 z API stooq.pl
    /// Endpoint dostêpny dla administratorów - do testowania
    /// </summary>
    [HttpPost("refresh-data")]
    public async Task<ActionResult<object>> RefreshWig20Data()
    {
        try
        {
            _logger.LogInformation("Manual WIG20 data refresh initiated");
            await _dataService.UpdateDailyDataAsync();
            return Ok(new { message = "Dane WIG20 zosta³y pomyœlnie zaktualizowane" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing WIG20 data");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "B³¹d podczas aktualizacji danych WIG20" });
        }
    }
}
