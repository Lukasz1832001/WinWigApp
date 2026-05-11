# WIN_WIG Trading Platform - API Integration Guide

Dokumentacja integracji frontendu z backendem ASP.NET

## Przegląd

Aplikacja używa mock danych w localStorage. Wszystkie miejsca wymagające integracji z API są oznaczone komentarzem `// TODO: Replace with API call to ASP.NET backend`.

## Autoryzacja

Wszystkie endpointy (poza /auth/login i /auth/register) wymagają tokenu JWT w nagłówku:

```
Authorization: Bearer {token}
```

Token jest przechowywany w `localStorage.getItem('token')`.

---

## Endpointy API

### 1. Autentykacja

#### POST /api/auth/register
Rejestracja nowego użytkownika

**Request:**
```json
{
  "firstName": "Jan",
  "lastName": "Kowalski",
  "email": "jan@example.com",
  "password": "haslo123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "firstName": "Jan",
    "lastName": "Kowalski",
    "email": "jan@example.com",
    "balance": 100000.00
  }
}
```

**Lokalizacja w kodzie:** `src/app/components/auth/Register.tsx`

---

#### POST /api/auth/login
Logowanie użytkownika

**Request:**
```json
{
  "email": "jan@example.com",
  "password": "haslo123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "firstName": "Jan",
    "lastName": "Kowalski",
    "email": "jan@example.com",
    "balance": 100000.00
  }
}
```

**Lokalizacja w kodzie:** `src/app/components/auth/Login.tsx`

---

### 2. Spółki

#### GET /api/stocks
Pobiera listę spółek WIG20

**Response:**
```json
[
  {
    "symbol": "PKO",
    "name": "PKO Bank Polski",
    "currentPrice": 48.25,
    "volume": 2150000,
    "openPrice": 47.80,
    "closePrice": 48.10,
    "peRatio": 8.5,
    "pbRatio": 1.2,
    "roe": 12.3,
    "change": 0.45,
    "changePercent": 0.94
  }
]
```

**Lokalizacja w kodzie:** Mock dane w `src/app/data/mockData.ts`

---

#### GET /api/stocks/{symbol}/candlestick?days={days}
Pobiera dane świecowe dla spółki

**Parameters:**
- `symbol`: Symbol spółki (np. PKO)
- `days`: Liczba dni danych (1, 7, 30, 90, 252)

**Response:**
```json
[
  {
    "timestamp": 1704067200000,
    "open": 48.20,
    "high": 48.80,
    "low": 47.90,
    "close": 48.50,
    "volume": 2150000
  }
]
```

**Lokalizacja w kodzie:** `src/app/components/stocks/StockDetails.tsx`

---

#### GET /api/stocks/{symbol}/technical?days={days}
Pobiera wskaźniki techniczne dla spółki

**Response:**
```json
{
  "rsi": [50.2, 51.3, 49.8, ...],
  "macd": [
    {
      "value": 0.45,
      "signal": 0.38,
      "histogram": 0.07
    }
  ],
  "sma50": [48.20, 48.25, ...],
  "sma200": [47.80, 47.85, ...]
}
```

**Lokalizacja w kodzie:** `src/app/components/stocks/StockDetails.tsx`

---

### 3. Transakcje

#### POST /api/transactions
Tworzy nową transakcję kupna/sprzedaży

**Request:**
```json
{
  "symbol": "PKO",
  "quantity": 10,
  "price": 48.25,
  "type": "buy",
  "stopLoss": 45.00
}
```

**Response:**
```json
{
  "id": "uuid",
  "symbol": "PKO",
  "name": "PKO Bank Polski",
  "type": "buy",
  "quantity": 10,
  "price": 48.25,
  "total": 482.50,
  "stopLoss": 45.00,
  "timestamp": "2026-05-04T10:30:00Z",
  "newBalance": 99517.50
}
```

**Lokalizacja w kodzie:** `src/app/components/stocks/BuyModal.tsx`

---

#### GET /api/transactions
Pobiera historię transakcji użytkownika

**Response:**
```json
[
  {
    "id": "uuid",
    "symbol": "PKO",
    "name": "PKO Bank Polski",
    "type": "buy",
    "quantity": 10,
    "price": 48.25,
    "total": 482.50,
    "stopLoss": 45.00,
    "timestamp": "2026-05-04T10:30:00Z"
  }
]
```

**Lokalizacja w kodzie:** `src/app/components/transactions/TransactionHistory.tsx`

---

### 4. Portfel

#### GET /api/portfolio
Pobiera portfel użytkownika

**Response:**
```json
[
  {
    "symbol": "PKO",
    "name": "PKO Bank Polski",
    "quantity": 10,
    "avgPrice": 48.25,
    "stopLoss": 45.00
  }
]
```

**Lokalizacja w kodzie:** `src/app/components/portfolio/Portfolio.tsx`

---

#### PUT /api/portfolio/{symbol}/stoploss
Aktualizuje stop loss dla pozycji

**Request:**
```json
{
  "stopLoss": 46.00
}
```

**Response:**
```json
{
  "success": true,
  "message": "Stop loss zaktualizowany"
}
```

**Lokalizacja w kodzie:** `src/app/components/portfolio/Portfolio.tsx`

---

#### DELETE /api/portfolio/{symbol}/stoploss
Usuwa stop loss dla pozycji

**Response:**
```json
{
  "success": true,
  "message": "Stop loss usunięty"
}
```

**Lokalizacja w kodzie:** `src/app/components/portfolio/Portfolio.tsx`

---

### 5. Konto / Wpłaty

#### POST /api/wallet/deposit
Wpłata środków na konto

**Request:**
```json
{
  "amount": 5000.00,
  "method": "card"
}
```

**Response:**
```json
{
  "id": "uuid",
  "amount": 5000.00,
  "method": "Karta kredytowa",
  "timestamp": "2026-05-04T10:30:00Z",
  "newBalance": 105000.00
}
```

**Lokalizacja w kodzie:** `src/app/components/wallet/Wallet.tsx`

---

#### GET /api/wallet/deposits
Pobiera historię wpłat użytkownika

**Response:**
```json
[
  {
    "id": "uuid",
    "amount": 5000.00,
    "method": "Karta kredytowa",
    "timestamp": "2026-05-04T10:30:00Z"
  }
]
```

**Lokalizacja w kodzie:** `src/app/components/wallet/Wallet.tsx`

---

#### GET /api/wallet/balance
Pobiera aktualne saldo użytkownika

**Response:**
```json
{
  "balance": 105000.00
}
```

---

### 6. Strategie

#### POST /api/strategies
Tworzy nową strategię inwestycyjną

**Request:**
```json
{
  "name": "Moja strategia RSI",
  "targetReturn": 10.0,
  "investmentHorizon": 30,
  "rsiLow": 30,
  "rsiHigh": 70,
  "macdBuy": true,
  "sma50Above200": false
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Moja strategia RSI",
  "targetReturn": 10.0,
  "investmentHorizon": 30,
  "rsiLow": 30,
  "rsiHigh": 70,
  "macdBuy": true,
  "sma50Above200": false,
  "isActive": false,
  "createdAt": "2026-05-04T10:30:00Z"
}
```

**Lokalizacja w kodzie:** `src/app/components/strategies/Strategies.tsx`

---

#### GET /api/strategies
Pobiera strategie użytkownika

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Moja strategia RSI",
    "targetReturn": 10.0,
    "investmentHorizon": 30,
    "rsiLow": 30,
    "rsiHigh": 70,
    "macdBuy": true,
    "sma50Above200": false,
    "isActive": false,
    "createdAt": "2026-05-04T10:30:00Z"
  }
]
```

**Lokalizacja w kodzie:** `src/app/components/strategies/Strategies.tsx`

---

#### PUT /api/strategies/{id}
Aktualizuje strategię

**Request:**
```json
{
  "name": "Moja strategia RSI - zaktualizowana",
  "targetReturn": 12.0,
  "investmentHorizon": 45,
  "rsiLow": 25,
  "rsiHigh": 75,
  "macdBuy": true,
  "sma50Above200": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Strategia zaktualizowana"
}
```

**Lokalizacja w kodzie:** `src/app/components/strategies/Strategies.tsx`

---

#### DELETE /api/strategies/{id}
Usuwa strategię

**Response:**
```json
{
  "success": true,
  "message": "Strategia usunięta"
}
```

**Lokalizacja w kodzie:** `src/app/components/strategies/Strategies.tsx`

---

#### PUT /api/strategies/{id}/toggle
Włącza/wyłącza strategię

**Response:**
```json
{
  "success": true,
  "isActive": true,
  "message": "Strategia aktywowana"
}
```

**Lokalizacja w kodzie:** `src/app/components/strategies/Strategies.tsx`

---

## Struktura bazy danych

### Tabele sugerowane dla backendu:

1. **Users**
   - Id (Guid)
   - FirstName (string)
   - LastName (string)
   - Email (string)
   - PasswordHash (string)
   - Balance (decimal)
   - CreatedAt (DateTime)

2. **Stocks**
   - Symbol (string, PK)
   - Name (string)
   - CurrentPrice (decimal)
   - Volume (long)
   - OpenPrice (decimal)
   - ClosePrice (decimal)
   - PeRatio (decimal)
   - PbRatio (decimal)
   - Roe (decimal)
   - Change (decimal)
   - ChangePercent (decimal)
   - UpdatedAt (DateTime)

3. **Transactions**
   - Id (Guid)
   - UserId (Guid, FK)
   - Symbol (string)
   - Name (string)
   - Type (enum: Buy, Sell)
   - Quantity (int)
   - Price (decimal)
   - Total (decimal)
   - StopLoss (decimal?)
   - Timestamp (DateTime)

4. **Portfolio**
   - Id (Guid)
   - UserId (Guid, FK)
   - Symbol (string)
   - Name (string)
   - Quantity (int)
   - AvgPrice (decimal)
   - StopLoss (decimal?)

5. **Deposits**
   - Id (Guid)
   - UserId (Guid, FK)
   - Amount (decimal)
   - Method (string)
   - Timestamp (DateTime)

6. **Strategies**
   - Id (Guid)
   - UserId (Guid, FK)
   - Name (string)
   - TargetReturn (decimal)
   - InvestmentHorizon (int)
   - RsiLow (decimal)
   - RsiHigh (decimal)
   - MacdBuy (bool)
   - Sma50Above200 (bool)
   - IsActive (bool)
   - CreatedAt (DateTime)

---

## Aktualizacja danych w czasie rzeczywistym

Dla danych giełdowych w czasie rzeczywistym rozważ:

1. **SignalR** - dla WebSocket połączeń
2. **Polling** - co 5-10 sekund dla aktualizacji kursów
3. **Server-Sent Events (SSE)** - alternatywa dla SignalR

Przykład użycia SignalR w komponencie:

```typescript
import * as signalR from "@microsoft/signalr";

useEffect(() => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://your-api.com/stockHub")
    .build();

  connection.on("StockUpdate", (data) => {
    // Aktualizuj stan komponentu
  });

  connection.start();

  return () => connection.stop();
}, []);
```

---

## Uwagi implementacyjne

1. **CORS**: Backend musi mieć skonfigurowany CORS dla domeny frontendu
2. **Walidacja**: Backend powinien walidować wszystkie dane wejściowe
3. **Rate Limiting**: Implementuj ograniczenia zapytań dla API
4. **Caching**: Cachuj dane spółek (np. Redis) dla lepszej wydajności
5. **Logging**: Loguj wszystkie transakcje i błędy
6. **Error Handling**: Frontend oczekuje spójnych odpowiedzi błędów w formacie:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

---

## Testowanie API

Użyj poniższych wartości do testowania:

- Email testowy: `test@winwig.pl`
- Hasło testowe: `Test123!`
- Początkowe saldo: `100000.00 PLN`

---

## Kontakt

W razie pytań dotyczących integracji, sprawdź komentarze `// TODO` w kodzie źródłowym.
