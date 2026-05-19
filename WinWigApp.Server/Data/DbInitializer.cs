using WinWigApp.Server.Models;

namespace WinWigApp.Server.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(WinWigDbContext context)
    {
        try
        {
            System.Console.WriteLine("========== DbInitializer.InitializeAsync STARTED ==========");

            // Ensure database is created
            await context.Database.EnsureCreatedAsync();
            System.Console.WriteLine("✓ Database created/verified");

            // Check if stocks already exist
            var existingCount = context.Stocks.Count();
            if (existingCount > 0)
            {
                System.Console.WriteLine($"✓ Database already initialized with {existingCount} stocks. Skipping seeding.");
                return;
            }

            System.Console.WriteLine("! Database empty. Seeding WIG20 stocks...");

            // Add WIG20 stocks
            var stocks = new[]
            {
                new Stock { Symbol = "ALR", Name = "Alior Bank" },
                new Stock { Symbol = "ALE", Name = "ALE" },
                new Stock { Symbol = "BDX", Name = "BDX" },
                new Stock { Symbol = "CDR", Name = "CD Projekt" },
                new Stock { Symbol = "DNP", Name = "Cyfrowy Polsat" },
                new Stock { Symbol = "EBP", Name = "Dino Polska" },
                new Stock { Symbol = "KTY", Name = "Jastrzębska Spółka Węglowa" },
                new Stock { Symbol = "KGH", Name = "KGHM Polska Miedź" },
                new Stock { Symbol = "KRU", Name = "Grupa Lotos" },
                new Stock { Symbol = "LPP", Name = "LPP" },
                new Stock { Symbol = "MBK", Name = "mBank" },
                new Stock { Symbol = "MDV", Name = "Orange Polska" },
                new Stock { Symbol = "PEO", Name = "Bank Pekao" },
                new Stock { Symbol = "PCO", Name = "Polskie Górnictwo Naftowe i Gazownictwo" },
                new Stock { Symbol = "PGE", Name = "PGE Polska Grupa Energetyczna" },
                new Stock { Symbol = "PKN", Name = "PKN Orlen" },
                new Stock { Symbol = "PKO", Name = "PKO Bank Polski" },
                new Stock { Symbol = "PZU", Name = "PZU" },
                new Stock { Symbol = "TPE", Name = "Tauron Polska Energia" },
                new Stock { Symbol = "ZAB", Name = "Zabrze" }
            };

            context.Stocks.AddRange(stocks);
            var saveCount = await context.SaveChangesAsync();
            System.Console.WriteLine($"✓ Seeded {saveCount} Stock records");
            System.Console.WriteLine("========== DbInitializer.InitializeAsync COMPLETED ==========");
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"========== DbInitializer.InitializeAsync FAILED ==========");
            System.Console.WriteLine($"ERROR: {ex.Message}");
            System.Console.WriteLine($"STACK: {ex.StackTrace}");
            throw;
        }
    }
}
