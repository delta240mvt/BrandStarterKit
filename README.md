# Polski starter strony usługowej

Starter Astro dla prostych stron internetowych lokalnych firm i freelancerów. Domyślny układ to jedna strona główna z ofertą, opisem firmy, realizacjami, FAQ, kontaktem oraz stałym blogiem.

Projekt jest przygotowany pod Cloudflare Pages i lokalną edycję z AI. Nie zawiera panelu admina, CMS ani backendowego formularza kontaktowego.

## Szybki start

```powershell
npm install
npm run dev
```

Domyślny serwer Astro startuje lokalnie. Produkcyjny build generuje katalog `dist/`.

## Najważniejsze pliki do edycji

- `src/data/site.ts` - nazwa firmy, domena, SEO, email, telefon, adres, analytics i kolory manifestu.
- `src/data/home.ts` - treści strony głównej: hero, korzyści, o firmie, oferta, proces, realizacje, opinie, FAQ, kontakt i zapowiedź bloga.
- `src/data/navigation.ts` - menu główne i linki w stopce.
- `src/data/legal.ts` - polska polityka prywatności i wymagany disclaimer szablonu.
- `src/content/blog/` - wpisy blogowe w MDX.

## Blog

Nowy wpis dodaj jako plik `.mdx` w `src/content/blog/`.

Przykładowy frontmatter:

```mdx
---
title: Tytuł wpisu
description: Krótki opis do SEO i kart wpisów.
pubDate: 2026-05-11
tags:
  - strona firmowa
draft: false
---
```

Wpisy z `draft: true` nie są publikowane.

## Domena i Cloudflare Pages

1. Zmień `canonicalBaseUrl` i `primaryDomain` w `src/data/site.ts`.
2. Zmień `site` w `astro.config.mjs`.
3. Zmień `name` w `wrangler.jsonc` na nazwę projektu Cloudflare Pages.
4. Uruchom testy i build przed wdrożeniem.

## Analytics

Analytics są domyślnie wyłączone.

Konfigurację znajdziesz w `src/data/site.ts`:

```ts
analytics: {
  enabled: false,
}
```

Po włączeniu ustaw `provider`, `scriptSrc`, `siteId` albo `dataAttributes`. Bez `enabled: true` skrypt analytics nie jest renderowany.

## Polityka prywatności

Publiczna strona polityki prywatności znajduje się pod `/polityka-prywatnosci`.

Przed użyciem u klienta dostosuj treść w `src/data/legal.ts` do faktycznego sposobu działania firmy, hostingu, analityki i obsługi kontaktu.

## Komendy

- `npm run dev` - uruchamia lokalny serwer developerski.
- `npm test` - uruchamia testy regresyjne.
- `npm run check` - uruchamia testy i `astro check`.
- `npm run build` - buduje produkcyjny katalog `dist/`.
- `npm run preview -- --host 127.0.0.1 --port 4321` - uruchamia lokalny preview Cloudflare Pages przez Wrangler.
- `npm run deploy` - wdraża `dist/` na Cloudflare Pages.

## Kontrola jakości

Przed publikacją uruchom:

```powershell
npm test
npm run check
npm run build
```

Testy pilnują między innymi konfiguracji strony, SEO, schema.org, sitemap, RSS, robots, `llms.txt`, bloga i braku starych publicznych brand-termów w plikach startera.
