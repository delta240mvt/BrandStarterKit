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
  title: 'Polityka prywatnosci',
  lead:
    'Ta polityka opisuje, jak moga byc przetwarzane dane osobowe podczas korzystania ze strony internetowej i kontaktu mailowego.',
  lastUpdatedLabel: 'Ostatnia aktualizacja: 2026-05-11',
  disclaimer:
    'To jest przykładowy szablon polityki prywatności. Przed użyciem na stronie klienta dostosuj go do faktycznego sposobu działania firmy i skonsultuj z prawnikiem, jeśli sytuacja tego wymaga.',
  sections: [
    {
      title: '1. Administrator danych',
      paragraphs: [
        'Administratorem danych osobowych jest firma wskazana w konfiguracji strony.',
        'W sprawach dotyczacych prywatnosci mozna skontaktowac sie przez adres email podany w sekcji kontaktu.',
      ],
    },
    {
      title: '2. Zakres polityki',
      paragraphs: [
        'Polityka dotyczy osob odwiedzajacych publiczna strone internetowa, czytelnikow bloga oraz osob kontaktujacych sie mailowo.',
        'Strona ma charakter informacyjny i nie udostepnia kont uzytkownikow, platnosci ani panelu klienta.',
      ],
    },
    {
      title: '3. Kategorie danych',
      bullets: [
        'dane techniczne przetwarzane przez infrastrukture hostingowa, takie jak adres IP, informacje o przegladarce i metadane zapytan;',
        'adres email i tresc wiadomosci, jezeli kontaktujesz sie z firma;',
        'inne informacje dobrowolnie przekazane w korespondencji.',
      ],
    },
    {
      title: '4. Cele przetwarzania',
      bullets: [
        'utrzymanie, zabezpieczenie i diagnostyka strony internetowej;',
        'odpowiadanie na zapytania przeslane droga mailowa;',
        'prowadzenie korespondencji i obrona ewentualnych roszczen;',
        'spelnienie obowiazkow prawnych, jezeli maja zastosowanie.',
      ],
    },
    {
      title: '5. Cookies i analityka',
      paragraphs: [
        'Starter domyslnie nie wlacza skryptow analitycznych. Jezeli wlaczysz analityke, dopisz w tej sekcji informacje o uzywanym narzedziu i zakresie danych.',
        'Dostawca hostingu moze przetwarzac techniczne logi niezbedne do bezpiecznego dostarczania strony.',
      ],
    },
    {
      title: '6. Prawa osoby, ktorej dane dotycza',
      paragraphs: [
        'W zakresie przewidzianym przez RODO przysluguje prawo dostepu do danych, sprostowania, usuniecia, ograniczenia przetwarzania, sprzeciwu, przenoszenia danych oraz wniesienia skargi do organu nadzorczego.',
      ],
    },
  ],
};
