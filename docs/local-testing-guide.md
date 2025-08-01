# Lokalne Testowanie Stripe - Instrukcja Krok Po Kroku

## 1. Przygotowanie środowiska

### Zainstaluj Stripe CLI:
```bash
# macOS (Homebrew)
brew install stripe/stripe-cli/stripe

# Lub pobierz z: https://github.com/stripe/stripe-cli/releases
```

### Sprawdź instalację:
```bash
stripe --version
```

## 2. Konfiguracja Stripe CLI

### Zaloguj się do Stripe:
```bash
stripe login
```
- Otworzy się przeglądarka
- Zaloguj się do swojego konta Stripe
- Potwierdź dostęp dla CLI

### Sprawdź połączenie:
```bash
stripe config --list
```

## 3. Konfiguracja zmiennych środowiskowych

### Skopiuj i edytuj plik .env.local:
```bash
# Plik .env.local już istnieje, sprawdź czy ma prawidłowe wartości:
```

### Sprawdź zawartość:
```env
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_local_secret_will_be_generated
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

## 4. Uruchomienie aplikacji i webhooków

### Terminal 1 - Uruchom aplikację Next.js:
```bash
npm run dev
```
- Aplikacja będzie dostępna na: http://localhost:3000

### Terminal 2 - Uruchom forwarding webhooków:
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

**WAŻNE**: Po uruchomieniu `stripe listen` zobaczysz coś takiego:
```
> Ready! Your webhook signing secret is whsec_1a2b3c4d5e6f...
```

### Skopiuj webhook secret:
1. Skopiuj wartość `whsec_...` z terminala
2. Otwórz plik `.env.local`
3. Zamień `whsec_local_secret_will_be_generated` na skopiowaną wartość
4. Restartuj serwer Next.js (Ctrl+C, potem `npm run dev`)

## 5. Testowanie płatności

### Użyj testowych kart kredytowych:
- **Sukces**: `4242 4242 4242 4242`
- **Odrzucona**: `4000 0000 0000 0002`
- **Wymaga autoryzacji**: `4000 0025 0000 3155`
- **Dowolna data ważności w przyszłości**
- **Dowolny CVC (np. 123)**

### Proces testowania:
1. Otwórz http://localhost:3000
2. Przejdź przez proces wyboru pakietu
3. Wypełnij formularz zamówienia (NOWE POLE: nazwa zawartości)
4. Użyj testowej karty kredytowej
5. Sprawdź w terminalu czy webhook został odebrany

### Nowe pola w formularzu:
- **Nazwa zawartości**: Opisowa nazwa dla video/strony (np. "Mój Super Film")
- **URL**: Link do YouTube video lub strony internetowej
- **Email**: Adres kontaktowy

### Backend API endpoints używane:
- **YouTube**: `POST /api/task/youtube-views`
- **Website**: `POST /api/task/website-visits`

### Struktura danych wysyłanych do Laravel:

**YouTube Views:**
```json
{
    "email": "client@example.com",
    "video_name": "Nazwa video",
    "video_link": "https://youtube.com/watch?v=abc123",
    "views_to_do": 1000
}
```

**Website Visits:**
```json
{
    "email": "client@example.com", 
    "site_name": "Nazwa strony",
    "site_link": "https://example.com",
    "visits_to_do": 1000
}
```

## 6. Monitorowanie

### W terminalu z `stripe listen` zobaczysz:
```
2025-07-31 14:30:15  --> checkout.session.completed [evt_1a2b3c...]
2025-07-31 14:30:15  <-- [200] POST http://localhost:3002/api/stripe-webhook
```

### W dashboard Stripe:
- Przejdź do sekcji **Payments**
- Sprawdź czy płatność została zarejestrowana
- Status powinien być "Succeeded" dla testowych płatności

## 7. Rozwiązywanie problemów

### Błąd "Webhook signature verification failed":
1. Sprawdź czy `STRIPE_WEBHOOK_SECRET` w `.env.local` jest prawidłowy
2. Restartuj serwer Next.js po zmianie zmiennych środowiskowych

### Błąd "Port already in use":
1. Sprawdź czy inny proces używa portu 3002
2. Zmień port w aplikacji lub zakończ konfliktowy proces

### Webhook nie dociera:
1. Sprawdź czy `stripe listen` nadal działa
2. Sprawdź czy adres URL jest prawidłowy (localhost:3000)
3. Sprawdź logs w terminalu Next.js

## 8. Testowanie różnych scenariuszy

### Test 1 - Zakup sukces:
- Karta: `4242 4242 4242 4242`
- Sprawdź czy webhook `checkout.session.completed` przyszedł

### Test 2 - Płatność odrzucona:
- Karta: `4000 0000 0000 0002`
- Sprawdź obsługę błędów

### Test 3 - Różne pakiety:
- Przetestuj wszystkie pakiety YouTube i Website
- Sprawdź czy ceny się zgadzają

## 9. Gotowość do produkcji

Po udanych testach lokalnych:
1. Zatrzymaj `stripe listen`
2. Skonfiguruj prawdziwy webhook w dashboard Stripe
3. Zaktualizuj zmienne środowiskowe na serwerze produkcyjnym
4. Przełącz na live keys (gdy będziesz gotowy na prawdziwe płatności)

---

**Uwaga**: Zawsze używaj test keys (`pk_test_`, `sk_test_`) do testowania. Live keys tylko na produkcji!
