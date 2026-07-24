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
    eyebrow: 'Strona dla Twojego nowego projektu',
    title: 'Przedstaw swój projekt jasno i buduj zaufanie odbiorców.',
    description:
      'Gotowy, statyczny szablon w Astro 7 pomaga szybko zaprezentować ofertę, działania i historię Twojej nowej marki.',
    primaryCta: {
      label: 'Zobacz ofertę',
      href: '#oferta',
    },
    secondaryCta: {
      label: 'Skontaktuj się',
      href: '#kontakt',
    },
    trustCues: ['Astro 7 SSG', 'SEO i GEO', 'Edycja z AI'],
  },
  benefits: {
    heading: 'Fundament dla Twojej marki',
    items: [
      {
        title: 'Przejrzysta struktura',
        description: 'Najważniejsze informacje są od razu widoczne, bez konieczności błądzenia po zakładkach.',
      },
      {
        title: 'Prosta edycja',
        description: 'Treści są łatwe do aktualizacji w plikach danych i wpisach MDX.',
      },
      {
        title: 'Techniczna jakość',
        description: 'Strona od początku jest statyczna, szybka i przygotowana pod wyszukiwarki.',
      },
    ],
  },
  about: {
    heading: 'Szablon dla Twojego nowego projektu',
    body: [
      'Twój Brand Starter Kit to gotowy punkt startu dla startupu, produktu, usługi lub marki osobistej.',
      'Wszystkie kluczowe dane są w prostych plikach, więc kolejne zmiany może sprawnie wykonać człowiek albo agent AI.',
    ],
    highlights: ['Astro 7 SSG', 'Prosta edycja', 'Widoczność SEO i GEO'],
  },
  services: {
    heading: 'Co zawiera starter',
    description: 'Najważniejsze elementy strony są gotowe do dostosowania do Twojego projektu.',
    items: [
      {
        title: 'Strona główna',
        description: 'Sekcje hero, korzyści, oferta, FAQ, kontakt i social proof w jednym spójnym układzie.',
        href: '#kontakt',
      },
      {
        title: 'Blog MDX',
        description: 'Publikuj poradniki, aktualności i case studies jako proste pliki Markdown lub MDX.',
        href: '#kontakt',
      },
      {
        title: 'SEO i GEO',
        description: 'Sitemap, RSS, robots.txt, llms.txt, dane strukturalne i metadata są generowane statycznie.',
        href: '#kontakt',
      },
    ],
  },
  process: {
    heading: 'Jak wygląda współpraca',
    items: [
      {
        title: '1. Nawiązanie kontaktu',
        description: 'Napisz do nas, aby opowiedzieć o swoim pomyśle, wyzwaniach i głównych potrzebach.',
      },
      {
        title: '2. Ustalenie szczegółów',
        description: 'Wspólnie doprecyzowujemy pełen zakres prac, harmonogram oraz wymagany budżet.',
      },
      {
        title: '3. Realizacja',
        description: 'Wykonujemy powierzone zadanie, na bieżąco informując Cię o kolejnych kamieniach milowych.',
      },
    ],
  },
  realizations: {
    heading: 'Zrealizowane projekty',
    description: 'Poznaj wybrane przykłady naszych działań, które przyniosły wymierne rezultaty.',
    items: [
      {
        title: 'Optymalizacja procesów operacyjnych',
        description: 'Uporządkowaliśmy skomplikowaną komunikację, wdrażając dedykowane narzędzia dla zespołu.',
        result: 'Znacznie krótszy czas odpowiedzi na zapytania.',
      },
      {
        title: 'Nowa strategia prezentacji usługi',
        description: 'Zaprojektowaliśmy i wdrożyliśmy w pełni nowoczesny, przystępny sposób prezentacji oferty.',
        result: 'Zauważalny wzrost liczby wartościowych zapytań.',
      },
    ],
  },
  testimonials: {
    heading: 'Opinie',
    items: [
      {
        quote: 'Wszystko było jasne od pierwszego kontaktu. Wiedzieliśmy dokładnie, co otrzymamy i w jakim terminie.',
        author: 'Anna Kowalska',
        role: 'przedsiębiorczyni',
      },
      {
        quote: 'Profesjonalne podejście i absolutnie konkretna komunikacja. Właśnie tego szukaliśmy przy naszym projekcie.',
        author: 'Marek Nowak',
        role: 'twórca cyfrowy',
      },
      {
        quote: 'Gorąco polecam. Wdrożenie odbyło się terminowo, bez najmniejszego chaosu i z pełnym wsparciem po starcie.',
        author: 'Katarzyna Wiśniewska',
        role: 'menedżerka projektów',
      },
    ],
  },
  faq: {
    heading: 'Częste pytania',
    items: [
      {
        question: 'Od czego najlepiej zacząć współpracę?',
        answer: 'Najlepiej od krótkiej wiadomości z opisem Twojego projektu. Skontaktujemy się z Tobą, aby omówić wszystkie szczegóły na niezobowiązującej rozmowie.',
      },
      {
        question: 'Jak długo trwa standardowa realizacja?',
        answer: 'Czas realizacji zawsze zależy od skomplikowania danego projektu, jednak typowe wdrożenia zamykamy zwykle w ciągu kilku tygodni.',
      },
      {
        question: 'Czy projekt jest skalowalny i elastyczny?',
        answer: 'Absolutnie tak. Rozwiązania projektujemy z myślą o przyszłości, dzięki czemu zawsze można dostosować zakres do Twoich aktualnych potrzeb.',
      },
    ],
  },
  blogPreview: {
    heading: 'Blog',
    emptyText: 'Wkrótce pojawią się tutaj pierwsze wpisy.',
    ctaLabel: 'Zobacz wszystkie wpisy',
  },
  contact: {
    heading: 'Kontakt',
    description: 'Napisz, czego dokładnie potrzebuje Twój projekt. Wrócimy z propozycją najlepszego rozwiązania.',
    emailCtaLabel: 'Napisz e-mail',
  },
};
