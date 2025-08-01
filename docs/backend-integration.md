# Integracja z Backend API

## Zmiany w procesie płatności

Po pomyślnej implementacji, proces płatności został zintegrowany z nowymi endpointami API Laravel:

### 1. Nowe pole w formularzu zamówienia

Dodano pole **"Nazwa zawartości"** do formularza zamówienia:
- `Content Name` (EN)
- `Nazwa treści` (PL) 
- `Inhaltsname` (DE)
- `सामग्री का नाम` (HI)

### 2. Aktualizacja webhook'a Stripe

Webhook Stripe (`/api/stripe-webhook`) został zaktualizowany do używania nowych endpointów:

**Poprzednie endpointy:**
- `/api/watch-videos`
- `/api/visit-sites`

**Nowe endpointy:**
- `/api/task/youtube-views`
- `/api/task/website-visits`

### 3. Struktura danych

**YouTube Views Request:**
```json
{
    "email": "client@example.com",
    "video_name": "Nazwa podana przez użytkownika",
    "video_link": "https://youtube.com/watch?v=abc123",
    "views_to_do": 1000
}
```

**Website Visits Request:**
```json
{
    "email": "client@example.com",
    "site_name": "Nazwa podana przez użytkownika", 
    "site_link": "https://example.com",
    "visits_to_do": 1000
}
```

### 4. Proces przekazywania danych

1. **Formularz zamówienia** → zbiera: email, URL, nazwę zawartości
2. **Stripe session** → zapisuje dane w metadata
3. **Webhook po płatności** → wysyła dane do odpowiedniego endpointu Laravel
4. **Laravel API** → tworzy zadanie w bazie danych

### 5. Metadata w sesji Stripe

```javascript
metadata: {
    target_url: customerInfo.targetUrl,
    service_type: serviceType, // 'youtube' lub 'website'
    package_type: isCustom ? 'custom' : 'preset',
    package_id: isCustom ? 'custom' : packageData.id,
    views: packageData.views.toString(),
    email: customerInfo.email,
    content_name: customerInfo.name, // NOWE POLE
}
```

### 6. Logowanie i debugowanie

Webhook zawiera dodatkowe logowanie:
```javascript
console.log('Webhook received metadata:', session.metadata)
console.log('Sending to backend:', endpoint, backendData)
```

### 7. Fallback dla nazwy

Jeśli użytkownik nie poda nazwy zawartości, system używa fallback:
- YouTube: `"YouTube Video - {session.id}"`
- Website: `"Website - {session.id}"`

### 8. Walidacja

Webhook sprawdza czy wszystkie wymagane pola są obecne:
- `targetUrl`
- `serviceType` 
- `views`

### 9. Host backendu

```javascript
const backendHost = 'https://phplaravel-1489755-5679434.cloudwaysapps.com/api'
```

### 10. Obsługa błędów

- Brak wymaganych danych → HTTP 400
- Błąd API Laravel → HTTP 500 z detalami
- Logowanie wszystkich błędów do konsoli

---

## Testowanie lokalne

Zobacz `local-testing-guide.md` dla instrukcji testowania z Stripe CLI.
