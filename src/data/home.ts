export const HOME = {
  hero: {
    eyebrow: 'Twój pomysł. Wspólna praca.',
    title: 'Twój pomysł. W końcu w działaniu.',
    description: 'Zbuduj stronę, która jasno pokazuje Twoją ofertę. Połącz dobry design, przemyślaną treść i AI — z człowiekiem, który przeprowadzi Cię od pierwszej rozmowy do publikacji.',
    primaryCta: { label: 'Porozmawiajmy o projekcie', href: '#kontakt' },
    secondaryCta: { label: 'Zobacz, jak pracuję', href: '#proces' },
    trustCues: ['Strategia przed designem', 'Praca bezpośrednio ze mną', 'Od pomysłu do publikacji'],
  },
  benefits: { heading: 'Mniej rozproszonych działań. Więcej sensu.', items: [
    { title: 'Jasna oferta', description: 'Odbiorca wie, co robisz, dla kogo i jaki powinien wykonać następny krok.' },
    { title: 'Spójny wizerunek', description: 'Treść, typografia i ruch opowiadają tę samą historię.' },
    { title: 'Własny punkt startu', description: 'Dostajesz działającą stronę i wiesz, jak rozwijać ją dalej.' },
  ] },
  about: { heading: 'Cześć, jestem Przemek.', body: ['Łączę projektowanie, technologię i pracę z AI. Buduję własne produkty i pomagam innym przejść od „mam pomysł” do pierwszej działającej wersji.', 'Pracujemy na Twoim projekcie. Rozmawiasz ze mną, oglądasz kolejne wersje i rozumiesz, dlaczego podejmujemy konkretne decyzje.'], highlights: ['AI Product Engineer', 'Twórca Frinter', 'DELTA240MVT'] },
  services: {
    heading: 'Jedna spójna strona. Od pierwszego zdania do ostatniego kliknięcia.',
    description: 'Projektujemy drogę od zainteresowania do rozmowy. Każdy element ma swoje zadanie.',
    items: [
      { title: 'Strategia i treść', description: 'Porządkujemy odbiorców, obietnicę i argumenty. Układamy sekcje w historię, która pomaga podjąć decyzję.', href: '#kontakt' },
      { title: 'Design i doświadczenie', description: 'Wyrazista typografia, spójny system wizualny, przemyślany widok mobilny i animacje podkreślające treść.', href: '#kontakt' },
      { title: 'Wdrożenie i publikacja', description: 'Działająca strona, techniczne podstawy widoczności, sprawdzenie kluczowych ścieżek i instrukcja dalszej pracy.', href: '#kontakt' },
    ],
  },
  process: { heading: 'Dobry efekt zaczyna się od dobrego procesu.', items: [
    { title: 'Najpierw kierunek.', description: 'Rozmawiamy o Twojej ofercie i odbiorcy. Wybieramy jeden cel strony i ustalamy zakres.' },
    { title: 'Potem konkret.', description: 'Zobaczysz strukturę, treści i kierunek wizualny. Wspólnie dopracujemy to, co naprawdę ważne.' },
    { title: 'Wreszcie w sieci.', description: 'Buduję, sprawdzam i publikuję. Dostajesz projekt oraz jasną instrukcję kolejnych zmian.' },
  ] },
  realizations: {
    heading: 'Mniej obietnic. Więcej zbudowanych rzeczy.',
    description: 'Projekty własne i praca z uczestnikami. Różne wyzwania, wspólny sposób myślenia: najpierw problem, potem rozwiązanie.',
    items: [
      { title: 'Frinter', description: 'Własny produkt wspierający świadomą pracę nad wybranym zadaniem. Od pomysłu przez projektowanie do kolejnych działających wersji.', result: 'Produkt w rozwoju', category: '01 / PRODUCT DESIGN + DEVELOPMENT', href: 'https://delta240mvt.com/projekty/frinter/', visual: 'frinter' },
      { title: 'Pierwsza strona z AI', description: 'Wspólne tworzenie, podgląd i publikacja strony. Po sesji uczestnik ma także instrukcję samodzielnego wprowadzania zmian.', result: 'Warsztat na realnym projekcie', category: '02 / WARSZTAT + WEB DEVELOPMENT', href: 'https://delta240mvt.com/projekty/pierwsza-strona/', visual: 'website' },
      { title: 'Agent magazynowy', description: 'Odczyt danych z Upgates, raportowanie i propozycje operacji zatwierdzane przez człowieka przed wykonaniem.', result: 'Kontrolowany pilotaż', category: '03 / AI + AUTOMATYZACJA', href: 'https://delta240mvt.com/projekty/agent-magazynowy/', visual: 'agent' },
    ],
  },
  testimonials: { heading: 'Doświadczenie w praktyce', items: [] as { quote: string; author: string; role: string }[] },
  faq: { heading: 'Zanim zrobimy pierwszy krok.', items: [
    { question: 'Czy muszę mieć gotowy tekst i identyfikację?', answer: 'Nie. Możemy zacząć od Twojej oferty, odbiorców i kilku przykładów. Podczas ustalania zakresu określimy, jakie materiały już masz, a co przygotujemy w ramach współpracy.' },
    { question: 'Ile kosztuje taka strona?', answer: 'Wycena zależy od liczby widoków, zakresu treści, animacji i integracji. Po rozmowie otrzymasz propozycję z konkretnym zakresem oraz ceną. Decyzję podejmujesz przed rozpoczęciem prac.' },
    { question: 'Jak długo potrwa realizacja?', answer: 'Termin ustalamy po poznaniu zakresu i dostępności materiałów. Harmonogram obejmuje projekt, Twoją opinię, wdrożenie i sprawdzenie strony przed publikacją.' },
    { question: 'Czy będę samodzielnie zmieniać treści?', answer: 'Sposób edycji dobieramy do Twoich potrzeb. Przy przekazaniu projektu pokazuję, jak wprowadzać zmiany i publikować kolejne wersje. Ustalamy to już na etapie zakresu.' },
    { question: 'Czy strona będzie działać dobrze na telefonie?', answer: 'Widok mobilny jest częścią projektu. Sprawdzam czytelność, nawigację, przyciski i podstawowe ścieżki. Ruch jest ograniczony dla osób korzystających z ustawienia redukcji animacji.' },
    { question: 'Co dzieje się po publikacji?', answer: 'Dostajesz stronę i instrukcję dalszej pracy. Zakres poprawek, wsparcia i ewentualnego rozwoju ustalamy w propozycji współpracy — zanim ruszymy.' },
  ] },
  blogPreview: { heading: 'Notatki z budowania', emptyText: 'Pomysły, narzędzia i doświadczenia z pracy.', ctaLabel: 'Czytaj notatki' },
  contact: { heading: 'Zróbmy z tego coś konkretnego.', description: 'Opowiedz mi, co budujesz i czego dziś potrzebujesz. Zaczniemy od rozmowy, nie od długiej specyfikacji.', emailCtaLabel: 'Napisz o swoim projekcie' },
};
export type CtaLink = { label: string; href: string };
export type TextItem = { title: string; description: string };
