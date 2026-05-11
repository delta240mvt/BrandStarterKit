export interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface PrivacyPolicyData {
  title: string;
  lead: string;
  lastUpdatedLabel: string;
  disclaimer: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY: PrivacyPolicyData = {
  title: 'Polityka prywatności',
  lead:
    'Ta polityka opisuje, jak mogą być przetwarzane dane osobowe podczas korzystania ze strony internetowej i kontaktu mailowego.',
  lastUpdatedLabel: 'Ostatnia aktualizacja: 2026-05-11',
  disclaimer:
    'To jest przykładowy szablon polityki prywatności. Przed użyciem na stronie klienta dostosuj go do faktycznego sposobu działania firmy i skonsultuj z prawnikiem, jeśli sytuacja tego wymaga.',
  sections: [
    {
      title: '1. Administrator danych',
      paragraphs: [
        'Administratorem danych osobowych jest firma wskazana w konfiguracji strony.',
        'W sprawach dotyczących prywatności można skontaktować się przez adres email podany w sekcji kontaktu.',
      ],
    },
    {
      title: '2. Zakres polityki',
      paragraphs: [
        'Polityka dotyczy osób odwiedzających publiczną stronę internetową, czytelników bloga oraz osób kontaktujących się mailowo.',
        'Strona ma charakter informacyjny i nie udostępnia kont użytkowników, płatności ani panelu klienta.',
      ],
    },
    {
      title: '3. Kategorie danych',
      bullets: [
        'dane techniczne przetwarzane przez infrastrukturę hostingową, takie jak adres IP, informacje o przeglądarce i metadane zapytań;',
        'adres email i treść wiadomości, jeżeli kontaktujesz się z firmą;',
        'inne informacje dobrowolnie przekazane w korespondencji.',
      ],
    },
    {
      title: '4. Cele przetwarzania',
      bullets: [
        'utrzymanie, zabezpieczenie i diagnostyka strony internetowej;',
        'odpowiadanie na zapytania przesłane drogą mailową;',
        'prowadzenie korespondencji i obrona ewentualnych roszczeń;',
        'spełnienie obowiązków prawnych, jeżeli mają zastosowanie.',
      ],
    },
    {
      title: '5. Cookies i analityka',
      paragraphs: [
        'Starter domyślnie nie włącza skryptów analitycznych. Jeżeli włączysz analitykę, dopisz w tej sekcji informacje o używanym narzędziu i zakresie danych.',
        'Dostawca hostingu może przetwarzać techniczne logi niezbędne do bezpiecznego dostarczania strony.',
      ],
    },
    {
      title: '6. Prawa osoby, ktorej dane dotycza',
      paragraphs: [
        'W zakresie przewidzianym przez RODO przysługuje prawo dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu, przenoszenia danych oraz wniesienia skargi do organu nadzorczego.',
      ],
    },
  ],
};
