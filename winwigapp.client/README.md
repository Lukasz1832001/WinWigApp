# WIN_WIG - Platforma Tradingowa

Aplikacja do symulacji handlu akcjami spółek z indeksu WIG20 z pełną funkcjonalnością analizy technicznej i zarządzania portfelem.

## Funkcjonalności

### ✅ Zaimplementowane

#### Autentykacja
- **Logowanie** - Ekran logowania użytkownika
- **Rejestracja** - Tworzenie nowego konta

#### Dashboard
- **Lista spółek WIG20** - Wyświetlanie wszystkich spółek z indeksu
- **Wyszukiwanie** - Szukaj po nazwie lub symbolu
- **Sortowanie** - Sortuj po kursie, wolumenie, zmianie procentowej
- **Filtrowanie po cenie** - Filtruj spółki w wybranym przedziale cenowym

#### Szczegóły spółki
- **Wykres świecowy** - Interaktywny wykres cenowy
- **Analiza techniczna**:
  - RSI (Relative Strength Index)
  - MACD (Moving Average Convergence Divergence)
  - SMA 50 i SMA 200 (średnie kroczące)
- **Interwały czasowe** - 1D, 1W, 1M, 3M, 1Y
- **Podstawowe wskaźniki** - P/E, P/B, ROE, wolumen

#### Transakcje
- **Kupno akcji** - Możliwość zakupu z określeniem ilości
- **Sprzedaż akcji** - Sprzedaż posiadanych akcji
- **Stop Loss** - Ustawianie poziomu stop loss przy transakcji
- **Potwierdzenia** - Szczegółowe potwierdzenie transakcji

#### Portfel
- **Przegląd pozycji** - Lista wszystkich posiadanych akcji
- **Analiza zysków/strat** - Kalkulacja w PLN i %
- **Zarządzanie Stop Loss**:
  - Ustawianie stop loss dla pozycji
  - Edycja istniejącego stop loss
  - Usuwanie stop loss

#### Konto
- **Wpłaty środków** - Trzy metody płatności:
  - Karta kredytowa/debetowa
  - Przelew bankowy
  - BLIK
- **Historia wpłat** - Przegląd wszystkich wpłat
- **Saldo** - Wyświetlanie dostępnych środków

#### Strategie inwestycyjne
- **Tworzenie strategii** - Kreator strategii z parametrami:
  - Planowana stopa zwrotu
  - Horyzont inwestycyjny
  - Warunki RSI (kupno/sprzedaż)
  - Warunki MACD
  - Warunki średnich kroczących
- **Zarządzanie strategiami**:
  - Edycja strategii
  - Usuwanie strategii
  - Aktywacja/dezaktywacja
- **Podgląd strategii** - Karty z szczegółami każdej strategii

#### Historia transakcji
- **Lista transakcji** - Wszystkie operacje kupna/sprzedaży
- **Filtrowanie** - Po typie transakcji (wszystkie/kupno/sprzedaż)
- **Eksport CSV** - Możliwość eksportu historii

## Stack technologiczny

- **React 18.3.1** - Framework UI
- **React Router 7** - Routing
- **TypeScript** - Typowanie
- **Tailwind CSS v4** - Stylowanie
- **Recharts** - Wykresy
- **Lucide React** - Ikony
- **Sonner** - Powiadomienia toast
- **localStorage** - Tymczasowe przechowywanie danych (mock)

## Struktura projektu

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── stocks/
│   │   │   ├── StockDetails.tsx
│   │   │   └── BuyModal.tsx
│   │   ├── portfolio/
│   │   │   └── Portfolio.tsx
│   │   ├── transactions/
│   │   │   └── TransactionHistory.tsx
│   │   ├── strategies/
│   │   │   └── Strategies.tsx
│   │   ├── wallet/
│   │   │   └── Wallet.tsx
│   │   ├── Layout.tsx
│   │   └── NotFound.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── routes.tsx
│   └── App.tsx
└── styles/
    ├── theme.css
    └── fonts.css
```

## Uruchomienie

Aplikacja działa w środowisku Figma Make - serwer deweloperski jest już uruchomiony.

## Integracja z backendem ASP.NET

Wszystkie miejsca wymagające integracji z API są oznaczone komentarzem:
```typescript
// TODO: Replace with API call to ASP.NET backend
```

Szczegółową dokumentację endpointów API znajdziesz w pliku `API_INTEGRATION.md`.

### Kluczowe pliki do integracji:

1. **Autentykacja**:
   - `src/app/components/auth/Login.tsx`
   - `src/app/components/auth/Register.tsx`

2. **Transakcje**:
   - `src/app/components/stocks/BuyModal.tsx`

3. **Portfel**:
   - `src/app/components/portfolio/Portfolio.tsx`

4. **Wpłaty**:
   - `src/app/components/wallet/Wallet.tsx`

5. **Strategie**:
   - `src/app/components/strategies/Strategies.tsx`

## Mock dane

Aplikacja obecnie używa mock danych:
- **localStorage** - dla stanu użytkownika, portfela, transakcji
- **WIG20_STOCKS** - statyczna lista 20 spółek z indeksu WIG20
- **Funkcje generujące** - dane świecowe i wskaźniki techniczne

## Kolorystyka

Aplikacja używa **ciemnego motywu** z następującą paletą:
- **Tło**: Gray-950, Gray-900, Gray-800
- **Tekst**: White, Gray-300, Gray-400
- **Akcent główny**: Emerald-500 (zielony)
- **Sukces**: Emerald-500
- **Błąd/Strata**: Red-500
- **Ostrzeżenie**: Yellow-500

## Przyszłe rozszerzenia

- [ ] WebSocket dla danych w czasie rzeczywistym
- [ ] System powiadomień push
- [ ] Backtesting strategii na danych historycznych
- [ ] Alerty cenowe
- [ ] Więcej wskaźników technicznych (Bollinger Bands, Fibonacci)
- [ ] Eksport raportów PDF
- [ ] Tryb demo/live trading

## Licencja

WIN_WIG Trading Platform © 2026
