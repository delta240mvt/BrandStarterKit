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
    'Ta polityka wyjaśnia, jak przetwarzam dane osób odwiedzających stronę delta240.com — poglądową prezentację marki i projektów DELTA240MVT. Obejmuje też korespondencję mailową, cookies i pamięć przeglądarki.',
  lastUpdatedLabel: 'Ostatnia aktualizacja: 2026-09-16',
  disclaimer:
    'To jest przykładowy szablon polityki prywatności dla strony poglądowej. Strona nie prowadzi sprzedaży, kont użytkowników ani newslettera. Przed użyciem produkcyjnym dostosuj treść do faktycznego sposobu działania i skonsultuj z prawnikiem, jeśli sytuacja tego wymaga.',
  sections: [
    {
      title: '1. Administrator i kontakt',
      paragraphs: [
        'Administratorem danych jest DELTA240MVT, marka prowadząca stronę delta240.com.',
        'W sprawach prywatności i realizacji praw napisz na delta240mvt@gmail.com. Nie wyznaczyłem Inspektora Ochrony Danych; sprawy dotyczące danych obsługuję osobiście.',
      ],
    },
    {
      title: '2. Charakter strony i zakres polityki',
      paragraphs: [
        'Strona działająca pod adresem delta240.com ma charakter poglądowy. Prezentuje markę, ofertę i projekty DELTA240MVT; nie prowadzi sklepu, rejestracji kont, newslettera ani komentarzy.',
        'Polityka dotyczy osób odwiedzających stronę oraz osób kontaktujących się mailowo. Nie obejmuje odrębnych aplikacji i portali prezentowanych w portfolio, które mają własne zasady prywatności.',
        'Możesz przeglądać stronę bez zakładania konta i bez wyrażania zgody na analitykę.',
      ],
    },
    {
      title: '3. Jakie dane przetwarzam i po co',
      paragraphs: [
        'Serwer i dostawca hostingu otrzymują adres IP, czas i adres żądania, informacje o odpowiedzi oraz nagłówki techniczne, które mogą zawierać dane przeglądarki, systemu i strony odsyłającej. Są potrzebne do przesłania strony, utrzymania jej dostępności, wykrywania błędów i nadużyć. Podstawą dostarczenia żądanej usługi jest art. 6 ust. 1 lit. b RODO, a ochrony serwisu i diagnostyki — art. 6 ust. 1 lit. f RODO, czyli uzasadniony interes w zapewnieniu bezpiecznego działania strony.',
        'Gdy piszesz e-mail, przetwarzam adres zwrotny, treść, załączniki, dane z podpisu oraz informacje o dostarczeniu. Zwykłą korespondencję obsługuję na podstawie art. 6 ust. 1 lit. f RODO — uzasadnionego interesu w udzielaniu odpowiedzi i rozwiązywaniu zgłoszeń. Zapytania o zawarcie lub wykonanie umowy obsługuję w niezbędnym zakresie na podstawie art. 6 ust. 1 lit. b RODO. Podanie danych jest dobrowolne, ale bez adresu zwrotnego i opisu sprawy mogę nie móc odpowiedzieć.',
        'Strona nie zbiera danych przez formularze, nie tworzy kont użytkowników i nie realizuje zamówień. Nie przetwarzam danych kart płatniczych ani danych szczególnych kategorii.',
      ],
    },
    {
      title: '4. Cookies i pamięć przeglądarki',
      paragraphs: [
        'Strona nie ustawia własnych plików cookie i nie korzysta z pamięci przeglądarki do celów analitycznych ani marketingowych. Nie używam narzędzi śledzących, pikseli reklamowych ani profilowania.',
        'Dostawca hostingu i sieci dostarczania treści może stosować niezbędne techniczne mechanizmy bezpieczeństwa, na przykład weryfikację ruchu chroniącą przed atakami. Mogą im towarzyszyć techniczne pliki cookie używane wyłącznie w zakresie koniecznym do dostarczenia i ochrony strony — w rozumieniu art. 399 ust. 3 Prawa komunikacji elektronicznej. Nie służą one do śledzenia Cię między witrynami.',
        'Dane witryny możesz w każdej chwili usunąć w ustawieniach przeglądarki. Usunięcie lub blokowanie technicznych mechanizmów bezpieczeństwa może utrudnić dostęp do strony.',
      ],
    },
    {
      title: '5. Analityka',
      paragraphs: [
        'Strona nie uruchamia obecnie skryptów analitycznych. Jeżeli w przyszłości zostanie włączone narzędzie analityczne, zaktualizuję politykę, a integracja wymagająca zgody uruchomi się dopiero po jej wyrażeniu.',
        'Google Analytics, Meta Pixel i podobne narzędzia nie są podłączone. Nie prowadzę remarketingu. Nie sprzedaję danych ani nie podejmuję decyzji opartych wyłącznie na automatycznym przetwarzaniu, które wywoływałyby skutki prawne lub podobnie istotnie na Ciebie wpływały w rozumieniu art. 22 RODO.',
      ],
    },
    {
      title: '6. Dostawcy i odbiorcy danych',
      bullets: [
        'Cloudflare, Inc.: hosting strony w Cloudflare Pages, obsługa DNS domeny oraz ochrona przed nadużyciami. Polityka Cloudflare: https://www.cloudflare.com/privacypolicy/',
        'Google Ireland Limited / Google LLC: obsługa korespondencji, jeśli piszesz na delta240mvt@gmail.com. Skrzynka korzysta z Gmaila na zasadach polityki Google: https://policies.google.com/privacy',
        'GitHub, Inc.: przechowywanie kodu źródłowego i historii zmian strony. Polityka GitHub: https://docs.github.com/site-policy/privacy-policies/github-privacy-statement',
      ],
      paragraphs: [
        'Dostawcy infrastruktury przetwarzają dane w zakresie swoich usług i korzystają z podwykonawców. W zakresie usług świadczonych na moje polecenie działają jako podmioty przetwarzające, a dla własnych celów wskazanych w ich politykach mogą działać jako odrębni administratorzy.',
        'Dane mogą otrzymać upoważnione osoby zapewniające obsługę techniczną lub prawną, wyłącznie w zakresie potrzebnym do zadania, oraz uprawnione organy, jeśli wymagają tego przepisy.',
      ],
    },
    {
      title: '7. Przekazywanie poza EOG',
      paragraphs: [
        'Dostawcy mogą korzystać z międzynarodowej infrastruktury i wsparcia, w tym w USA.',
        'Przy przekazywaniu danych poza EOG stosowane są właściwe dla danej operacji zabezpieczenia: decyzje Komisji Europejskiej o odpowiednim stopniu ochrony, w tym EU–US Data Privacy Framework w zakresie objętych nim podmiotów, lub standardowe klauzule umowne Komisji Europejskiej, wraz z wymaganymi środkami dodatkowymi. Napisz do administratora, aby uzyskać informacje o zabezpieczeniach dotyczących Twoich danych.',
      ],
    },
    {
      title: '8. Jak długo przechowuję dane',
      bullets: [
        'Korespondencja: przez czas obsługi sprawy, a następnie do 12 miesięcy od jej zamknięcia, chyba że konkretną wiadomość trzeba zachować ze względu na umowę, obowiązek prawny lub roszczenia.',
        'Logi techniczne: przez okres potrzebny do wykrywania i wyjaśnienia incydentów oraz utrzymania sprawnej usługi, zgodnie z cyklem zastępowania lub usuwania po stronie dostawcy hostingu. Nie są źródłem dalszego marketingu.',
        'Wnioski dotyczące danych: przez czas realizacji i wykazania prawidłowej obsługi obowiązków z RODO, a w razie sporu przez okres niezbędny do jego rozstrzygnięcia.',
      ],
      paragraphs: [
        'Stosuję ograniczenie celu i zakresu danych. Obowiązek zachowania dokumentu rozliczeniowego nie przedłuża automatycznie przechowywania całej korespondencji.',
      ],
    },
    {
      title: '9. Twoje prawa',
      paragraphs: [
        'Na zasadach RODO możesz żądać dostępu do danych i ich kopii, sprostowania, usunięcia lub ograniczenia przetwarzania. Prawo do przenoszenia obejmuje dane dostarczone przez Ciebie, przetwarzane automatycznie na podstawie zgody lub umowy, przy spełnieniu warunków art. 20 RODO.',
        'Możesz wnieść sprzeciw wobec przetwarzania opartego na prawnie uzasadnionym interesie z przyczyn związanych z Twoją szczególną sytuacją. Zaprzestanę takiego przetwarzania, chyba że wykażę ważne podstawy nadrzędne wobec Twoich praw lub podstawy związane z roszczeniami. Sprzeciw wobec marketingu bezpośredniego jest bezwarunkowy. Zgodę możesz cofnąć w dowolnym momencie, bez wpływu na zgodność wcześniejszych działań.',
        'Wniosek wyślij na delta240mvt@gmail.com. Odpowiem bez zbędnej zwłoki, co do zasady w ciągu miesiąca. Jeśli zgodnie z RODO konieczne będzie przedłużenie o maksymalnie dwa kolejne miesiące, poinformuję o przyczynie w pierwszym miesiącu. Przy uzasadnionych wątpliwościach poproszę tylko o dane niezbędne do potwierdzenia tożsamości.',
        'Masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych. Informacje o prawach i składaniu skarg publikuje UODO: https://uodo.gov.pl. Nie musisz wcześniej uzyskiwać mojej zgody.',
      ],
    },
    {
      title: '10. Bezpieczeństwo i zmiany',
      paragraphs: [
        'Strona używa HTTPS. Ograniczam dostęp do danych i korzystam z zabezpieczeń infrastruktury dostawcy hostingu. Nie przesyłaj w korespondencji haseł, danych kart, dokumentów tożsamości ani danych szczególnych kategorii — nie są potrzebne do korzystania ze strony.',
        'Treści i oferta są kierowane do dorosłych odbiorców; nie prowadzę kampanii zbierania danych dzieci. Jeśli uważasz, że dziecko przekazało dane wymagające interwencji, skontaktuj się ze mną.',
        'Aktualną wersję publikuję na tej stronie z datą zmiany. Przy zmianie funkcji, dostawców lub celów zaktualizuję politykę, a gdy będzie wymagana nowa zgoda — poproszę o nią przed takim przetwarzaniem. Strona ma charakter poglądowy; dokument opisuje prywatność i nie zastępuje regulaminu sprzedaży.',
      ],
    },
  ],
};
