window.SQL_BREAKOUT_CHAPTERS = [
  {
    id: 1,
    number: "01",
    title: "Das Briefing",
    subtitle: "Finde die erste Spur in der Pixelwerk-Datenbank."
  },
  {
    id: 2,
    number: "02",
    title: "Die Spur im System",
    subtitle: "Grenze verdächtige Daten mit gezielten Filtern ein."
  },
  {
    id: 3,
    number: "03",
    title: "Die Zahlen hinter dem Angriff",
    subtitle: "Verdichte Daten mit Aliasen und Aggregatfunktionen."
  },
  {
    id: 4,
    number: "04",
    title: "Muster im Protokoll",
    subtitle: "Gruppiere Datenspuren und filtere auffällige Gruppen."
  },
  {
    id: 5,
    number: "05",
    title: "Die Wiederherstellung",
    subtitle: "Repariere die Datenbank mit sicheren Änderungen."
  }
];

window.SQL_BREAKOUT_CHALLENGES = [
  {
    id: "1-1",
    chapter: 1,
    shortTitle: "Inventur",
    concept: "SELECT *",
    title: "Was ist noch da?",
    story: "Mara aus der Projektleitung hat Alarm ausgelöst: In der Nacht wurden Datensätze verändert. Bevor wir eine Spur verfolgen, brauchen wir eine vollständige Übersicht der Benutzerkonten.",
    task: "Zeige alle Spalten und alle Datensätze der Tabelle users an.",
    objective: "8 Zeilen · alle 8 Spalten aus users",
    starterSql: "",
    hints: [
      "Mit dem Sternchen <code>*</code> wählst du alle Spalten einer Tabelle aus.",
      "Die benötigten Schlüsselwörter sind <code>SELECT</code> und <code>FROM</code>.",
      "Nutze dieses Gerüst: <code>SELECT * FROM users;</code>"
    ],
    validation: {
      expectedSql: "SELECT * FROM users",
      ordered: false
    },
    fragment: "7",
    success: "Die Benutzerliste ist vollständig. Ein Konto fällt später noch auf – aber zuerst müssen wir die Rollen zuordnen."
  },
  {
    id: "1-2",
    chapter: 1,
    shortTitle: "Namensliste",
    concept: "Spalten",
    title: "Wer hat Zugriff?",
    story: "Die vollständige Tabelle enthält mehr Angaben als nötig. Für das Einsatzteam braucht Mara eine kompakte Liste der Benutzernamen und Rollen.",
    task: "Zeige aus users nur die Spalten username und role – in genau dieser Reihenfolge.",
    objective: "username · role · 8 Zeilen",
    starterSql: "",
    hints: [
      "Schreibe die gewünschten Spaltennamen nach <code>SELECT</code> und trenne sie mit einem Komma.",
      "Du brauchst <code>username</code> und <code>role</code> aus der Tabelle <code>users</code>.",
      "Das Gerüst lautet: <code>SELECT username, role FROM users;</code>"
    ],
    validation: {
      expectedSql: "SELECT username, role FROM users",
      ordered: false
    },
    fragment: "K",
    success: "Die Zugriffsliste ist erstellt. Jetzt muss das Team die aktiven Konten der Kreation isolieren."
  },
  {
    id: "1-3",
    chapter: 1,
    shortTitle: "Kreation",
    concept: "WHERE",
    title: "Die kreative Spur",
    story: "Ein verdächtiger Export stammt aus der Abteilung Kreation. Nur aktive Konten kommen als Verursacher infrage.",
    task: "Finde username und firstname aller aktiven Personen aus der Abteilung Kreation.",
    objective: "2 Treffer · username · firstname",
    starterSql: "",
    hints: [
      "Mit <code>WHERE</code> filterst du Zeilen. Mehrere Bedingungen verbindest du mit <code>AND</code>.",
      "Prüfe <code>department = 'Kreation'</code> und <code>active = 1</code>.",
      "Gerüst: <code>SELECT username, firstname FROM users WHERE department = 'Kreation' AND active = 1;</code>"
    ],
    validation: {
      expectedSql: "SELECT username, firstname FROM users WHERE department = 'Kreation' AND active = 1",
      ordered: false
    },
    fragment: "3",
    success: "Zwei aktive Konten bleiben übrig. Im nächsten Schritt führt die Budgethöhe zur betroffenen Kampagne."
  },
  {
    id: "1-4",
    chapter: 1,
    shortTitle: "Budgetspur",
    concept: "ORDER BY",
    title: "Die teuerste Kampagne",
    story: "Die Manipulation betrifft vermutlich ein grosses Projekt. Sortiere die Kampagnen nach Budget, damit die auffälligsten Beträge zuerst erscheinen.",
    task: "Zeige title und budget aller Kampagnen, absteigend nach budget sortiert.",
    objective: "5 Kampagnen · höchstes Budget zuerst",
    starterSql: "",
    hints: [
      "Zum Sortieren verwendest du <code>ORDER BY</code>. Die Richtung legst du danach fest.",
      "Absteigend bedeutet <code>DESC</code>. Sortiere die Spalte <code>budget</code>.",
      "Gerüst: <code>SELECT title, budget FROM campaigns ORDER BY budget DESC;</code>"
    ],
    validation: {
      expectedSql: "SELECT title, budget FROM campaigns ORDER BY budget DESC",
      ordered: true
    },
    fragment: "M",
    success: "Die Reihenfolge ist eindeutig. Der nächste Hinweis steckt im allerneuesten Eintrag des Aktivitätsprotokolls."
  },
  {
    id: "1-5",
    chapter: 1,
    shortTitle: "Letzter Zugriff",
    concept: "LIMIT",
    title: "Die letzte Aktion",
    story: "Kurz vor dem Alarm wurde noch genau eine Aktion protokolliert. Finde den jüngsten Eintrag – er enthält das finale Codefragment.",
    task: "Zeige action, table_name und created_at des neuesten Eintrags aus activity_log. Gib nur eine Zeile aus.",
    objective: "1 Zeile · neuester Zeitstempel",
    starterSql: "",
    hints: [
      "Sortiere zuerst nach dem Zeitstempel. Begrenze danach die Anzahl ausgegebener Zeilen.",
      "Nutze <code>ORDER BY created_at DESC</code> und <code>LIMIT 1</code>.",
      "Gerüst: <code>SELECT action, table_name, created_at FROM activity_log ORDER BY created_at DESC LIMIT 1;</code>"
    ],
    validation: {
      expectedSql: "SELECT action, table_name, created_at FROM activity_log ORDER BY created_at DESC LIMIT 1",
      ordered: true
    },
    fragment: "9",
    success: "Der jüngste Eintrag ist gesichert. Kapitel 1 ist abgeschlossen. Der fremde Zugriff führt dich tiefer in die gefilterten Datenspuren."
  },
  {
    id: "2-1",
    chapter: 2,
    shortTitle: "Budgetfenster",
    concept: "Operatoren + AND",
    title: "Teure offene Projekte",
    story: "Der fremde Zugriff zielte auf Kampagnen mit hohem Budget. Mara braucht eine Liste aller noch relevanten Projekte ab CHF 15’000 – abgeschlossene Kampagnen scheiden aus.",
    task: "Zeige id, title, budget und status aller Kampagnen mit einem Budget von mindestens 15000, deren Status nicht abgeschlossen ist.",
    objective: "3 Treffer · Budget ≥ 15000 · nicht abgeschlossen",
    starterSql: "",
    hints: [
      "Für «mindestens» brauchst du einen Vergleichsoperator. Zwei Bedingungen verbindest du mit <code>AND</code>.",
      "Vergleiche <code>budget &gt;= 15000</code> und schliesse <code>status = 'abgeschlossen'</code> mit <code>&lt;&gt;</code> oder <code>!=</code> aus.",
      "Gerüst: <code>SELECT id, title, budget, status FROM campaigns WHERE budget &gt;= 15000 AND status &lt;&gt; 'abgeschlossen';</code>"
    ],
    validation: {
      expectedSql: "SELECT id, title, budget, status FROM campaigns WHERE budget >= 15000 AND status <> 'abgeschlossen'",
      ordered: false
    },
    fragment: "X",
    success: "Drei Projekte bleiben im Fokus. Jetzt müssen wir prüfen, welche Personen ausserhalb des Digitalteams Zugriff auf sensible Rollen hatten."
  },
  {
    id: "2-2",
    chapter: 2,
    shortTitle: "Rollenfilter",
    concept: "OR + NOT",
    title: "Ausserhalb des Digitalteams",
    story: "Der Angriff kam zwar aus einem technischen Konto, doch Projektleitung und Strategie konnten ebenfalls auf Kampagnendaten zugreifen. Konten aus dem Digitalteam sollen diesmal ausgeschlossen werden.",
    task: "Zeige username, role und department aller Personen, die nicht zur Abteilung Digital gehören und entweder Projektleitung oder Analyst sind.",
    objective: "2 Personen · ausserhalb Digital · zwei mögliche Rollen",
    starterSql: "",
    hints: [
      "Mit <code>NOT</code> schliesst du eine Bedingung aus. Alternative Rollen verbindest du mit <code>OR</code>.",
      "Klammern helfen: <code>NOT department = 'Digital' AND (role = ... OR role = ...)</code>.",
      "Gerüst: <code>SELECT username, role, department FROM users WHERE NOT department = 'Digital' AND (role = 'Projektleitung' OR role = 'Analyst');</code>"
    ],
    validation: {
      expectedSql: "SELECT username, role, department FROM users WHERE NOT department = 'Digital' AND (role = 'Projektleitung' OR role = 'Analyst')",
      ordered: false
    },
    fragment: "2",
    success: "Mara und Jan sind legitim. Die nächste Spur liegt nicht bei Personen, sondern in auffällig benannten Inhaltsdatensätzen."
  },
  {
    id: "2-3",
    chapter: 2,
    shortTitle: "Titelmuster",
    concept: "LIKE",
    title: "Die P-Markierung",
    story: "In einer internen Notiz steht nur: «Prüfe alle Content-Titel mit P». Offenbar markierte die angreifende Person mehrere Inhalte über ihren Anfangsbuchstaben.",
    task: "Zeige id, title und content_type aller Inhalte, deren Titel mit dem Buchstaben P beginnt.",
    objective: "2 Inhalte · Titel beginnt mit P",
    starterSql: "",
    hints: [
      "Mit <code>LIKE</code> suchst du nach Textmustern. Das Prozentzeichen steht für beliebig viele Zeichen.",
      "Ein Text, der mit P beginnt, entspricht dem Muster <code>'P%'</code>.",
      "Gerüst: <code>SELECT id, title, content_type FROM content WHERE title LIKE 'P%';</code>"
    ],
    validation: {
      expectedSql: "SELECT id, title, content_type FROM content WHERE title LIKE 'P%'",
      ordered: false
    },
    fragment: "R",
    success: "Zwei markierte Inhalte sind gefunden. Ihre Änderungen liegen in einem engen Zeitfenster der Angriffsnacht."
  },
  {
    id: "2-4",
    chapter: 2,
    shortTitle: "Zeitfenster",
    concept: "BETWEEN",
    title: "Drei Minuten in der Nacht",
    story: "Der kritische Zeitraum beginnt um 01:17 Uhr und endet um 01:20 Uhr. Alles davor war Routine, alles danach gehört bereits zur Fluchtspur.",
    task: "Zeige action, table_name und created_at aller Protokolleinträge zwischen 2026-07-18 01:17:00 und 2026-07-18 01:20:00 – beide Grenzen eingeschlossen.",
    objective: "2 Aktionen · inklusive Start- und Endzeit",
    starterSql: "",
    hints: [
      "<code>BETWEEN</code> prüft einen Wert innerhalb zweier Grenzen und schliesst beide Grenzen ein.",
      "Schreibe nach <code>BETWEEN</code> die Startzeit, dann <code>AND</code> und die Endzeit.",
      "Gerüst: <code>SELECT action, table_name, created_at FROM activity_log WHERE created_at BETWEEN '2026-07-18 01:17:00' AND '2026-07-18 01:20:00';</code>"
    ],
    validation: {
      expectedSql: "SELECT action, table_name, created_at FROM activity_log WHERE created_at BETWEEN '2026-07-18 01:17:00' AND '2026-07-18 01:20:00'",
      ordered: false
    },
    fragment: "8",
    success: "UPDATE und DELETE gehören zusammen. Zum Abschluss musst du die betroffenen Kundenprojekte über mehrere erlaubte Werte eingrenzen."
  },
  {
    id: "2-5",
    chapter: 2,
    shortTitle: "Kombinationscode",
    concept: "IN + Filter",
    title: "Die Kundenverbindung",
    story: "Die letzte Notiz nennt die Kunden-IDs 1 und 2 sowie die Zustände «aktiv» und «planung». Nur Kampagnen, die in beide Wertelisten passen, gehören zur Verbindung.",
    task: "Zeige title, status und client_id aller Kampagnen, deren status in aktiv oder planung und deren client_id in 1 oder 2 enthalten ist.",
    objective: "2 Kampagnen · zwei kombinierte IN-Filter",
    starterSql: "",
    hints: [
      "Mit <code>IN (...)</code> prüfst du, ob ein Wert in einer Liste vorkommt. Du brauchst zwei solcher Prüfungen.",
      "Kombiniere <code>status IN ('aktiv', 'planung')</code> mit <code>client_id IN (1, 2)</code> über <code>AND</code>.",
      "Gerüst: <code>SELECT title, status, client_id FROM campaigns WHERE status IN ('aktiv', 'planung') AND client_id IN (1, 2);</code>"
    ],
    validation: {
      expectedSql: "SELECT title, status, client_id FROM campaigns WHERE status IN ('aktiv', 'planung') AND client_id IN (1, 2)",
      ordered: false
    },
    fragment: "Q",
    success: "Die Kundenverbindung ist entschlüsselt. Kapitel 2 ist abgeschlossen – du kannst Daten jetzt mit kombinierten Filtern präzise eingrenzen."
  },
  {
    id: "3-1",
    chapter: 3,
    shortTitle: "Klare Bezeichnungen",
    concept: "AS",
    title: "Der Bericht für die Geschäftsleitung",
    story: "Die Geschäftsleitung versteht die technischen Spaltennamen nicht. Mara braucht einen Bericht mit verständlichen Überschriften, bevor sie die Zahlen freigibt.",
    task: "Zeige title und channel aller Kampagnen. Benenne die Ausgabespalten mit AS in kampagne und kanal um.",
    objective: "kampagne · kanal · 5 Zeilen",
    starterSql: "",
    hints: [
      "Mit <code>AS</code> gibst du einer Ausgabespalte einen neuen Namen.",
      "Verwende <code>title AS kampagne</code> und <code>channel AS kanal</code>.",
      "Gerüst: <code>SELECT title AS kampagne, channel AS kanal FROM campaigns;</code>"
    ],
    validation: {
      expectedSql: "SELECT title AS kampagne, channel AS kanal FROM campaigns",
      ordered: false
    },
    fragment: "A",
    success: "Der Bericht ist verständlich beschriftet. Nun muss das Team wissen, wie viele Inhalte überhaupt betroffen sein könnten."
  },
  {
    id: "3-2",
    chapter: 3,
    shortTitle: "Bestandszahl",
    concept: "COUNT",
    title: "Wie viele Inhalte existieren?",
    story: "Vor der Wiederherstellung muss die Anzahl der vorhandenen Content-Datensätze dokumentiert werden. Nur so lässt sich später prüfen, ob etwas fehlt.",
    task: "Zähle alle Datensätze in content und nenne die Ausgabespalte anzahl_inhalte.",
    objective: "1 Wert · anzahl_inhalte = 5",
    starterSql: "",
    hints: [
      "Die Aggregatfunktion <code>COUNT(*)</code> zählt alle Zeilen.",
      "Kombiniere <code>COUNT(*)</code> mit dem Alias <code>anzahl_inhalte</code>.",
      "Gerüst: <code>SELECT COUNT(*) AS anzahl_inhalte FROM content;</code>"
    ],
    validation: {
      expectedSql: "SELECT COUNT(*) AS anzahl_inhalte FROM content",
      ordered: true
    },
    fragment: "N",
    success: "Der Ausgangsbestand ist gesichert. Als Nächstes braucht Mara einen Überblick über die gesamte Budgethöhe."
  },
  {
    id: "3-3",
    chapter: 3,
    shortTitle: "Budgetbilanz",
    concept: "SUM + AVG",
    title: "Die Summe der Projekte",
    story: "Die manipulierte Kampagne verzerrt die Finanzübersicht. Berechne zuerst die Kennzahlen des aktuellen Datenbestands.",
    task: "Berechne aus campaigns die Summe aller Budgets als gesamtbudget und den Durchschnitt als durchschnittsbudget.",
    objective: "gesamtbudget · durchschnittsbudget",
    starterSql: "",
    hints: [
      "<code>SUM()</code> addiert Werte, <code>AVG()</code> berechnet den Durchschnitt.",
      "Wende beide Funktionen auf die Spalte <code>budget</code> an und vergib Aliase.",
      "Gerüst: <code>SELECT SUM(budget) AS gesamtbudget, AVG(budget) AS durchschnittsbudget FROM campaigns;</code>"
    ],
    validation: {
      expectedSql: "SELECT SUM(budget) AS gesamtbudget, AVG(budget) AS durchschnittsbudget FROM campaigns",
      ordered: true
    },
    fragment: "A",
    success: "Summe und Durchschnitt sind dokumentiert. Jetzt müssen die beiden äussersten Budgetwerte bestimmt werden."
  },
  {
    id: "3-4",
    chapter: 3,
    shortTitle: "Extremwerte",
    concept: "MIN + MAX",
    title: "Zwischen Minimum und Maximum",
    story: "Ein extrem hoher Betrag fällt besonders auf. Ermittle die Budgetspanne, um die Anomalie einzugrenzen.",
    task: "Zeige das kleinste Budget als kleinstes_budget und das grösste Budget als groesstes_budget.",
    objective: "kleinstes_budget · groesstes_budget",
    starterSql: "",
    hints: [
      "Mit <code>MIN()</code> und <code>MAX()</code> findest du die kleinsten und grössten Werte.",
      "Beide Funktionen benötigen die Spalte <code>budget</code>.",
      "Gerüst: <code>SELECT MIN(budget) AS kleinstes_budget, MAX(budget) AS groesstes_budget FROM campaigns;</code>"
    ],
    validation: {
      expectedSql: "SELECT MIN(budget) AS kleinstes_budget, MAX(budget) AS groesstes_budget FROM campaigns",
      ordered: true
    },
    fragment: "L",
    success: "Die Budgetspanne ist klar. Der höchste Betrag gehört zur manipulierten Kampagne – sichere nun die drei grössten Projekte."
  },
  {
    id: "3-5",
    chapter: 3,
    shortTitle: "Top drei",
    concept: "AS + ORDER BY",
    title: "Prioritätenliste",
    story: "Das Krisenteam kann nicht alle Projekte gleichzeitig prüfen. Die drei teuersten Kampagnen erhalten höchste Priorität.",
    task: "Zeige die drei Kampagnen mit dem höchsten Budget. Gib title als kampagne und budget als budget_chf aus und sortiere absteigend nach budget_chf.",
    objective: "3 Zeilen · höchstes Budget zuerst",
    starterSql: "",
    hints: [
      "Ein Alias kann auch in <code>ORDER BY</code> verwendet werden.",
      "Sortiere <code>budget_chf DESC</code> und begrenze mit <code>LIMIT 3</code>.",
      "Gerüst: <code>SELECT title AS kampagne, budget AS budget_chf FROM campaigns ORDER BY budget_chf DESC LIMIT 3;</code>"
    ],
    validation: {
      expectedSql: "SELECT title AS kampagne, budget AS budget_chf FROM campaigns ORDER BY budget_chf DESC LIMIT 3",
      ordered: true
    },
    fragment: "Y",
    success: "Die Prioritätenliste steht. Kapitel 3 ist abgeschlossen – im Aktivitätsprotokoll warten nun gruppierte Angriffsmuster."
  },
  {
    id: "4-1",
    chapter: 4,
    shortTitle: "Statusgruppen",
    concept: "GROUP BY",
    title: "Inhalte nach Status",
    story: "Die Angreifenden haben Inhalte in verschiedenen Bearbeitungszuständen berührt. Eine gruppierte Übersicht zeigt, wo die grösste Menge liegt.",
    task: "Gruppiere content nach status. Zeige status und COUNT(*) als anzahl, alphabetisch nach status sortiert.",
    objective: "4 Statusgruppen · status · anzahl",
    starterSql: "",
    hints: [
      "<code>GROUP BY</code> fasst Zeilen mit demselben Wert zusammen.",
      "Zähle innerhalb jeder Gruppe mit <code>COUNT(*)</code>.",
      "Gerüst: <code>SELECT status, COUNT(*) AS anzahl FROM content GROUP BY status ORDER BY status;</code>"
    ],
    validation: {
      expectedSql: "SELECT status, COUNT(*) AS anzahl FROM content GROUP BY status ORDER BY status",
      ordered: true
    },
    fragment: "S",
    success: "Die Statusverteilung ist sichtbar. Nun werden die Kampagnenbudgets nach ihrem Projektstatus zusammengefasst."
  },
  {
    id: "4-2",
    chapter: 4,
    shortTitle: "Budgetgruppen",
    concept: "GROUP BY + SUM",
    title: "Budget nach Projektstatus",
    story: "Mara vermutet, dass gesperrte Projekte überproportional viel Budget binden. Gruppiere die Beträge, um diese Spur zu prüfen.",
    task: "Zeige für jeden status aus campaigns die Summe der Budgets als gesamtbudget. Sortiere absteigend nach gesamtbudget.",
    objective: "4 Gruppen · grösstes Gesamtbudget zuerst",
    starterSql: "",
    hints: [
      "Gruppiere nach <code>status</code> und summiere innerhalb jeder Gruppe.",
      "Der Alias <code>gesamtbudget</code> kann zum Sortieren verwendet werden.",
      "Gerüst: <code>SELECT status, SUM(budget) AS gesamtbudget FROM campaigns GROUP BY status ORDER BY gesamtbudget DESC;</code>"
    ],
    validation: {
      expectedSql: "SELECT status, SUM(budget) AS gesamtbudget FROM campaigns GROUP BY status ORDER BY gesamtbudget DESC",
      ordered: true
    },
    fragment: "E",
    success: "Die gesperrte Kampagne dominiert ihre Gruppe. Als Nächstes werden nur Abteilungen mit mehreren Konten betrachtet."
  },
  {
    id: "4-3",
    chapter: 4,
    shortTitle: "Wiederholungen",
    concept: "HAVING",
    title: "Mehrfach ausgeführte Aktionen",
    story: "Die Gruppierungen stehen. Nun führt Mara einen neuen Filter ein: Einzelne Aktionen können Zufall sein, wiederholte Aktionstypen bilden dagegen ein Muster.",
    task: "Gruppiere activity_log nach action. Zeige action und COUNT(*) als anzahl nur für Aktionen, die mindestens zweimal vorkommen.",
    objective: "2 Aktionsgruppen · erstes HAVING",
    starterSql: "",
    hints: [
      "<code>WHERE</code> filtert einzelne Zeilen, <code>HAVING</code> filtert Gruppen.",
      "Gruppiere nach <code>action</code> und setze danach <code>HAVING COUNT(*) &gt;= 2</code> ein.",
      "Gerüst: <code>SELECT action, COUNT(*) AS anzahl FROM activity_log GROUP BY action HAVING COUNT(*) &gt;= 2;</code>"
    ],
    validation: {
      expectedSql: "SELECT action, COUNT(*) AS anzahl FROM activity_log GROUP BY action HAVING COUNT(*) >= 2",
      ordered: false
    },
    fragment: "S",
    success: "SELECT und UPDATE wurden mehrfach protokolliert. Als Nächstes kombinierst du einen Zeilenfilter mit einem Gruppenfilter."
  },
  {
    id: "4-4",
    chapter: 4,
    shortTitle: "Aktive Teams",
    concept: "WHERE + HAVING",
    title: "Zwei Filterebenen",
    story: "Inaktive Konten gehören nicht zur aktuellen Angriffslage. Sie müssen vor dem Gruppieren entfernt werden; erst danach interessieren Abteilungen mit mehreren aktiven Konten.",
    task: "Berücksichtige aus users nur aktive Konten. Gruppiere sie nach department und zeige department sowie COUNT(*) als aktive_konten für Abteilungen mit mindestens zwei aktiven Konten. Sortiere alphabetisch nach department.",
    objective: "2 Abteilungen · WHERE vor HAVING",
    starterSql: "",
    hints: [
      "<code>WHERE active = 1</code> entfernt einzelne Konten vor der Gruppierung. <code>HAVING</code> prüft danach die Anzahl je Gruppe.",
      "Die Reihenfolge lautet <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>ORDER BY</code>.",
      "Gerüst: <code>SELECT department, COUNT(*) AS aktive_konten FROM users WHERE active = 1 GROUP BY department HAVING COUNT(*) &gt;= 2 ORDER BY department;</code>"
    ],
    validation: {
      expectedSql: "SELECT department, COUNT(*) AS aktive_konten FROM users WHERE active = 1 GROUP BY department HAVING COUNT(*) >= 2 ORDER BY department",
      ordered: true
    },
    fragment: "E",
    success: "WHERE und HAVING greifen auf den richtigen Ebenen. Zum Kapitelabschluss vergleichst du nun zwei Kennzahlen pro Gruppe."
  },
  {
    id: "4-5",
    chapter: 4,
    shortTitle: "Risikoverteilung",
    concept: "Mehrere Aggregate",
    title: "Konten und aktive Zugänge",
    story: "Für den Abschlussbericht reicht eine einzige Kennzahl nicht. Mara möchte je grössere Abteilung sowohl die Gesamtzahl der Konten als auch die Zahl der aktiven Zugänge vergleichen.",
    task: "Gruppiere users nach department. Zeige department, COUNT(*) als anzahl_konten und SUM(active) als aktive_konten für Abteilungen mit mindestens zwei Konten. Sortiere zuerst nach aktive_konten absteigend, danach nach anzahl_konten absteigend und zuletzt department aufsteigend.",
    objective: "2 Abteilungen · 2 Aggregate · 3 Sortierstufen",
    starterSql: "",
    hints: [
      "Du kannst in derselben Gruppierung mehrere Aggregatfunktionen berechnen: <code>COUNT(*)</code> zählt alle Konten, <code>SUM(active)</code> nur die als 1 gespeicherten aktiven Konten.",
      "Filtere mit <code>HAVING COUNT(*) &gt;= 2</code>. Verwende danach die beiden Aliase im <code>ORDER BY</code>.",
      "Gerüst: <code>SELECT department, COUNT(*) AS anzahl_konten, SUM(active) AS aktive_konten FROM users GROUP BY department HAVING COUNT(*) &gt;= 2 ORDER BY aktive_konten DESC, anzahl_konten DESC, department ASC;</code>"
    ],
    validation: {
      expectedSql: "SELECT department, COUNT(*) AS anzahl_konten, SUM(active) AS aktive_konten FROM users GROUP BY department HAVING COUNT(*) >= 2 ORDER BY aktive_konten DESC, anzahl_konten DESC, department ASC",
      ordered: true
    },
    fragment: "C",
    success: "Die Risikoverteilung ist vollständig ausgewertet. Kapitel 4 ist abgeschlossen – jetzt darfst du die isolierte Trainingskopie der Datenbank sicher reparieren."
  },
  {
    id: "5-1",
    chapter: 5,
    shortTitle: "Inhalt wiederherstellen",
    concept: "INSERT",
    title: "Der fehlende Countdown",
    story: "Ein geplanter Story-Inhalt wurde aus der Kampagne «Snack der Zukunft» entfernt. Stelle den freigegebenen Datensatz in der Trainingskopie wieder her.",
    task: "Füge in content den Datensatz mit id 106, campaign_id 12, title 'Launch Countdown', content_type 'Story', status 'entwurf', publish_date NULL und created_by 3 ein.",
    objective: "1 neuer Content-Datensatz · id 106",
    starterSql: "",
    hints: [
      "Mit <code>INSERT INTO tabelle (spalten...)</code> legst du einen Datensatz an.",
      "Textwerte stehen in einfachen Anführungszeichen; ein fehlendes Datum wird als <code>NULL</code> eingetragen.",
      "Gerüst: <code>INSERT INTO content (id, campaign_id, title, content_type, status, publish_date, created_by) VALUES (106, 12, 'Launch Countdown', 'Story', 'entwurf', NULL, 3);</code>"
    ],
    validation: {
      type: "mutation",
      command: "INSERT",
      expectedSql: "INSERT INTO content (id, campaign_id, title, content_type, status, publish_date, created_by) VALUES (106, 12, 'Launch Countdown', 'Story', 'entwurf', NULL, 3)",
      verificationSql: "SELECT id, campaign_id, title, content_type, status, publish_date, created_by FROM content WHERE id = 106",
      minAffectedRows: 1,
      maxAffectedRows: 1,
      ordered: true
    },
    fragment: "U",
    success: "Der fehlende Inhalt ist wiederhergestellt. Nun muss das manipulierte Kampagnenbudget korrigiert werden."
  },
  {
    id: "5-2",
    chapter: 5,
    shortTitle: "Budget reparieren",
    concept: "UPDATE + WHERE",
    title: "Nur Kampagne 14",
    story: "Das Budget von «Move Electric» wurde auf CHF 50’000 manipuliert. Der freigegebene Auftrag nennt CHF 15’000.",
    task: "Setze das budget der Kampagne mit id 14 auf 15000. Verändere ausschliesslich diesen Datensatz.",
    objective: "1 geänderte Zeile · id 14 · budget 15000",
    starterSql: "",
    hints: [
      "Mit <code>UPDATE ... SET ...</code> änderst du bestehende Werte.",
      "Eine genaue <code>WHERE id = 14</code>-Bedingung schützt alle anderen Kampagnen.",
      "Gerüst: <code>UPDATE campaigns SET budget = 15000 WHERE id = 14;</code>"
    ],
    validation: {
      type: "mutation",
      command: "UPDATE",
      expectedSql: "UPDATE campaigns SET budget = 15000 WHERE id = 14",
      verificationSql: "SELECT id, budget FROM campaigns ORDER BY id",
      requireWhere: true,
      minAffectedRows: 1,
      maxAffectedRows: 1,
      ordered: true
    },
    fragment: "R",
    success: "Das Budget ist korrigiert, ohne andere Kampagnen zu verändern. Als Nächstes wird ein freigegebener Inhalt publiziert."
  },
  {
    id: "5-3",
    chapter: 5,
    shortTitle: "Statuswechsel",
    concept: "UPDATE + 2 Filter",
    title: "Freigegeben wird publiziert",
    story: "Die «Packliste Sommer» ist freigegeben, wurde aber während des Angriffs nicht auf publiziert gesetzt. Eine zweite Bedingung verhindert Änderungen am falschen Ausgangszustand.",
    task: "Setze den status des Content-Datensatzes mit id 102 von 'freigegeben' auf 'publiziert'. Filtere nach id und bisherigem status.",
    objective: "1 geänderte Zeile · id 102 · publiziert",
    starterSql: "",
    hints: [
      "Mehrere Sicherheitsbedingungen verbindest du in <code>WHERE</code> mit <code>AND</code>.",
      "Prüfe neben <code>id = 102</code> auch <code>status = 'freigegeben'</code>.",
      "Gerüst: <code>UPDATE content SET status = 'publiziert' WHERE id = 102 AND status = 'freigegeben';</code>"
    ],
    validation: {
      type: "mutation",
      command: "UPDATE",
      expectedSql: "UPDATE content SET status = 'publiziert' WHERE id = 102 AND status = 'freigegeben'",
      verificationSql: "SELECT id, status FROM content ORDER BY id",
      requireWhere: true,
      minAffectedRows: 1,
      maxAffectedRows: 1,
      ordered: true
    },
    fragment: "E",
    success: "Der Statuswechsel war präzise. Nun muss ein inaktives, nicht mehr benötigtes Testkonto sicher entfernt werden."
  },
  {
    id: "5-4",
    chapter: 5,
    shortTitle: "Testkonto entfernen",
    concept: "DELETE + WHERE",
    title: "Kein Löschen ohne Sicherung",
    story: "Das inaktive Lernenden-Testkonto mit der ID 7 wird nicht mehr benötigt. Andere Konten dürfen unter keinen Umständen gelöscht werden.",
    task: "Lösche aus users ausschliesslich das Konto mit id 7, wenn es weiterhin inaktiv ist.",
    objective: "1 gelöschte Zeile · id 7 · active 0",
    starterSql: "",
    hints: [
      "<code>DELETE FROM</code> entfernt Zeilen. Ohne <code>WHERE</code> wären alle Zeilen betroffen.",
      "Kombiniere <code>id = 7</code> mit der Sicherheitsprüfung <code>active = 0</code>.",
      "Gerüst: <code>DELETE FROM users WHERE id = 7 AND active = 0;</code>"
    ],
    validation: {
      type: "mutation",
      command: "DELETE",
      expectedSql: "DELETE FROM users WHERE id = 7 AND active = 0",
      verificationSql: "SELECT id, username, active FROM users ORDER BY id",
      requireWhere: true,
      minAffectedRows: 1,
      maxAffectedRows: 1,
      ordered: true
    },
    fragment: "S",
    success: "Nur das inaktive Testkonto wurde entfernt. Die Wiederherstellung muss jetzt noch im Aktivitätsprotokoll dokumentiert werden."
  },
  {
    id: "5-5",
    chapter: 5,
    shortTitle: "Recovery-Protokoll",
    concept: "INSERT vollständig",
    title: "Die Reparatur dokumentieren",
    story: "Jede Datenreparatur benötigt einen nachvollziehbaren Protokolleintrag. Mara dokumentiert die Wiederherstellung der Kampagne 14 über ihr eigenes Konto.",
    task: "Füge in activity_log den Eintrag id 1007, user_id 1, action 'RECOVERY', table_name 'campaigns', record_id 14, created_at '2026-07-18 02:00:00' und ip_address '10.10.4.21' ein.",
    objective: "1 neuer Protokolleintrag · id 1007",
    starterSql: "",
    hints: [
      "Gib bei <code>INSERT</code> alle Zielspalten in derselben Reihenfolge wie die Werte an.",
      "Kontrolliere besonders Zeitstempel, Tabellenname und IP-Adresse.",
      "Gerüst: <code>INSERT INTO activity_log (id, user_id, action, table_name, record_id, created_at, ip_address) VALUES (1007, 1, 'RECOVERY', 'campaigns', 14, '2026-07-18 02:00:00', '10.10.4.21');</code>"
    ],
    validation: {
      type: "mutation",
      command: "INSERT",
      expectedSql: "INSERT INTO activity_log (id, user_id, action, table_name, record_id, created_at, ip_address) VALUES (1007, 1, 'RECOVERY', 'campaigns', 14, '2026-07-18 02:00:00', '10.10.4.21')",
      verificationSql: "SELECT id, user_id, action, table_name, record_id, created_at, ip_address FROM activity_log WHERE id = 1007",
      minAffectedRows: 1,
      maxAffectedRows: 1,
      ordered: true
    },
    fragment: "Q",
    success: "Die Wiederherstellung ist revisionssicher dokumentiert. Eine letzte kombinierte Analyse identifiziert das Konto hinter dem Angriff."
  },
  {
    id: "5-6",
    chapter: 5,
    shortTitle: "Abschlussmission",
    concept: "Finale Analyse",
    title: "Wer war es?",
    story: "Alle Reparaturen sind vorbereitet. Für den Abschlussbericht fehlt nur noch der eindeutige Nachweis: Welches Konto führte in der Angriffsstunde mindestens drei Aktionen aus?",
    task: "Zeige user_id als verdaechtige_person und COUNT(*) als anzahl_aktionen für Protokolle zwischen 2026-07-18 01:00:00 und 2026-07-18 02:00:00. Gruppiere nach user_id, behalte Gruppen mit mindestens drei Aktionen, sortiere nach anzahl_aktionen absteigend und gib nur den ersten Treffer aus.",
    objective: "1 Treffer · verdaechtige_person · anzahl_aktionen",
    starterSql: "",
    hints: [
      "Die Abschlussabfrage kombiniert <code>BETWEEN</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>ORDER BY</code> und <code>LIMIT</code>.",
      "Filtere zuerst die Angriffsstunde und gruppiere danach nach <code>user_id</code>.",
      "Gerüst: <code>SELECT user_id AS verdaechtige_person, COUNT(*) AS anzahl_aktionen FROM activity_log WHERE created_at BETWEEN '2026-07-18 01:00:00' AND '2026-07-18 02:00:00' GROUP BY user_id HAVING COUNT(*) &gt;= 3 ORDER BY anzahl_aktionen DESC LIMIT 1;</code>"
    ],
    validation: {
      expectedSql: "SELECT user_id AS verdaechtige_person, COUNT(*) AS anzahl_aktionen FROM activity_log WHERE created_at BETWEEN '2026-07-18 01:00:00' AND '2026-07-18 02:00:00' GROUP BY user_id HAVING COUNT(*) >= 3 ORDER BY anzahl_aktionen DESC LIMIT 1",
      ordered: true
    },
    fragment: "L",
    success: "Konto 8 ist eindeutig identifiziert. Du hast die Datenbank untersucht, die Reparaturen sicher vorbereitet und den Pixelwerk-Launch gerettet."
  }
];
