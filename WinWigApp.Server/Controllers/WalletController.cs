using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WinWigApp.Server.DTOs;
using WinWigApp.Server.Services;

namespace WinWigApp.Server.Controllers;

[ApiController]
[Route("api/wallet")]
[Authorize]
public class WalletController : ControllerBase
{
    private readonly IWalletService _walletService;
    private readonly ILogger<WalletController> _logger;

    public WalletController(IWalletService walletService, ILogger<WalletController> logger)
    {
        _walletService = walletService;
        _logger = logger;
    }

    private Guid GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            throw new UnauthorizedAccessException("Nie można pobrać ID użytkownika");
        return userId;
    }

    [HttpPost("deposit")]
    public async Task<ActionResult<DepositResponse>> Deposit([FromBody] DepositRequest request)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetUserId();
            var response = await _walletService.DepositAsync(userId, request);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Deposit failed for user {UserId}", GetUserId());
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Deposit error");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Błąd serwera podczas wpłaty" });
        }
    }

    [HttpGet("deposits")]
    public async Task<ActionResult<List<DepositsResponse>>> GetDeposits()
    {
        try
        {
            var userId = GetUserId();
            var response = await _walletService.GetDepositsAsync(userId);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "GetDeposits error");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Błąd serwera podczas pobierania historii wpłat" });
        }
    }

    [HttpGet("balance")]
    public async Task<ActionResult<BalanceResponse>> GetBalance()
    {
        try
        {
            var userId = GetUserId();
            var response = await _walletService.GetBalanceAsync(userId);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "GetBalance failed for user {UserId}", GetUserId());
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "GetBalance error");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Błąd serwera podczas pobierania salda" });
        }
    }
}
