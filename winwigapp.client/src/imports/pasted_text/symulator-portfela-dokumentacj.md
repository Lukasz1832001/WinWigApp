Dokumentacja – symulator portfela giełdowego - WIN_WIG 

Historyjki użytkownika 

Lista spółek i danych 

Jako użytkownik chcę mieć dostęp do listy spółek WIG20 z informacjami o kursie, wolumenie, cenie otwarcia/zamknięcia, oraz podstawowych wskaźnikach, aby móc analizować rynek. 

Kryteria akceptacji: 

Użytkownik ma dostęp do pełnej listy spółek WIG20, która zawiera nazwę spółki oraz aktualne dane rynkowe:  

Kurs akcji  

Wolumen obrotu  

Cena otwarcia i zamknięcia  

Przynajmniej 2 wskaźniki podstawowe (np. P/E, P/B, ROE) są widoczne dla każdej spółki.  

Lista jest aktualizowana w czasie rzeczywistym.  

Użytkownik może posortować listę po kursie, wolumenie, cenie otwarcia/zamknięcia.  

Wyszukiwanie spółek jest dostępne po nazwie lub symbolu giełdowym. 

 

Analiza techniczna 
Jako użytkownik chcę przeglądać szczegółową analizę techniczną wybranej spółki, obejmującą wskaźniki takie jak RSI, MACD oraz średnie kroczące, aby podejmować świadome decyzje inwestycyjne. 

Kryteria akceptacji: 

Użytkownik może wybrać spółkę z listy WIG20 i przejść do sekcji analizy technicznej.  

Analiza techniczna zawiera wykresy:  

RSI (Relative Strength Index) w czasie rzeczywistym.  

MACD (Moving Average Convergence Divergence) z interpretacją.  

Przynajmniej 2 średnie kroczące (np. SMA 50, SMA 200).  

Wskaźniki są obliczane na podstawie danych rynkowych i prezentowane w sposób zrozumiały (np. wykresy, linie, wartości liczbowe).  

Użytkownik może wybierać różne okresy dla analizowanych wskaźników (np. 1 dzień, 1 tydzień, 1 miesiąc). 

 

 

 

 

Transakcje kupna i sprzedaży 
Jako użytkownik chcę mieć możliwość kupowania i sprzedawania akcji spółek bezpośrednio w aplikacji, z możliwością określenia wolumenu, aby móc aktywnie zarządzać swoim portfelem. 

Kryteria akceptacji: 

Użytkownik może przeglądać dostępne akcje spółek WIG20 i wybierać te, które chce kupić lub sprzedać.  

Użytkownik może określić wolumen akcji do kupna/sprzedaży.  

Potwierdzenie transakcji zawiera:  

Informację o wybranej spółce.  

Liczbie akcji do kupna/sprzedaży.  

Cenie zakupu/sprzedaży w czasie rzeczywistym.  

Całkowitej wartości transakcji.  

Transakcje są realizowane w czasie rzeczywistym i aktualizują stan portfela użytkownika.  

Użytkownik otrzymuje powiadomienie o pomyślnie zakończonej transakcji oraz ewentualnych błędach. 

 

Wykresy świecowe 
Jako użytkownik chcę mieć dostęp do interaktywnych wykresów świecowych dla spółek, które umożliwiają wybór okresu, zoomowanie i analizowanie ruchów cenowych. 

Kryteria akceptacji: 

Użytkownik może wybrać dowolną spółkę WIG20 i przejść do sekcji wykresu świecowego.  

Wykres świecowy jest interaktywny, pozwalający na:  

Zoomowanie w przód i w tył.  

Przesuwanie wykresu po osi czasu.  

Wybór okresu wykresu (np. 1 dzień, 1 tydzień, 1 miesiąc, 1 rok).  

Wykresy wyświetlają dane w postaci świec, z możliwością podglądu ceny otwarcia, zamknięcia, najwyższej i najniższej wartości w danym okresie.  

Użytkownik może przełączać się między różnymi interwałami czasowymi (np. 1-minutowe, 5-minutowe, dzienne).  

Wykres świecowy jest aktualizowany w czasie rzeczywistym. 

 

Tworzenie strategii 
Jako użytkownik chcę tworzyć i zapisywać własne strategie inwestycyjne, takie jak reguły kupna i sprzedaży w zależności od zmian procentowych kursów akcji, aby automatyzować proces podejmowania decyzji. 

Kryteria akceptacji: 

Użytkownik może tworzyć własne strategie inwestycyjne na podstawie wybranych wskaźników (np. RSI, MACD, średnie kroczące).  

Tworzenie strategii odbywa się w prostym kreatorze, w którym użytkownik definiuje:  

Parametry wskaźników.  

Warunki zakupu/sprzedaży (np. kupno, gdy RSI < 30, sprzedaż, gdy RSI > 70).  

Akcje, które mają zostać podjęte po spełnieniu warunków.  

Użytkownik może zapisać strategię i ustawić powiadomienia o jej realizacji.  

Strategia może być testowana w formie symulacji na danych historycznych.  

Możliwość uruchomienia strategii na żywo, aby działała na bieżąco z rynkiem 

 

 

Technika INVEST 

Powiadomienia 
Jako użytkownik chcę otrzymywać powiadomienia o znaczących zmianach kursów wybranych spółek, aby móc szybko reagować na ruchy rynkowe. 

Kryteria akceptacji: 

Użytkownik może wybrać co najmniej jedną spółkę WIG20, dla której chce otrzymywać powiadomienia.  

Użytkownik może ustawić próg zmiany kursu (np. procentowy lub kwotowy), który wywoła powiadomienie.  

Po przekroczeniu ustawionego progu użytkownik otrzymuje powiadomienie push (lub e-mail, jeśli obsługiwane).  

Powiadomienie zawiera nazwę spółki, aktualny kurs i informację o przekroczeniu progu.  

Powiadomienia są wysyłane w ciągu maksymalnie 1 minuty od zmiany kursu.  

Użytkownik może usunąć lub wyłączyć powiadomienia dla wybranych spółek.  

Testy automatyczne potwierdzają, że powiadomienie jest generowane tylko wtedy, gdy próg zostanie przekroczony, a nie przy każdej zmianie kursu. 

 

Filtrowanie po kursie  
Jako użytkownik chcę filtrować spółki po aktualnym kursie, aby znaleźć te mieszczące się w moim budżecie. 

Kryteria akceptacji: 

Użytkownik może ustawić przedział kursu akcji (np. od 20 zł do 100 zł) i filtrować spółki według tego kryterium.  

Możliwość filtracji na poziomie minimalnej i maksymalnej ceny akcji.  

Lista spółek jest natychmiastowo aktualizowana po wprowadzeniu parametrów.  

Filtracja działa zarówno w przypadku pełnej listy spółek WIG20, jak i po zastosowaniu innych filtrów.  

Po zastosowaniu filtra użytkownik może zobaczyć tylko te spółki, które spełniają warunki kursu.  

Użytkownik może łatwo usunąć filtr, aby przywrócić pełną listę 

 

  

Interwały czasowe wykresów  
Jako użytkownik chcę wybrać interwał czasowy na wykresie, aby analizować zmienność w wybranym okresie.  

Kryteria akceptacji: 

Użytkownik ma możliwość wyboru interwału czasowego wykresu (np. 1 minuta, 5 minut, 15 minut, 1 godzina, 1 dzień, 1 tydzień, 1 miesiąc).  

Interwał czasowy jest dostępny do wyboru przed analizowaniem wykresu lub podczas interakcji z wykresem.  

Po wybraniu interwału wykres odświeża się, dostosowując dane do wybranego okresu.  

Użytkownik może łatwo przełączać się między interwałami, a wykres aktualizuje się w czasie rzeczywistym.  

Interwały czasowe umożliwiają pełną analizę zmienności w kontekście krótkoterminowym (minuty) lub długoterminowym (dni, tygodnie). 

 

Stop loss  
Jako użytkownik chcę ustawić poziom stop loss dla transakcji, aby ograniczyć potencjalne straty.  

Kryteria akceptacji: 

Użytkownik może ustawić poziom stop loss przy składaniu zlecenia kupna lub sprzedaży akcji.  

Użytkownik ma możliwość określenia poziomu stop loss w procentach lub kwocie (np. strata do 5% wartości inwestycji).  

Poziom stop loss jest zapisany dla danej transakcji i weryfikowany w czasie rzeczywistym.  

Aplikacja automatycznie wykonuje zlecenie sprzedaży, gdy cena akcji osiągnie ustawiony poziom stop loss.  

Użytkownik otrzymuje powiadomienie o aktywacji stop loss oraz o zrealizowanej transakcji.  

Użytkownik może modyfikować lub usunąć poziom stop loss przed zrealizowaniem transakcji. 

 

Wpłata środków  
Jako użytkownik chcę wpłacać środki na konto inwestycyjne, aby móc rozpocząć inwestowanie. 

Kryteria akceptacji: 

Użytkownik może wpłacić środki na swoje konto inwestycyjne za pomocą różnych metod płatności (np. przelew bankowy, karta kredytowa/debetowa, PayPal).  

Po dokonaniu wpłaty środki są natychmiastowo dostępne na koncie inwestycyjnym (lub zgodnie z czasem realizacji transakcji).  

Użytkownik otrzymuje potwierdzenie wpłaty na adres e-mail oraz w aplikacji, w tym szczegóły transakcji (kwota, metoda, czas).  

Aplikacja pokazuje dostępne środki na koncie użytkownika w czasie rzeczywistym.  

W przypadku problemu z wpłatą użytkownik otrzymuje odpowiednią informację o błędzie (np. brak środków, błąd płatności).  

Użytkownik ma możliwość wyboru waluty, w jakiej chce wpłacić środki, jeśli aplikacja obsługuje więcej niż jedną walutę. 

 

Given-When-Then 

Given użytkownik jest zalogowany w aplikacji 

When użytkownik otworzy sekcję Lista spółek WIG20 

Then system wyświetla listę wszystkich spółek WIG20 

And pokazuje kursy oraz podstawowe dane każdej spółki 

 

2.  Given użytkownik znajduje się na stronie szczegółów spółki 

When użytkownik wybierze opcję Analiza techniczna 

Then system pokazuje wskaźniki techniczne takie jak RSI, MACD oraz średnie kroczące 

And umożliwia ocenę potencjału inwestycyjnego 

 

3. Given użytkownik znajduje się na stronie transakcji spółki 

And posiada środki na koncie inwestycyjnym 

When użytkownik wybierze opcję Kup lub Sprzedaj 

And potwierdzi ilość akcji i transakcję 

Then system realizuje transakcję 

And aktualizuje portfel użytkownika oraz historię transakcji 

 

4. Given użytkownik znajduje się na stronie szczegółów spółki 

When użytkownik wybierze opcję Wykres świecowy 

Then system wyświetla wykres świecowy z ruchami cenowymi 

And umożliwia analizę historycznych trendów 

 

5. Given użytkownik znajduje się w sekcji Strategie inwestycyjne 

When użytkownik utworzy nową strategię 

And zapisze ją w systemie 

Then system zapisuje strategię w profilu użytkownika 

And umożliwia automatyczne stosowanie strategii w transakcjach 

 

6. Given użytkownik jest zalogowany 

And użytkownik znajduje się w sekcji listy spółek WIG20 

When użytkownik ustawia filtry 

Then system filtruje listę spółek według: 

 	- aktualnego kursu 

 	- branży 

 	- wolumenu obrotu 

7. Given użytkownik jest zalogowany 

When użytkownik przechodzi do sekcji wpłat 

Then użytkownik może wybrać formę płatności: 

 - przelew bankowy 

 - karta kredytowa 

blik 

AND system dodaje środki na konto 

 

 

CRUD 

Jako użytkownik chcę mieć dostęp do listy spółek WIG20 wraz z ich kursami oraz podstawowymi danymi, aby móc analizować rynek i podejmować decyzje inwestycyjne. 

READ 

Pobieranie listy spółek z bazy danych 

Wyświetlenie listy spółek z kursem oraz podstawowymi danymi. 

Możliwość wyszukiwania spółek po nazwie 

Możliwość sortowania listy spółek po aktualnym kursie 

 

Jako użytkownik chcę przeglądać analizę techniczną wybranej spółki (np. RSI, MACD, średnie kroczące), aby ocenić potencjał inwestycyjny. 

READ 

Stworzenie przycisku Analiza techniczna 

Wyświetlenie wykresu 

Wyświetlenie parametrów analizy technicznej 

Możliwość ustawienia horyzontu czasowego na wykresie 

 

Jako użytkownik chcę kupować i sprzedawać akcje spółek bezpośrednio w aplikacji, aby aktywnie zarządzać swoim portfelem. 

CREATE 

Stworzenie przycisku OTWÓRZ POZYCJE w UI 

Walidacja danych (np. Sprawdzenie wystarczającej kwoty środków na koncie) 

Zapis do bazy danych historii transakcji użytkownika  

Powiadomienia użytkownika o poprawnej lub niepoprawnej transakcji 

Dodaje akcje do portfela 

READ 

Pobieranie listy spółek z bazy danych 

Wyświetlanie aktualnej ceny akcji 

Możliwość wyszukiwania spółek po nazwie 

UPDATE 

Zmiana składu portfela 

DELETE 

Stworzenie przycisku ZAMKNIJ POZYCJE w UI 

Powiadomienie użytkownika o sukcesie  

Zmiana salda konta użytkownika 

Usunięcie pozycji z portfela 

 

Jako użytkownik chcę mieć dostęp do wykresów świecowych dla spółek, aby lepiej analizować ruchy cenowe. 

READ 

Stworzenie przycisku Podgląd 

Wyświetlenie wykresu 

Możliwość ustawienia horyzontu czasowego na wykresie 

 

Jako użytkownik chcę tworzyć i zapisywać własne strategie inwestycyjne, aby automatyzować proces podejmowania decyzji. 

CREATE 

Stworzenie przycisku Dodaj strategię 

Implementacja formularza wprowadzania danych o strategii (nazwa,  

Planowana stopa zwrotu, horyzont inwestycyjny) 

Walidacja danych (np. Nazwa nie jest pusta, minimalny horyzont czasowy, planowana stopa zwrotu dodatnia) 

Zapis strategii do bazy danych 

Powiadomienie użytkownika o sukcesie stworzenia strategii 

READ  

Wyświetlenie formularza z informacjami dotyczącymi strategii 

UPDATE 

Stworzenie przycisku Edytuj 

Wprowadzenie zmian (np. Zmiana oczekiwanej stopy zwrotu)		 

DELETE 

Stworzenie przycisku Usuń strategię 

Wyświetlenie okna potwierdzenia usunięcia 

Usunięcie strategii z bazy danych 

Powiadomienie o sukcesie 

 

Jako użytkownik chcę filtrować spółki po aktualnym kursie, aby znaleźć te mieszczące się w moim budżecie. 

READ 

Stworzenie przycisku Lista spółek 

Możliwość filtrowania spółek po aktualnym kursie 

Możliwość sortowania spółek po aktualnym kursie 

 

Jako użytkownik chce mieć możliwość wpłaty środków na konto aby móc inwestować 

CREATE 

Stworzenie przycisku Wpłać środki 

Implementacja formularza do wprowadzenia kwoty doładowania 

Walidacja danych 

Powiadomienie użytkownika o sukcesie 

Dodanie środków na konto użytkownika 

Zapis zmian salda w bazie danych 

READ 

Stworzenie przycisku Historia transakcji 

Wyświetlenie listy wpłat 

 

Jako użytkownik chce mieć możliwość wybierania kwoty stoploss aby maksymalizować swoje wyniki 

CREATE 

Stworzenie przycisku STOPLOSS  

Implementacja formularza do wprowadzenia kwoty 

Walidacja danych (np. Większa niż 0) 

Zapisz danych do bazy 

READ 

Możliwość przeglądania informacji stoploss 

 

UPDATE 

Stworzenie przycisku EDYTUJ STOPLOSS 

DELETE 

Usuń STOPLOSS 

Mapowanie zadań do warstwy aplikacji 

1. Lista spółek i danych 

Frontend: 

Przycisk „Pokaż listę spółek” na stronie głównej.  

Tabela z kolumnami: Spółka, Kurs, Wolumen, Cena otwarcia, Cena zamknięcia, P/E, P/B, ROE.  

Przycisk sortowania dla kursu, wolumenu, ceny otwarcia/zamknięcia.  

Pole wyszukiwania (nazwa spółki/symbol giełdowy).  

Backend: 

Endpoint API do pobierania listy spółek WIG20 z aktualnymi danymi.  

Obsługa zapytań do zewnętrznego API (np. GPW) lub bazy danych.  

Aktualizacja danych w czasie rzeczywistym (np. WebSocket).  

Funkcje sortowania (po kursie, wolumenie, itp.).  

Baza danych: 

Tabela stocks zawierająca kolumny: symbol, name, current_price, volume, open_price, close_price, pe_ratio, pb_ratio, roe.  

Indeksy na kolumnach symbol, current_price, volume.  

 

2. Analiza techniczna 

Frontend: 

Przycisk „Analiza techniczna” przy każdej spółce.  

Sekcja z wykresami RSI, MACD i średnich kroczących (SMA 50, SMA 200).  

Możliwość wyboru okresu czasu dla analizy (np. 1 dzień, 1 tydzień, 1 miesiąc).  

Dynamiczne aktualizowanie wykresów na podstawie nowych danych.  

Backend: 

Endpoint API do pobierania danych kursów akcji.  

Funkcje obliczające wskaźniki RSI, MACD, SMA na podstawie danych kursów (np. z historycznych danych).  

Generowanie danych w formacie JSON do wyświetlania wykresów.  

Baza danych: 

Tabela stock_data z historycznymi danymi (data, cena otwarcia, cena zamknięcia, wolumen).  

Zapytania SQL obliczające wartości wskaźników technicznych na podstawie danych w tabeli stock_data.  

 

3. Transakcje kupna i sprzedaży 

Frontend: 

Przycisk „Kup/Sprzedaj” przy każdej spółce.  

Formularz do określenia wolumenu akcji.  

Potwierdzenie transakcji (spółka, liczba akcji, cena, wartość transakcji).  

Powiadomienia o zakończeniu transakcji lub błędach.  

Backend: 

Endpoint API do przetwarzania transakcji kupna i sprzedaży.  

Sprawdzenie dostępnych środków użytkownika (saldo konta).  

Zapis transakcji w historii (tabela transactions).  

Aktualizacja portfela użytkownika.  

Powiadomienia (np. WebPush, e-mail).  

Baza danych: 

Tabela transactions zawierająca kolumny: user_id, stock_symbol, quantity, price, transaction_type, date.  

Tabela portfolio zawierająca kolumny: user_id, stock_symbol, quantity.  

 

4. Wykresy świecowe 

Frontend: 

Przycisk „Podgląd wykresu” dla każdej spółki.  

Interaktywny wykres świecowy (zoomowanie, przesuwanie).  

Wybór okresu (np. 1 dzień, 1 tydzień, 1 miesiąc).  

Interwały czasowe (1-minutowy, 5-minutowy, dzienny).  

Backend: 

Endpoint API do pobierania danych świecowych (np. z historycznych danych).  

Generowanie danych świecowych na podstawie kursów i wolumenu.  

Baza danych: 

Tabela candlestick_data z danymi świecowymi (data, cena otwarcia, cena zamknięcia, najwyższa, najniższa).  

 

5. Tworzenie strategii 

Frontend: 

Przycisk „Dodaj strategię” z formularzem do definiowania warunków zakupu/sprzedaży.  

Możliwość testowania strategii na danych historycznych.  

Interfejs do edytowania i usuwania strategii.  

Backend: 

Endpoint API do tworzenia, edytowania i usuwania strategii inwestycyjnych.  

Możliwość testowania strategii na danych historycznych.  

Uruchomienie strategii na żywo z aktualizacjami w czasie rzeczywistym.  

Baza danych: 

Tabela strategies zawierająca kolumny: user_id, strategy_name, indicator, threshold, action (kupno/sprzedaż).  

Tabela strategy_execution do zapisania wykonanych transakcji wynikających ze strategii.  

 

6. Powiadomienia 

Frontend: 

Przycisk do ustawiania alertów dla wybranych spółek.  

Powiadomienia push lub e-mail dla użytkownika po przekroczeniu ustalonego progu.  

Backend: 

Endpoint API do ustawiania i usuwania alertów.  

Mechanizm do monitorowania zmian kursów i generowania powiadomień (np. poprzez WebSockets, cron jobs).  

Baza danych: 

Tabela alerts z kolumnami: user_id, stock_symbol, threshold, alert_type.  

 

7. Filtrowanie po kursie 

Frontend: 

Umożliwienie użytkownikowi ustawienia minimalnej i maksymalnej wartości kursu.  

Dynamiczna aktualizacja listy spółek po wprowadzeniu filtra.  

Backend: 

Endpoint API do filtrowania spółek po kursie.  

Baza danych: 

Filtracja w zapytaniach SQL na tabeli stocks na podstawie kolumny current_price.  

 

8. Interwały czasowe wykresów 

Frontend: 

Wybór interwału czasowego przed wyświetleniem wykresu (1 minuta, 5 minut, 1 godzina, itp.).  

Zmiana interwału w czasie analizy wykresu.  

Backend: 

Endpoint API do zmiany interwału i dostosowania danych wykresu.  

Baza danych: 

Tabela stock_data z danymi, które umożliwiają filtrowanie po czasie (np. timestamp).  

 

9. Stop Loss 

Frontend: 

Możliwość ustawienia stop loss przy składaniu zlecenia.  

Powiadomienia o aktywacji stop loss oraz zrealizowanej transakcji.  

Backend: 

Endpoint API do zapisania poziomu stop loss.  

Mechanizm do monitorowania i realizacji zleceń sprzedaży, gdy cena osiągnie ustawiony poziom stop loss.  

Baza danych: 

Tabela stop_loss z kolumnami: user_id, stock_symbol, stop_loss_value, order_type (kupno/sprzedaż).  

 

10. Wpłata środków 

Frontend: 

Formularz do dokonania wpłaty (przelew, karta kredytowa, PayPal).  

Potwierdzenie wpłaty na ekranie użytkownika oraz e-mail.  

Backend: 

Endpoint API do obsługi wpłat (integracja z systemami płatności).  

Zaktualizowanie salda użytkownika w bazie danych.  

Baza danych: 

Tabela transactions z historią wpłat.  

Tabela user_accounts z kolumną balance, która przechowuje dostępne środki użytkownika. 

 