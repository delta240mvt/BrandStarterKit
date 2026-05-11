export interface CtaLink {
  label: string;
  href: string;
}

export interface TextItem {
  title: string;
  description: string;
}

export interface HomeData {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    trustCues: string[];
  };
  benefits: {
    heading: string;
    items: TextItem[];
  };
  about: {
    heading: string;
    body: string[];
    highlights: string[];
  };
  services: {
    heading: string;
    description: string;
    items: Array<TextItem & { href: string }>;
  };
  process: {
    heading: string;
    items: TextItem[];
  };
  realizations: {
    heading: string;
    description: string;
    items: Array<TextItem & { result: string }>;
  };
  testimonials: {
    heading: string;
    items: Array<{
      quote: string;
      author: string;
      role: string;
    }>;
  };
  faq: {
    heading: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  blogPreview: {
    heading: string;
    emptyText: string;
    ctaLabel: string;
  };
  contact: {
    heading: string;
    description: string;
    emailCtaLabel: string;
  };
}

export const HOME: HomeData = {
  hero: {
    eyebrow: 'Strona dla lokalnej firmy',
    title: 'Pokaż usługi jasno i zdobądź więcej zapytań od klientów.',
    description:
      'Neutralny starter dla prostych stron usługowych: oferta, realizacje, FAQ, kontakt i blog gotowe do lokalnego dostosowania.',
    primaryCta: {
      label: 'Zobacz oferte',
      href: '#oferta',
    },
    secondaryCta: {
      label: 'Skontaktuj się',
      href: '#kontakt',
    },
    trustCues: ['Szybka publikacja', 'SEO od startu', 'Gotowe pod Cloudflare Pages'],
  },
  benefits: {
    heading: 'Dlaczego ten starter działa',
    items: [
      {
        title: 'Jasna struktura',
        description: 'Najważniejsze informacje klient znajduje bez przeklikiwania wielu podstron.',
      },
      {
        title: 'Latwa edycja',
        description: 'Treści klienta są w przewidywalnych plikach TypeScript i wpisach MDX.',
      },
      {
        title: 'Techniczny porzadek',
        description: 'SEO, sitemap, RSS, schema i pliki AI discovery korzystają ze wspólnej konfiguracji.',
      },
    ],
  },
  about: {
    heading: 'O firmie',
    body: [
      'Pracownia Usługowa to przykładowa lokalna firma, która pokazuje jak może wyglądać gotowy starter dla klienta.',
      'Sekcja opisuje sposób pracy, specjalizację i przewagi bez narzucania konkretnej branży.',
    ],
    highlights: ['Indywidualna wycena', 'Sprawny kontakt', 'Prosty proces współpracy'],
  },
  services: {
    heading: 'Oferta',
    description: 'Podmień te usługi na realną ofertę klienta.',
    items: [
      {
        title: 'Konsultacja i diagnoza potrzeb',
        description: 'Krótka rozmowa, zebranie kontekstu i wskazanie najlepszego zakresu prac.',
        href: '#kontakt',
      },
      {
        title: 'Realizacja uslugi',
        description: 'Przejrzysty proces, terminy i komunikacja dopasowana do lokalnego klienta.',
        href: '#kontakt',
      },
      {
        title: 'Wsparcie po zakończeniu',
        description: 'Pomoc w utrzymaniu efektu, odpowiedzi na pytania i dalsze rekomendacje.',
        href: '#kontakt',
      },
    ],
  },
  process: {
    heading: 'Jak wygląda współpraca',
    items: [
      {
        title: '1. Kontakt',
        description: 'Klient opisuje potrzebę przez email lub telefon.',
      },
      {
        title: '2. Ustalenie zakresu',
        description: 'Uzgadniamy termin, budżet i oczekiwany rezultat.',
      },
      {
        title: '3. Realizacja',
        description: 'Wykonujemy usługę i informujemy o kolejnych krokach.',
      },
    ],
  },
  realizations: {
    heading: 'Realizacje',
    description: 'Przykłady można zamienić na prawdziwe case studies klienta.',
    items: [
      {
        title: 'Usprawnienie procesu obslugi',
        description: 'Przykładowa realizacja pokazująca uporządkowanie komunikacji z klientami.',
        result: 'Krótszy czas odpowiedzi na zapytania.',
      },
      {
        title: 'Nowa oferta lokalnej uslugi',
        description: 'Przykładowy opis wdrożenia prostszego sposobu prezentacji oferty.',
        result: 'Więcej konkretnych zapytań z formularzy i emaila.',
      },
    ],
  },
  testimonials: {
    heading: 'Opinie klientow',
    items: [
      {
        quote: 'Wszystko było jasne od pierwszego kontaktu. Wiedzieliśmy, co dostaniemy i kiedy.',
        author: 'Anna Kowalska',
        role: 'właścicielka lokalnej firmy',
      },
      {
        quote: 'Prosty proces i konkretna komunikacja. Dokładnie tego potrzebowaliśmy.',
        author: 'Marek Nowak',
        role: 'freelancer',
      },
    ],
  },
  faq: {
    heading: 'Najczęstsze pytania',
    items: [
      {
        question: 'Czy wycena jest płatna?',
        answer: 'Podstawowa rozmowa i wstępna wycena są bezpłatne.',
      },
      {
        question: 'Jak szybko odpowiadacie na zapytania?',
        answer: 'Zwykle odpowiadamy w ciągu jednego dnia roboczego.',
      },
      {
        question: 'Czy można zacząć od małego zakresu?',
        answer: 'Tak. Starter jest przygotowany tak, żeby dobrze działał także dla prostych ofert.',
      },
    ],
  },
  blogPreview: {
    heading: 'Blog',
    emptyText: 'Wpisy pojawią się wkrótce.',
    ctaLabel: 'Zobacz wszystkie wpisy',
  },
  contact: {
    heading: 'Kontakt',
    description: 'Napisz, czego potrzebujesz. Odpowiemy z propozycją kolejnego kroku.',
    emailCtaLabel: 'Napisz email',
  },
};
