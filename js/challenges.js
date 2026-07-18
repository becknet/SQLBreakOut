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
  }
];
