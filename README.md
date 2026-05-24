<div align="center">

<pre>
██████╗ ██████╗  █████╗ ███╗   ██╗██████╗
██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗
██████╔╝██████╔╝███████║██╔██╗ ██║██║  ██║
██╔══██╗██╔══██╗██╔══██║██║╚██╗██║██║  ██║
██████╔╝██║  ██║██║  ██║██║ ╚████║██████╔╝
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝

 ███████╗████████╗ █████╗ ██████╗ ████████╗███████╗██████╗
 ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗
 ███████╗   ██║   ███████║██████╔╝   ██║   █████╗  ██████╔╝
 ╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██╔══╝  ██╔══██╗
 ███████║   ██║   ██║  ██║██║  ██║   ██║   ███████╗██║  ██║
 ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝

                  ██╗  ██╗██╗████████╗
                  ██║ ██╔╝██║╚══██╔══╝
                  █████╔╝ ██║   ██║
                  ██╔═██╗ ██║   ██║
                  ██║  ██╗██║   ██║
                  ╚═╝  ╚═╝╚═╝   ╚═╝
</pre>

**Polski starter Astro dla prostych stron usługowych lokalnych firm i freelancerów.**

[![Astro](https://img.shields.io/badge/Astro-5.x-ff5d01.svg?style=flat-square)](https://astro.build)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-f38020.svg?style=flat-square)](https://pages.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6.svg?style=flat-square)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-4a8d83.svg?style=flat-square)](LICENSE)

</div>

---

## O projekcie

Brand Starter Kit to gotowy fundament pod proste strony internetowe dla klientów usługowych: lokalnych firm, specjalistów i freelancerów. Projekt jest przygotowany do lokalnej edycji z AI, szybkiego dostosowania treści oraz wdrożenia na Cloudflare Pages.

Starter nie zawiera panelu admina, CMS-a ani backendowego formularza kontaktowego. Założenie jest proste: treści i strukturę edytujesz lokalnie w kodzie, a kontakt działa przez `mailto:` lub dane kontaktowe klienta.

## Co zawiera

- Strona główna one-page z sekcjami: hero, korzyści, o firmie, oferta, proces, realizacje, opinie, FAQ, blog i kontakt.
- Stały blog oparty o pliki MDX.
- Polska polityka prywatności pod `/polityka-prywatnosci`.
- Strona błędu `/404`.
- Pliki discovery i SEO: `/sitemap.xml`, `/rss.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`.
- Dane strukturalne Schema.org dla strony, artykułów i podstrony prawnej.
- Konfigurację Cloudflare Pages przez Wrangler.
- Testy regresyjne pilnujące konfiguracji startera, SEO i braku starych brand-termów.

## Szybki start

```powershell
npm install
npm run dev
```

Domyślny serwer Astro startuje lokalnie. Produkcyjny build generuje katalog `dist/`.

## Najważniejsze pliki do edycji

| Plik | Do czego służy |
|------|----------------|
| `src/data/site.ts` | Nazwa firmy, domena, SEO, email, telefon, adres, analytics i kolory manifestu. |
| `src/data/home.ts` | Treści strony głównej: hero, korzyści, o firmie, oferta, proces, realizacje, opinie, FAQ, kontakt i blog preview. |
| `src/data/navigation.ts` | Menu główne i linki w stopce. |
| `src/data/legal.ts` | Polska polityka prywatności i disclaimer szablonu. |
| `src/content/blog/` | Wpisy blogowe w MDX. |
| `wrangler.jsonc` | Nazwa projektu Cloudflare Pages i konfiguracja deployu. |
| `astro.config.mjs` | Bazowy adres strony i adapter Cloudflare. |

## Blog

Nowy wpis dodaj jako plik `.mdx` w `src/content/blog/`.

Przykładowy frontmatter:

```mdx
---
title: Tytuł wpisu
description: Krótki opis do SEO i kart wpisów.
pubDate: 2026-05-24
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
5. Wdróż projekt komendą `npm run deploy`.

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

Przed użyciem u klienta dostosuj treść w `src/data/legal.ts` do faktycznego sposobu działania firmy, hostingu, analityki, narzędzi zewnętrznych i obsługi kontaktu. Domyślna treść jest punktem startowym, nie indywidualną poradą prawną.

## Komendy

| Akcja | Komenda |
|-------|---------|
| Lokalny serwer developerski | `npm run dev` |
| Testy regresyjne | `npm test` |
| Testy i `astro check` | `npm run check` |
| Produkcyjny build | `npm run build` |
| Lokalny preview Cloudflare Pages | `npm run preview -- --host 127.0.0.1 --port 4321` |
| Deploy na Cloudflare Pages | `npm run deploy` |

## Kontrola jakości

Przed publikacją uruchom:

```powershell
npm test
npm run check
npm run build
```

Testy pilnują między innymi konfiguracji strony, SEO, Schema.org, sitemap, RSS, robots, `llms.txt`, bloga i braku starych publicznych brand-termów w plikach startera.

## Typowy proces pracy z klientem

1. Skopiuj repo lub utwórz nowy projekt na bazie startera.
2. Podmień dane w `src/data/site.ts`.
3. Przepisz sekcje w `src/data/home.ts` pod branżę klienta.
4. Dodaj lub usuń wpisy blogowe w `src/content/blog/`.
5. Dostosuj politykę prywatności w `src/data/legal.ts`.
6. Zmień domenę i projekt Cloudflare.
7. Uruchom testy, build i deploy.

## Licencja

MIT - zobacz [`LICENSE`](LICENSE).

---

<div align="center">

**Brand Starter Kit** - prosty, polski starter do stron usługowych.

</div>
