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
    eyebrow: 'Strona dla Twojego projektu',
    title: 'Przedstaw swój projekt jasno i zdobywaj zaufanie odbiorców.',
    description:
      'Minimalistyczna, nowoczesna strona internetowa dla Twojej inicjatywy. Przedstaw ofertę, pochwal się realizacjami i z łatwością buduj bazę klientów.',
    primaryCta: {
      label: 'Zobacz ofertę',
      href: '#oferta',
    },
    secondaryCta: {
      label: 'Skontaktuj się',
      href: '#kontakt',
    },
    trustCues: ['Szybkie wdrożenie', 'Optymalizacja SEO', 'Nowoczesny design'],
  },
  benefits: {
    heading: 'Dlaczego ten układ działa',
    items: [
      {
        title: 'Przejrzysta struktura',
        description: 'Najważniejsze informacje są od razu widoczne, bez konieczności błądzenia po zakładkach.',
      },
      {
        title: 'Prosta edycja',
        description: 'Twoje treści są bezpieczne i niezwykle łatwe do aktualizacji w przewidywalnym środowisku.',
      },
      {
        title: 'Techniczna perfekcja',
        description: 'Strona od samego początku jest zoptymalizowana pod wyszukiwarki i błyskawiczne działanie.',
      },
    ],
  },
  about: {
    heading: 'O projekcie',
    body: [
      'Twoja nowa strona to nie tylko cyfrowa wizytówka. To potężne narzędzie, które skutecznie pracuje na wizerunek i sukces całego przedsięwzięcia.',
      'Dzięki przemyślanej strukturze, każdy odwiedzający błyskawicznie zrozumie Twoją misję, zakres działań i korzyści płynące ze współpracy.',
    ],
    highlights: ['Indywidualne podejście', 'Sprawna komunikacja', 'Klarowny proces współpracy'],
  },
  services: {
    heading: 'Oferta',
    description: 'Odkryj, w czym specjalizuje się nasz zespół i w jaki sposób możemy wesprzeć Twój rozwój.',
    items: [
      {
        title: 'Konsultacja i diagnoza potrzeb',
        description: 'Krótka rozmowa, podczas której zbierzemy niezbędny kontekst i wyznaczymy optymalną ścieżkę działania.',
        href: '#kontakt',
      },
      {
        title: 'Realizacja i wdrożenie',
        description: 'Przejrzysty i sprawny proces prowadzenia projektu, gwarantujący jakość na każdym z etapów.',
        href: '#kontakt',
      },
      {
        title: 'Wsparcie po zakończeniu prac',
        description: 'Pełna pomoc w utrzymaniu osiągniętych efektów, odpowiedzi na pytania oraz rekomendacje na przyszłość.',
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
