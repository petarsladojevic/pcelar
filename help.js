const HELP = {
      "program"  : `Ovaj program je namenjen za vođenje evidencije stanja i planiranja postavke košnica
                    Prvi ekran je početni ekran koji beleži statistiku i navodi nas ka ostalim delovima programa
                    Srednji veliki prsten je ujedno i centralni deo koji nas vodi ka mapi/tabeli`,
      "mapa"     : `Mapa je tabela sa ćelijama koje predstavlja plan mesta gde se nalaze naše košnice (voćnjak, livada...)
                    Košnica je dodeljena žuta ćelija. Klikom na ćeliju tabele, pretvaramo praznu ćeliju u košnicu.
                    Svaka košnica ima mogućnost brisanja(x), editovanja(e) i premeštanja(p)
                    Košnica ima mogućnost vođenja dnevnika, klikom na edit(e) započinjemo dnevnik po košnici
                    Dnevnik košnice služi da unesemo zapaženo stanje košnice
                    Košnice koje imaju dnevnik se automatski prepoznaju i imaju znak hexagon na sebi`,
      "dnevnik"  : `Dnevnik je mesto gde su evidentirane sve košnice i unešeni detalji svake posebno.
                    Dnevnik automatski izračunava poziciju košnice (red + kolona)`,
      "pretraga" : `Sekcija [mapa] sadrži mogućnost pretragu dnevnika svih košnica,
                    termin se pronalazi u zbirki unosa i označava košnicu rozom bojom,
                    ukoliko dnevnik košnice sadrži ključnu reč.
                    pretraživač NIJE osetljiv na veličinu slova`,
      "x-e-p"    : `Kontrole ćelije:
                     crveno dugme obriši(x)
                     zeleno dugme edituj(e)
                     žuto dugme premesti(p)

                     zeleno dugme otvara dnevnik u kojem unosimo zatečeno stanje košnice
                     žuto dugme započinje proces premeštanja, kada pritisneš isto, izaberi koju sledeću poziciju treba da zauzme
                     košnica koja se premešta se prepoznaje, po vrdanju`,
      "↰"        : `Povratak unazad/osveženje
                    Da osvežiš celokupan program zadrži ovo dugme, 3 sekunde i pusti dugme`,
      "?"        : `Pomoć, korisničko uputstvo programa`,
      "Z+/Z-"    : `Zumiranje/odzumiranje mape zarad boljeg pregleda`,
      "↺"        : `Rotiraj mapu`,

      "+r"       : `Dodaj jedan poslednji red tabeli, (proširi mapu)`,
      "+k"       : `Dodaj jednu kolonu tabeli, (proširi mapu)`,
      "-r"       : `Ukloni poslednji red iz tabele, (smanji visinu mape)`,
      "-k"       : `Ukloni poslednju kolonu iz tabele, (smanji širinu mapu)`,

      "ostalo"   : `Ovde možemo exportovati naš dnevnik sa mapom i spiskom košnica u nameri da ga sačuvamo kao .csv fajl,
                    kao i importovati stari dnevnik`,
      "čuvanje podataka": `Ovaj program je specijalno napisan da nema potrebe da se registrujete,
                           svaka aktivnost se odigrava na vašem telefonu/računaru u okviru
                           jednog pretraživača i koristi lokalne resurse da popamti urađene stvari,
                           program je potpuno bezbedan i privatan za svakog korisnika,
                           jer se sve odigrava na klijentovoj strani.
                           (promena pretraživača, ne može da prenese resurse)
                           Svaki povratak na početni ekran sačuvaće dotadašnji unos ukoliko je nastala promena`,
      "kreirao"  : `Petar Sladojević
                    godina(2023)
                    kontakt: tehnocipher@gmail.com`
}
