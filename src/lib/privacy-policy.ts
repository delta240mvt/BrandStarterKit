import { getSitePresentation } from '@/lib/site';

export type PrivacyPolicyLocale = 'pl' | 'en';

export interface PrivacyPolicySection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface PrivacyPolicyDocument {
  title: string;
  lead: string;
  lastUpdatedLabel: string;
  languageSwitchLabel: string;
  languageSwitchHref: string;
  sections: PrivacyPolicySection[];
}

const LAST_UPDATED = '2026-04-17';
const site = getSitePresentation();
const CONTACT_EMAIL = site.contactEmail;
const CONTROLLER_NAME = site.authorName;

const controllerLinePl = `Administratorem danych osobowych jest ${CONTROLLER_NAME}, kontakt: ${CONTACT_EMAIL}.`;
const controllerLineEn = `The controller of personal data is ${CONTROLLER_NAME}, contact: ${CONTACT_EMAIL}.`;

export function getPrivacyPolicyDocument(locale: PrivacyPolicyLocale): PrivacyPolicyDocument {
  if (locale === 'en') {
    return {
      title: 'Privacy Policy',
      lead:
        'This Privacy Policy explains how personal data may be processed when you visit the public Focus Equals Freedom website or contact its owner.',
      lastUpdatedLabel: `Last updated: ${LAST_UPDATED}`,
      languageSwitchLabel: 'Read the Polish version',
      languageSwitchHref: '/polityka-prywatnosci',
      sections: [
        {
          title: '1. Controller',
          paragraphs: [
            controllerLineEn,
            `If you have privacy-related questions or want to exercise your GDPR rights, contact ${CONTACT_EMAIL}.`,
          ],
        },
        {
          title: '2. Scope of this policy',
          paragraphs: [
            'This policy applies to visitors of the public website, blog readers, and people contacting the controller by email.',
            'The carved-out public site is a static marketing and publishing website. It does not provide public user accounts, checkout flows, or embedded admin functionality.',
          ],
        },
        {
          title: '3. Categories of personal data',
          bullets: [
            'technical data such as IP address, browser information, device data, and request metadata processed by hosting infrastructure;',
            'email address and message content if you contact the controller directly;',
            'other information voluntarily included in correspondence.',
          ],
        },
        {
          title: '4. Purposes and legal bases',
          bullets: [
            'operating, securing, and maintaining the website: Article 6(1)(f) GDPR;',
            'responding to messages and business enquiries: Article 6(1)(f) GDPR or Article 6(1)(b) GDPR;',
            'keeping records and defending legal claims: Article 6(1)(f) GDPR;',
            'meeting legal obligations where required: Article 6(1)(c) GDPR;',
            'processing based on consent where consent is specifically requested: Article 6(1)(a) GDPR.',
          ],
        },
        {
          title: '5. Cookies and similar technologies',
          paragraphs: [
            'The current standalone implementation may use a lightweight website analytics script to measure aggregate traffic and page usage without enabling public user accounts or advertising features.',
            'The public website does not intentionally use advertising or login cookies. Standard server-side logs and browser-level technical mechanisms may still be used by hosting infrastructure as required to deliver the site securely and reliably.',
          ],
        },
        {
          title: '6. Recipients and processors',
          paragraphs: [
            'Personal data may be processed by providers used to host, secure, and technically operate the website, and by email providers used to handle correspondence.',
          ],
          bullets: [
            'hosting and infrastructure providers;',
            'email and communication providers;',
            'technical security providers where needed to keep the service available and secure.',
          ],
        },
        {
          title: '7. International transfers',
          paragraphs: [
            'Some providers may process data outside the European Economic Area. Where this happens, transfers should rely on a valid GDPR transfer mechanism such as an adequacy decision or appropriate safeguards.',
          ],
        },
        {
          title: '8. Retention',
          bullets: [
            'server and security logs are retained only for as long as needed for security, diagnostics, and operational purposes;',
            'email correspondence is retained for as long as reasonably necessary to handle the request and follow-up communication;',
            'data may be retained longer where required by law or necessary to establish, exercise, or defend legal claims.',
          ],
        },
        {
          title: '9. Your rights under the GDPR',
          paragraphs: [
            'Subject to GDPR conditions, you have the right to access your data, rectify it, erase it, restrict processing, object to processing, request data portability, withdraw consent where processing is based on consent, and lodge a complaint with the Polish supervisory authority (UODO).',
            'This website is not intended to make decisions based solely on automated processing that produce legal or similarly significant effects on individuals.',
          ],
        },
        {
          title: '10. Contact and updates',
          paragraphs: [
            `Questions, requests, and privacy notices should be sent to ${CONTACT_EMAIL}.`,
            'This Privacy Policy may be updated from time to time. The latest version will always be published on this page.',
          ],
        },
      ],
    };
  }

  return {
    title: 'Polityka prywatnosci',
    lead:
      'Niniejsza Polityka prywatnosci opisuje, w jaki sposob moga byc przetwarzane dane osobowe podczas korzystania z publicznej strony Focus Equals Freedom lub kontaktu z jej wlascicielem.',
    lastUpdatedLabel: `Ostatnia aktualizacja: ${LAST_UPDATED}`,
    languageSwitchLabel: 'Read the English version',
    languageSwitchHref: '/privacy-policy',
    sections: [
      {
        title: '1. Administrator danych',
        paragraphs: [
          controllerLinePl,
          `W sprawach dotyczacych prywatnosci oraz wykonywania praw z RODO mozna skontaktowac sie pod adresem ${CONTACT_EMAIL}.`,
        ],
      },
      {
        title: '2. Zakres polityki',
        paragraphs: [
          'Polityka dotyczy osob odwiedzajacych publiczna strone internetowa, czytelnikow bloga oraz osob kontaktujacych sie z administratorem mailowo.',
          'Wydzielona publiczna strona ma charakter statycznej strony publikacyjnej i marketingowej. Nie udostepnia publicznych kont uzytkownikow, procesu zakupu ani osadzonego panelu administracyjnego.',
        ],
      },
      {
        title: '3. Kategorie przetwarzanych danych',
        bullets: [
          'dane techniczne, takie jak adres IP, informacje o przegladarce, dane urzadzenia i metadane zapytan przetwarzane przez infrastrukture hostingowa;',
          'adres e-mail i tresc wiadomosci, jezeli kontaktujesz sie bezposrednio z administratorem;',
          'inne informacje dobrowolnie przekazane w korespondencji.',
        ],
      },
      {
        title: '4. Cele i podstawy prawne przetwarzania',
        bullets: [
          'prowadzenie, zabezpieczenie i utrzymanie strony: art. 6 ust. 1 lit. f RODO;',
          'odpowiadanie na wiadomosci i zapytania biznesowe: art. 6 ust. 1 lit. f RODO lub art. 6 ust. 1 lit. b RODO;',
          'prowadzenie dokumentacji i obrona roszczen: art. 6 ust. 1 lit. f RODO;',
          'wypelnianie obowiazkow prawnych, jezeli sa wymagane: art. 6 ust. 1 lit. c RODO;',
          'przetwarzanie na podstawie zgody, gdy zgoda jest wyraznie wymagana: art. 6 ust. 1 lit. a RODO.',
        ],
      },
      {
        title: '5. Cookies i podobne technologie',
        paragraphs: [
          'Aktualna, samodzielna implementacja moze wykorzystywac lekki skrypt analityczny do mierzenia zagregowanego ruchu i wykorzystania stron, bez udostepniania publicznych kont uzytkownikow ani funkcji reklamowych.',
          'Publiczna strona nie korzysta celowo z cookies reklamowych ani logowania. Infrastruktura hostingowa moze nadal wykorzystywac standardowe logi serwerowe i techniczne mechanizmy przegladarki niezbedne do bezpiecznego i prawidlowego dostarczania strony.',
        ],
      },
      {
        title: '6. Odbiorcy danych i podmioty przetwarzajace',
        paragraphs: [
          'Dane osobowe moga byc przetwarzane przez dostawcow wykorzystywanych do hostowania, zabezpieczania i technicznego utrzymania strony oraz przez dostawcow poczty elektronicznej obslugujacych korespondencje.',
        ],
        bullets: [
          'dostawcy hostingu i infrastruktury;',
          'dostawcy poczty i komunikacji;',
          'dostawcy technicznych zabezpieczen, jezeli sa potrzebni do utrzymania dostepnosci i bezpieczenstwa serwisu.',
        ],
      },
      {
        title: '7. Transfery poza EOG',
        paragraphs: [
          'Czesc dostawcow moze przetwarzac dane poza Europejskim Obszarem Gospodarczym. W takim przypadku transfer powinien opierac sie na odpowiednim mechanizmie zgodnym z RODO, takim jak decyzja stwierdzajaca odpowiedni stopien ochrony lub odpowiednie zabezpieczenia.',
        ],
      },
      {
        title: '8. Okres przechowywania danych',
        bullets: [
          'logi serwerowe i bezpieczenstwa sa przechowywane tak dlugo, jak jest to potrzebne do celow bezpieczenstwa, diagnostyki i utrzymania systemu;',
          'korespondencja mailowa jest przechowywana przez okres niezbedny do obslugi sprawy i dalszej komunikacji;',
          'dane moga byc przechowywane dluzej, jesli wymaga tego prawo albo jest to konieczne do ustalenia, dochodzenia lub obrony roszczen.',
        ],
      },
      {
        title: '9. Prawa osoby, ktorej dane dotycza',
        paragraphs: [
          'Z zastrzezeniem warunkow wynikajacych z RODO przysluguje Ci prawo dostepu do danych, ich sprostowania, usuniecia, ograniczenia przetwarzania, sprzeciwu wobec przetwarzania, przenoszenia danych, cofniecia zgody, jezeli przetwarzanie odbywa sie na podstawie zgody, oraz wniesienia skargi do Prezesa UODO.',
          'Strona nie jest przeznaczona do podejmowania wobec osob decyzji opartych wylacznie na zautomatyzowanym przetwarzaniu, ktore wywoluja skutki prawne lub w podobny sposob istotnie wplywaja na osobe.',
        ],
      },
      {
        title: '10. Kontakt i zmiany polityki',
        paragraphs: [
          `Pytania, zadania i zgloszenia dotyczace prywatnosci nalezy kierowac na adres ${CONTACT_EMAIL}.`,
          'Polityka prywatnosci moze byc okresowo aktualizowana. Aktualna wersja bedzie publikowana na tej stronie.',
        ],
      },
    ],
  };
}
