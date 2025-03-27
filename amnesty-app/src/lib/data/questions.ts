// Questions for Refugee Rights & Migration category
import { Question } from './types';

// Category 1: Flyktningers rettigheter og migrasjon
export const refugeeQuestions: Question[] = [
  {
    id: 1,
    text: "Bør asylsøkere som flykter fra forfølgelse ha rett til beskyttelse, selv om det belaster ressurser?",
    categoryId: 1
  },
  {
    id: 2,
    text: "Er det riktig å returnere asylsøkere til land der de risikerer forfølgelse hvis de ikke oppfyller alle kriterier for flyktningestatus?",
    categoryId: 1
  },
  {
    id: 3,
    text: "Bør vestlige land ta imot flere kvoteflyktninger enn de gjør i dag?",
    categoryId: 1
  },
  {
    id: 4,
    text: "Har familier med barn som har søkt asyl rett til bedre boforhold enn enslige asylsøkere?",
    categoryId: 1
  },
  {
    id: 5,
    text: "Bør asylprosessen være like streng for krigsofre som for personer som flykter fra politisk forfølgelse?",
    categoryId: 1
  },
  {
    id: 6,
    text: "Er det rettferdig å forvente at flyktninger skal integreres fullstendig i vertslandet, selv om det betyr at de må gi opp deler av sin kulturelle identitet?",
    categoryId: 1
  },
  {
    id: 7,
    text: "Har innvandrere rett til familiegjenforening, selv når det påvirker mottakerlandets økonomi?",
    categoryId: 1
  },
  {
    id: 8,
    text: "Bør flyktninger straffes for å ha brukt ulovlige veier for å komme inn i et land?",
    categoryId: 1
  },
  {
    id: 9,
    text: "Er det rettferdig å gi midlertidig beskyttelse i stedet for permanent oppholdstillatelse til flyktninger?",
    categoryId: 1
  },
  {
    id: 10,
    text: "Bør land med flere ressurser ta imot flere flyktninger enn fattigere land?",
    categoryId: 1
  },
  {
    id: 11,
    text: "Bør humanitær bistand gis i nærområder framfor å ta imot flyktninger i vestlige land?",
    categoryId: 1
  },
  {
    id: 12,
    text: "Skal asylsøkere ha samme rett til helsehjelp som statsborgere?",
    categoryId: 1
  }
];

// Category 2: Ytringsfrihet og informasjon
export const expressionQuestions: Question[] = [
  {
    id: 13,
    text: "Bør ytringsfriheten beskytte uttalelser som dypt krenker enkelte grupper?",
    categoryId: 2
  },
  {
    id: 14,
    text: "Er det rettferdig å begrense ytringer som oppfordrer til hat mot minoriteter?",
    categoryId: 2
  },
  {
    id: 15,
    text: "Bør sosiale medier kunne sensurere innhold som de anser som skadelig?",
    categoryId: 2
  },
  {
    id: 16,
    text: "Har staten rett til å blokkere nettsider som sprer feilinformasjon under en krise?",
    categoryId: 2
  },
  {
    id: 17,
    text: "Er det riktig å straffe personer som deler falske nyheter som kan forårsake panikk?",
    categoryId: 2
  },
  {
    id: 18,
    text: "Bør journalister kunne beskytte kildene sine, selv når de avslører statshemmeligheter?",
    categoryId: 2
  },
  {
    id: 19,
    text: "Har kunstnere rett til å skape provoserende kunst, selv når den kan virke støtende for religiøse grupper?",
    categoryId: 2
  },
  {
    id: 20,
    text: "Er det rettferdig å begrense ytringsfriheten for å beskytte nasjonal sikkerhet?",
    categoryId: 2
  },
  {
    id: 21,
    text: "Bør utdanningsinstitusjoner kunne nekte kontroversielle talere å holde foredrag?",
    categoryId: 2
  },
  {
    id: 22,
    text: "Skal barn ha rett til å ytre sine meninger fritt, selv når de går imot foreldrenes verdier?",
    categoryId: 2
  }
];

// Category 3: Økonomisk og bedriftsansvar
export const economicQuestions: Question[] = [
  {
    id: 23,
    text: "Bør selskaper holdes ansvarlige for menneskerettighetsbrudd i sine leverandørkjeder i utlandet?",
    categoryId: 3
  },
  {
    id: 24,
    text: "Er det rettferdig å boikotte produkter fra land med dårlig menneskerettighetshistorikk?",
    categoryId: 3
  },
  {
    id: 25,
    text: "Har selskaper et ansvar for å betale \"rettferdige lønninger\" selv om lokale lover tillater lavere betaling?",
    categoryId: 3
  },
  {
    id: 26,
    text: "Bør multinasjonale selskaper følge samme arbeidsstandarder i alle land de opererer i?",
    categoryId: 3
  },
  {
    id: 27,
    text: "Er det riktig at investorer trekker støtte fra selskaper som skader miljøet, selv om det betyr færre arbeidsplasser?",
    categoryId: 3
  },
  {
    id: 28,
    text: "Har lokalsamfunn rett til å nekte gruveselskaper å utvinne ressurser på deres land?",
    categoryId: 3
  },
  {
    id: 29,
    text: "Bør stater kunne nasjonalisere viktige ressurser, selv når det betyr å bryte avtaler med internasjonale selskaper?",
    categoryId: 3
  },
  {
    id: 30,
    text: "Er det akseptabelt at selskaper bruker skatteparadiser for å redusere sine skattebetalinger?",
    categoryId: 3
  },
  {
    id: 31,
    text: "Har arbeidere rett til å streike, selv når det kan skade økonomien?",
    categoryId: 3
  },
  {
    id: 32,
    text: "Bør offentlige tjenester som helse og utdanning noen gang privatiseres?",
    categoryId: 3
  }
];

// Category 4: Strafferett og dødsstraff
export const justiceQuestions: Question[] = [
  {
    id: 33,
    text: "Kan dødsstraff noen gang rettferdiggjøres for grusomme forbrytelser?",
    categoryId: 4
  },
  {
    id: 34,
    text: "Bør livstidsstraff uten mulighet for prøveløslatelse være lovlig?",
    categoryId: 4
  },
  {
    id: 35,
    text: "Er det riktig å bruke isolasjon som straff i fengsler?",
    categoryId: 4
  },
  {
    id: 36,
    text: "Har fanger rett til å stemme ved valg?",
    categoryId: 4
  },
  {
    id: 37,
    text: "Bør unge lovbrytere behandles annerledes enn voksne i rettssystemet?",
    categoryId: 4
  },
  {
    id: 38,
    text: "Er rehabilitering viktigere enn straff i kriminalomsorg?",
    categoryId: 4
  },
  {
    id: 39,
    text: "Bør det være mildere straffer for ikke-voldelige forbrytelser?",
    categoryId: 4
  },
  {
    id: 40,
    text: "Er det rettferdig å gi strengere straffer til gjengangere?",
    categoryId: 4
  },
  {
    id: 41,
    text: "Bør dommere ha fleksibilitet til å avvike fra lovbestemte minimumsstraffer?",
    categoryId: 4
  },
  {
    id: 42,
    text: "Har ofre rett til å påvirke straffeutmålingen i rettssaker?",
    categoryId: 4
  }
];

// Category 5: Protest og sivil ulydighet
export const protestQuestions: Question[] = [
  {
    id: 43,
    text: "Bør fredelige demonstranter ha rett til å samles selv om det forårsaker store forstyrrelser?",
    categoryId: 5
  },
  {
    id: 44,
    text: "Er sivil ulydighet akseptabelt når lovlige midler for å påvirke ikke fungerer?",
    categoryId: 5
  },
  {
    id: 45,
    text: "Har politiet rett til å bruke makt for å oppløse ulovlige demonstrasjoner?",
    categoryId: 5
  },
  {
    id: 46,
    text: "Bør aktivister som bryter loven for en sak straffes, selv om formålet er moralsk forsvarlig?",
    categoryId: 5
  },
  {
    id: 47,
    text: "Er blokkering av veier eller offentlige bygninger en akseptabel form for protest?",
    categoryId: 5
  },
  {
    id: 48,
    text: "Har myndighetene rett til å begrense demonstrasjoner av hensyn til offentlig sikkerhet?",
    categoryId: 5
  },
  {
    id: 49,
    text: "Bør aktivister kunne forbli anonyme under protester?",
    categoryId: 5
  },
  {
    id: 50,
    text: "Er det akseptabelt å boikotte bedrifter for å presse dem til å endre praksis?",
    categoryId: 5
  }
];

// Category 6: Identitet og diskriminering
export const identityQuestions: Question[] = [
  {
    id: 51,
    text: "Bør enkeltpersoner ha rett til å bestemme over sin egen seksuelle identitet, selv i samfunn der dette ikke er akseptert?",
    categoryId: 6
  },
  {
    id: 52,
    text: "Er kvotering i utdanning eller arbeidsliv en rettferdig måte å bekjempe historisk diskriminering?",
    categoryId: 6
  },
  {
    id: 53,
    text: "Bør religiøse institusjoner kunne nekte tjenester basert på sin tro?",
    categoryId: 6
  },
  {
    id: 54,
    text: "Har samfunnet plikt til å tilrettelegge for personer med funksjonsnedsettelser, selv når det er kostbart?",
    categoryId: 6
  },
  {
    id: 55,
    text: "Bør hatprat være straffbart?",
    categoryId: 6
  },
  {
    id: 56,
    text: "Er det akseptabelt å begrense religiøse symboler i offentlige rom?",
    categoryId: 6
  },
  {
    id: 57,
    text: "Bør kjønnskorrigerende behandling være tilgjengelig for mindreårige?",
    categoryId: 6
  },
  {
    id: 58,
    text: "Har private bedrifter rett til å nekte tjenester basert på politiske oppfatninger?",
    categoryId: 6
  },
  {
    id: 59,
    text: "Er det akseptabelt at idrettskonkurranser separeres etter kjønn?",
    categoryId: 6
  },
  {
    id: 60,
    text: "Bør anonyme jobbsøknader brukes for å bekjempe diskriminering?",
    categoryId: 6
  }
];

// Category 7: Personvern og overvåkning
export const privacyQuestions: Question[] = [
  {
    id: 61,
    text: "Bør myndighetene ha rett til å overvåke innbyggernes kommunikasjon for å styrke nasjonal sikkerhet?",
    categoryId: 7
  },
  {
    id: 62,
    text: "Er det akseptabelt at selskaper samler data om brukerne for å målrette reklame?",
    categoryId: 7
  },
  {
    id: 63,
    text: "Bør innbyggere kunne kreve at informasjon om dem slettes fra internett?",
    categoryId: 7
  },
  {
    id: 64,
    text: "Er det rettferdig å bruke ansiktsgjenkjenningsteknologi i offentlige rom?",
    categoryId: 7
  },
  {
    id: 65,
    text: "Har barn rett til privatliv fra foreldrene sine?",
    categoryId: 7
  },
  {
    id: 66,
    text: "Bør arbeidsgiver kunne overvåke ansattes aktivitet i arbeidstiden?",
    categoryId: 7
  },
  {
    id: 67,
    text: "Er hemmelig overvåkning noen gang forsvarlig uten rettslig kjennelse?",
    categoryId: 7
  },
  {
    id: 68,
    text: "Har myndighetene rett til å samle inn helsedata under en pandemi?",
    categoryId: 7
  },
  {
    id: 69,
    text: "Bør krypteringsteknologi være tilgjengelig for alle, selv om det kan skjule kriminell aktivitet?",
    categoryId: 7
  },
  {
    id: 70,
    text: "Er det akseptabelt at forsikringsselskaper bruker helseinformasjon for å beregne premier?",
    categoryId: 7
  }
];

// Category 8: Internasjonale intervensjoner og suverenitet
export const internationalQuestions: Question[] = [
  {
    id: 71,
    text: "Er det riktig å intervenere militært i et annet land for å stoppe grove menneskerettighetsbrudd?",
    categoryId: 8
  },
  {
    id: 72,
    text: "Bør økonomiske sanksjoner brukes mot land som bryter menneskerettigheter, selv om det rammer sivile?",
    categoryId: 8
  },
  {
    id: 73,
    text: "Har Den internasjonale straffedomstolen rett til å straffeforfølge ledere uavhengig av landets samtykke?",
    categoryId: 8
  },
  {
    id: 74,
    text: "Er det rettferdig at FNs sikkerhetsråd har vetomakt i internasjonale beslutninger?",
    categoryId: 8
  },
  {
    id: 75,
    text: "Bør det internasjonale samfunnet anerkjenne separatistbevegelser som kjemper for selvstendighet?",
    categoryId: 8
  },
  {
    id: 76,
    text: "Har stater rett til å beskytte sine grenser med alle nødvendige midler?",
    categoryId: 8
  },
  {
    id: 77,
    text: "Er det riktig å prioritere diplomatiske løsninger over militær intervensjon, selv når sivile liv står i fare?",
    categoryId: 8
  },
  {
    id: 78,
    text: "Bør vestlige demokratier forsøke å fremme demokrati i andre land?",
    categoryId: 8
  },
  {
    id: 79,
    text: "Er det forsvarlig å forhandle med terrorgrupper for å få slutt på konflikter?",
    categoryId: 8
  },
  {
    id: 80,
    text: "Har urfolk rett til selvbestemmelse innenfor en nasjonalstat?",
    categoryId: 8
  }
];

// Category 9: Kjønn og kvinners rettigheter
export const genderQuestions: Question[] = [
  {
    id: 81,
    text: "Bør kvinner ha like juridiske rettigheter som menn i alle land, uavhengig av kultur og religion?",
    categoryId: 9
  },
  {
    id: 82,
    text: "Er kjønnskvotering i politikk og lederstillinger en rettferdig måte å oppnå likestilling på?",
    categoryId: 9
  },
  {
    id: 83,
    text: "Bør abort være lovlig i alle situasjoner?",
    categoryId: 9
  },
  {
    id: 84,
    text: "Er det akseptabelt at religiøse lover behandler kvinner og menn ulikt?",
    categoryId: 9
  },
  {
    id: 85,
    text: "Har samfunnet et ansvar for å bekjempe skadelige kulturelle praksiser som barneekteskap?",
    categoryId: 9
  },
  {
    id: 86,
    text: "Bør prevensjon være gratis og tilgjengelig for alle?",
    categoryId: 9
  },
  {
    id: 87,
    text: "Er det riktig å ha separate idrettskonkurranser for menn og kvinner?",
    categoryId: 9
  },
  {
    id: 88,
    text: "Bør foreldre dele foreldrepermisjon likt?",
    categoryId: 9
  },
  {
    id: 89,
    text: "Har stater plikt til å bekjempe kjønnsbasert vold i hjemmet?",
    categoryId: 9
  },
  {
    id: 90,
    text: "Er seksuell trakassering på arbeidsplassen arbeidsgivers ansvar?",
    categoryId: 9
  }
];

// Category 10: Urfolks rettigheter
export const indigenousQuestions: Question[] = [
  {
    id: 91,
    text: "Burde urfolks rettigheter til land og tradisjonelle levemåter gå foran naturressursutvinning som gagner hele nasjonen?",
    categoryId: 10
  },
  {
    id: 92,
    text: "Har urfolk rett til å bestemme over ressursene på sine tradisjonelle områder?",
    categoryId: 10
  },
  {
    id: 93,
    text: "Bør utdanningssystemet inkludere urfolks språk og kultur?",
    categoryId: 10
  },
  {
    id: 94,
    text: "Er det rettferdig at urfolk får spesielle rettigheter som andre borgere ikke har?",
    categoryId: 10
  },
  {
    id: 95,
    text: "Bør historiske urettferdigheter mot urfolk kompenseres økonomisk?",
    categoryId: 10
  },
  {
    id: 96,
    text: "Har urfolk rett til eget rettssystem for interne konflikter?",
    categoryId: 10
  },
  {
    id: 97,
    text: "Er det akseptabelt å begrense tradisjonelle jakt- og fiskepraksiser av miljøhensyn?",
    categoryId: 10
  },
  {
    id: 98,
    text: "Bør urfolk konsulteres før store infrastrukturprosjekter på deres tradisjonelle land?",
    categoryId: 10
  },
  {
    id: 99,
    text: "Har urfolk rett til å kontrollere hvem som får tilgang til deres kulturelle kunnskaper?",
    categoryId: 10
  },
  {
    id: 100,
    text: "Er det riktig at landets rettssystem overstyrer urfolks tradisjonelle lover?",
    categoryId: 10
  }
];

// Combine all questions
export const allQuestions: Question[] = [
  ...refugeeQuestions,
  ...expressionQuestions,
  ...economicQuestions,
  ...justiceQuestions,
  ...protestQuestions,
  ...identityQuestions,
  ...privacyQuestions,
  ...internationalQuestions,
  ...genderQuestions,
  ...indigenousQuestions
];
