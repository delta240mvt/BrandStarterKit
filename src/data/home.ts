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
    eyebrow: 'Focus OS dla pracy wiedzy',
    title: 'Zamieniaj intencję w skupioną pracę — bez kultu produktywności.',
    description:
      'Frinter pomaga founderom, twórcom i pracownikom wiedzy rozpocząć świadomą sesję pracy, zapisać jej kontekst i wyciągnąć spokojny wniosek na przyszłość.',
    primaryCta: {
      label: 'Załóż konto',
      href: 'https://web.frinter.app/register',
    },
    secondaryCta: {
      label: 'Poznaj podejście',
      href: '#o-projekcie',
    },
    trustCues: ['Jedna intencja na sesję', 'Kontekst zamiast oceny', 'Prywatna refleksja'],
  },
  benefits: {
    heading: 'Praca, którą można spokojnie kontynuować',
    items: [
      {
        title: 'Intencja przed timerem',
        description: 'Każda sesja zaczyna się od nazwania rezultatu, który chcesz stworzyć.',
      },
      {
        title: 'Kontekst bez nadzoru',
        description: 'Frinter pomaga obserwować warunki pracy, nie mierzyć człowieka.',
      },
      {
        title: 'Refleksja po działaniu',
        description: 'Krótki zapis po sesji ułatwia powrót do ważnego zadania.',
      },
    ],
  },
  about: {
    heading: 'Frinter jest Focus OS, nie kolejnym task managerem',
    body: [
      'Frinter łączy intencję, chronioną sesję pracy i refleksję o energii, aby zmniejszać zgadywanie przy planowaniu kolejnego kroku.',
      'Nie diagnozuje, nie ocenia dnia i nie służy do monitorowania pracowników. Dane są materiałem do własnej obserwacji.',
    ],
    highlights: ['Skupienie', 'Praca głęboka', 'Energia i rytm'],
  },
  services: {
    heading: 'Jak wspiera pracę Frinter',
    description: 'Trzy proste warstwy pomagają przejść od planu do rzeczywistego działania.',
    items: [
      {
        title: 'Frint: świadoma sesja',
        description: 'Wybierz jeden rezultat, pracuj w wyznaczonym bloku i zostaw ślad dla następnej sesji.',
        href: 'https://web.frinter.app/register',
      },
      {
        title: 'Obserwacja energii',
        description: 'Zapisuj kontekst własnej gotowości bez zamieniania go w wynik albo diagnozę.',
        href: 'https://web.frinter.app/register',
      },
      {
        title: 'Przegląd i decyzja',
        description: 'Wróć do sesji, zauważ wzorzec i wybierz jeden mały eksperyment na kolejny tydzień.',
        href: 'https://web.frinter.app/register',
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
