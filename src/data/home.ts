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
    title: 'Pokaz uslugi jasno i zdobadz wiecej zapytan od klientow.',
    description:
      'Neutralny starter dla prostych stron uslugowych: oferta, realizacje, FAQ, kontakt i blog gotowe do lokalnego dostosowania.',
    primaryCta: {
      label: 'Zobacz oferte',
      href: '#oferta',
    },
    secondaryCta: {
      label: 'Skontaktuj sie',
      href: '#kontakt',
    },
    trustCues: ['Szybka publikacja', 'SEO od startu', 'Gotowe pod Cloudflare Pages'],
  },
  benefits: {
    heading: 'Dlaczego ten starter dziala',
    items: [
      {
        title: 'Jasna struktura',
        description: 'Najwazniejsze informacje klient znajduje bez przeklikiwania wielu podstron.',
      },
      {
        title: 'Latwa edycja',
        description: 'Tresci klienta sa w przewidywalnych plikach TypeScript i wpisach MDX.',
      },
      {
        title: 'Techniczny porzadek',
        description: 'SEO, sitemap, RSS, schema i pliki AI discovery korzystaja ze wspolnej konfiguracji.',
      },
    ],
  },
  about: {
    heading: 'O firmie',
    body: [
      'Pracownia Uslugowa to przykladowa lokalna firma, ktora pokazuje jak moze wygladac gotowy starter dla klienta.',
      'Sekcja opisuje sposob pracy, specjalizacje i przewagi bez narzucania konkretnej branzy.',
    ],
    highlights: ['Indywidualna wycena', 'Sprawny kontakt', 'Prosty proces wspolpracy'],
  },
  services: {
    heading: 'Oferta',
    description: 'Podmien te uslugi na realna oferte klienta.',
    items: [
      {
        title: 'Konsultacja i diagnoza potrzeb',
        description: 'Krotka rozmowa, zebranie kontekstu i wskazanie najlepszego zakresu prac.',
        href: '#kontakt',
      },
      {
        title: 'Realizacja uslugi',
        description: 'Przejrzysty proces, terminy i komunikacja dopasowana do lokalnego klienta.',
        href: '#kontakt',
      },
      {
        title: 'Wsparcie po zakonczeniu',
        description: 'Pomoc w utrzymaniu efektu, odpowiedzi na pytania i dalsze rekomendacje.',
        href: '#kontakt',
      },
    ],
  },
  process: {
    heading: 'Jak wyglada wspolpraca',
    items: [
      {
        title: '1. Kontakt',
        description: 'Klient opisuje potrzebe przez email lub telefon.',
      },
      {
        title: '2. Ustalenie zakresu',
        description: 'Uzgadniamy termin, budzet i oczekiwany rezultat.',
      },
      {
        title: '3. Realizacja',
        description: 'Wykonujemy usluge i informujemy o kolejnych krokach.',
      },
    ],
  },
  realizations: {
    heading: 'Realizacje',
    description: 'Przyklady mozna zamienic na prawdziwe case studies klienta.',
    items: [
      {
        title: 'Usprawnienie procesu obslugi',
        description: 'Przykladowa realizacja pokazujaca uporzadkowanie komunikacji z klientami.',
        result: 'Krotszy czas odpowiedzi na zapytania.',
      },
      {
        title: 'Nowa oferta lokalnej uslugi',
        description: 'Przykladowy opis wdrozenia prostszego sposobu prezentacji oferty.',
        result: 'Wiecej konkretnych zapytan z formularzy i emaila.',
      },
    ],
  },
  testimonials: {
    heading: 'Opinie klientow',
    items: [
      {
        quote: 'Wszystko bylo jasne od pierwszego kontaktu. Wiedzielismy, co dostaniemy i kiedy.',
        author: 'Anna Kowalska',
        role: 'wlascicielka lokalnej firmy',
      },
      {
        quote: 'Prosty proces i konkretna komunikacja. Dokladnie tego potrzebowalismy.',
        author: 'Marek Nowak',
        role: 'freelancer',
      },
    ],
  },
  faq: {
    heading: 'Najczestsze pytania',
    items: [
      {
        question: 'Czy wycena jest platna?',
        answer: 'Podstawowa rozmowa i wstepna wycena sa bezplatne.',
      },
      {
        question: 'Jak szybko odpowiadacie na zapytania?',
        answer: 'Zwykle odpowiadamy w ciagu jednego dnia roboczego.',
      },
      {
        question: 'Czy mozna zaczac od malego zakresu?',
        answer: 'Tak. Starter jest przygotowany tak, zeby dobrze dzialal takze dla prostych ofert.',
      },
    ],
  },
  blogPreview: {
    heading: 'Blog',
    emptyText: 'Wpisy pojawia sie wkrotce.',
    ctaLabel: 'Zobacz wszystkie wpisy',
  },
  contact: {
    heading: 'Kontakt',
    description: 'Napisz, czego potrzebujesz. Odpowiemy z propozycja kolejnego kroku.',
    emailCtaLabel: 'Napisz email',
  },
};
