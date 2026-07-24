# Deploy Cloudflare Pages

Projekt jest statyczną stroną Astro 7. Wynik buildu znajduje się w `dist/`, a konfiguracja Cloudflare Pages w `wrangler.jsonc`.

## Szybki deploy preview

Po zmianach uruchom kolejno:

```powershell
npm run check
npm run build
npx wrangler pages deploy ./dist --branch <nazwa-brancha>
```

Przykład dla obecnego brancha:

```powershell
npx wrangler pages deploy ./dist --branch baza240726-astro7
```

Cloudflare zwróci unikalny URL wdrożenia oraz stały alias preview dla brancha. Otwórz alias i sprawdź, czy strona zwraca HTTP 200.

## Wymagania

- Zależności: `npm install`.
- Autoryzacja Cloudflare: zalogowana sesja Wrangler (`npx wrangler login`) lub ustawiony token `CLOUDFLARE_API_TOKEN`.
- Nie wdrażaj na produkcję bez wyraźnej prośby użytkownika.

## Zasada

Przed każdym deployem uruchom `npm run check` i `npm run build`. Deployuj wyłącznie świeżo zbudowany katalog `dist/`.
