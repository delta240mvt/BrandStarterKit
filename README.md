<div align="center">

<pre>
██████╗ ██████╗  █████╗ ███╗   ██╗██████╗
██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗
██████╔╝██████╔╝███████║██╔██╗ ██║██║  ██║
██╔══██╗██╔══██╗██╔══██║██║╚██╗██║██║  ██║
██████╔╝██║  ██║██║  ██║██║ ╚████║██████╔╝
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝
</pre>

<h1>STRONA WWW DLA TWOJEGO PROJEKTU</h1>

**Minimalistyczny starter Astro, dzięki któremu szybko postawisz profesjonalną stronę dla swojego nowego przedsięwzięcia.**

[![Astro](https://img.shields.io/badge/Astro-5.x-ff5d01.svg?style=flat-square)](https://astro.build)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-f38020.svg?style=flat-square)](https://pages.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6.svg?style=flat-square)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-4a8d83.svg?style=flat-square)](LICENSE)

</div>

---

## O projekcie

Kiedy zaczynasz coś nowego, nie masz czasu na żmudne budowanie strony od zera. Ten projekt to gotowy fundament pod stronę internetową Twojego najnowszego pomysłu, startupu, aplikacji lub inicjatywy. Został zoptymalizowany pod kątem szybkości działania, edycji z użyciem AI i łatwego wdrożenia (np. na Cloudflare Pages).

Starter celowo pozbawiono skomplikowanego panelu admina czy zaawansowanego CMS-a. Wszystkie najważniejsze informacje o Twoim projekcie edytujesz lokalnie w plikach konfiguracyjnych, a kontakt opiera się na bezpośrednim adresie e-mail.

## Co znajdziesz w środku?

- Stronę główną typu one-page z dedykowanymi sekcjami: hero, korzyści, o projekcie, funkcje, proces, realizacje/osiągnięcia, opinie, FAQ, kontakt oraz zajawki bloga.
- Moduł blogowy oparty na plikach MDX – idealny na aktualizacje i case studies.
- Gotową stronę polityki prywatności pod `/polityka-prywatnosci`.
- Stronę błędu `/404`.
- Pliki wspierające widoczność (SEO/AI): `/sitemap.xml`, `/rss.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`.
- Zaprogramowane dane strukturalne Schema.org.
- Gotową konfigurację pod wdrożenie na Cloudflare Pages.
- Zestaw testów pilnujących poprawności SEO i konfiguracji.

## Szybki start

```powershell
npm install
npm run dev
```

Domyślny serwer Astro startuje lokalnie pod adresem `http://localhost:4321`. Produkcyjny build (wersja końcowa) ląduje w katalogu `dist/`.

## Najważniejsze pliki konfiguracyjne

| Plik | Do czego służy |
|------|----------------|
| `src/data/site.ts` | Główne dane Twojego projektu: nazwa, domena, SEO, kontakt, social media i kolory bazy. |
| `src/data/home.ts` | Treści (copywriting) wyświetlane na stronie głównej (w każdej jej sekcji). |
| `src/data/navigation.ts` | Menu główne oraz przydatne linki w stopce. |
| `src/data/legal.ts` | Tekst polityki prywatności dostosowany pod nową stronę. |
| `src/content/blog/` | Miejsce na wpisy blogowe, logi z powstawania projektu czy obszerne poradniki w formacie MDX. |
| `wrangler.jsonc` | Nazwa Twojego projektu dla usług Cloudflare Pages. |
| `astro.config.mjs` | Główny adres (URL) strony internetowej. |

## Prowadzenie bloga projektu

Nowy wpis lub aktualizację dodajesz jako plik `.mdx` do folderu `src/content/blog/`.

Przykładowy nagłówek (frontmatter) wpisu:

```mdx
---
title: Startujemy z nowym narzędziem!
description: Krótki opis aktualizacji, który przyciągnie użytkowników.
pubDate: 2026-05-24
heroImage: /img/landing/optimized/blog-cover-1-820.webp
tags:
  - start
  - aktualizacje
draft: false
---
```

Ustawienie parametru `draft: true` ukryje wpis na środowisku produkcyjnym, pozwalając Ci w spokoju nad nim pracować.

## Publikacja w sieci (Cloudflare Pages)

1. Wpisz swoją docelową domenę w zmiennych `canonicalBaseUrl` i `primaryDomain` w pliku `src/data/site.ts`.
2. Zaktualizuj atrybut `site` w pliku `astro.config.mjs`.
3. Zmień nazwę projektu (`name`) w pliku `wrangler.jsonc`.
4. Sprawdź, czy wszystko działa poprawnie przed wdrożeniem, używając testów.
5. Wydaj komendę wdrożenia na swoje konto Cloudflare: `npm run deploy`.

## Zbieranie analityki

Analityka (śledzenie wejść) jest domyślnie wyłączona w trosce o prywatność Twoich pierwszych użytkowników.

Konfigurację znajdziesz w `src/data/site.ts`:

```ts
analytics: {
  enabled: false,
}
```

Aby ją włączyć, zmień na `enabled: true` i podaj źródło skryptu `scriptSrc`, jego dostawcę oraz identyfikator. Bez tej zmiany żaden zewnętrzny kod śledzący nie obciąży Twojej witryny.

## Legalne formalności

Szablon domyślnej polityki prywatności znajdziesz pod adresem `/polityka-prywatnosci`.

**Ważne:** Przed startem oficjalnej komunikacji, zmodyfikuj treści w `src/data/legal.ts` tak, aby oddawały faktyczny charakter Twojego projektu – gdzie trzymasz dane użytkowników i czy z nich korzystasz. Domyślny tekst to zarys dokumentu, a nie prawna wytyczna.

## Dostępne polecenia (skrypty)

| Akcja | Komenda |
|-------|---------|
| Praca nad kodem lokalnie | `npm run dev` |
| Szybkie testy konfiguracji | `npm test` |
| Testy i sprawdzanie błędów TS | `npm run check` |
| Zbudowanie plików produkcyjnych | `npm run build` |
| Podgląd zbudowanej wersji na PC | `npm run preview -- --host 127.0.0.1 --port 4321` |
| Publikacja strony | `npm run deploy` |

## Przed wypuszczeniem w świat...

Dla pewności, przed pierwszym opublikowaniem swojego projektu uruchom:

```powershell
npm test
npm run check
npm run build
```

Narzędzia te sprawdzą poprawność plików robots.txt, mapy strony, brak ślepych zaułków na blogu czy potencjalnych błędów indeksowania.

## Twoje pierwsze kroki w tym kodzie

1. Pobierz kod i utwórz własne repozytorium.
2. Zmień podstawowe namiary w `src/data/site.ts`.
3. Wypełnij odpowiednie sekcje w `src/data/home.ts` mówiąc światu, jaki problem rozwiązujesz.
4. (Opcjonalnie) Napisz pierwszy wpis opowiadający o wizji na blogu (`src/content/blog/`).
5. Dopracuj informacje prawne (`src/data/legal.ts`).
6. Wdróż, podziel się linkiem i pracuj nad swoim projektem dalej!

## Licencja

MIT - w pełni wolne oprogramowanie gotowe by Ci służyć. Zobacz [`LICENSE`](LICENSE).

---

<div align="center">

**Twój Projekt** - buduj bez chaosu.

</div>
