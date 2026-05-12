// Przyk³ad kontrolera chronionego autentykacj¹

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WinWigApp.Server.Data;

namespace WinWigApp.Server.Controllers;

[ApiController]
[Route("api/portfolio")]
[Authorize] // Wymaga JWT token
public class PortfolioController : ControllerBase
{
    private readonly WinWigDbContext _context;
    private readonly ILogger<PortfolioController> _logger;

    public PortfolioController(WinWigDbContext context, ILogger<PortfolioController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetPortfolio()
    {
        try
        {
            // Pobierz ID zalogowanego u¿ytkownika z tokenu
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userIdGuid))
            {
                return Unauthorized(new { message = "U¿ytkownik nie jest autoryzowany" });
            }

            // Pobranie portfolio u¿ytkownika
            var portfolio = _context.Portfolios
                .Where(p => p.UserId == userIdGuid)
                .ToList();

            return Ok(portfolio);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "B³¹d podczas pobierania portfolio");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "B³¹d serwera" });
        }
    }

    [HttpGet("balance")]
    public IActionResult GetBalance()
    {
        try
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var userIdGuid))
            {
                return Unauthorized(new { message = "U¿ytkownik nie jest autoryzowany" });
            }

            var user = _context.Users.Find(userIdGuid);
            if (user == null)
            {
                return NotFound(new { message = "U¿ytkownik nie znaleziony" });
            }

            return Ok(new { balance = user.Balance });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "B³¹d podczas pobierania salda");
            return StatusCode(StatusCodes.Status500InternalServerError, 
                new { message = "B³¹d serwera" });
        }
    }
}
