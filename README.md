# SQL Breakout – Der verschwundene Datensatz

Statische Lern-Web-App für SQL mit einer fortlaufenden Geschichte in der fiktiven Mediamatikagentur Pixelwerk. 26 Missionen in fünf Kapiteln führen von einfachen Abfragen bis zu sicheren Datenänderungen.

## Enthalten

- SQLite direkt im Browser mit lokal eingebundenem `sql.js`
- kleine Pixelwerk-Datenbank mit fünf Tabellen und realistischen Beispieldaten
- fünf aufeinander aufbauende Kapitel mit insgesamt 26 Missionen
- Einführungsmodal mit Vorgeschichte beim Start eines neuen Spielstands
- SQL-Editor mit Tastenkürzel `Cmd/Ctrl + Enter`
- leerer SQL-Editor zu Beginn jeder Mission; Hilfen erscheinen nur auf Wunsch
- getrennte Aktionen zum Anzeigen des Abfrageergebnisses und zum Prüfen der Lösung
- ergebnis- und zustandsbasierte Prüfung: alternative korrekte Abfragen werden akzeptiert
- drei Hinweisstufen pro Aufgabe
- Datenbank- und Fortschritts-Reset
- lokaler Spielstand via `localStorage`
- Export und Import des Spielstands als JSON-Datei
- personalisiertes Abschlusszertifikat mit Hinweisstatistik und PDF-Druck
- isolierte Vorschau für `INSERT`, `UPDATE` und `DELETE`
- blockierte `UPDATE`- und `DELETE`-Anweisungen ohne `WHERE`
- responsive, tastaturbedienbare Oberfläche
- keine Benutzerkonten, kein Backend und keine externen Laufzeit-Abhängigkeiten

## Lernpfad

### Kapitel 1 – Das Briefing

`SELECT *`, einzelne Spalten, `WHERE`, `ORDER BY` und `LIMIT`.

### Kapitel 2 – Die Spur im System

Vergleichsoperatoren mit `AND`, `OR` und `NOT`, Textmuster mit `LIKE`, Wertebereiche mit `BETWEEN` sowie `IN` und kombinierte Filter.

### Kapitel 3 – Die Zahlen hinter dem Angriff

Aliase mit `AS`, `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` sowie sortierte Ranglisten.

### Kapitel 4 – Muster im Protokoll

Gruppierungen mit `GROUP BY`, Gruppenfilter mit `HAVING` und Kombinationen mit Aggregatfunktionen.

### Kapitel 5 – Die Wiederherstellung

Sichere Datenänderungen mit `INSERT`, `UPDATE`, `DELETE` und präzisen `WHERE`-Filtern. Die Abschlussmission kombiniert Filter, Gruppierung, Aggregation, Sortierung und Begrenzung.

Die Aufgaben werden über das tatsächliche Abfrageergebnis oder den resultierenden Datenzustand geprüft. Dadurch sind unterschiedliche SQL-Formulierungen möglich. Schreibende Anweisungen laufen ausschliesslich in einer isolierten Trainingskopie; die Ausgangsdaten bleiben unverändert.

## Abschlusszertifikat

Nach der letzten Mission kann die lernende Person ihren Namen eingeben und ein Zertifikat erzeugen. Es weist die 26 gelösten Missionen, die insgesamt verwendeten Hinweise, die ohne Hinweis gelösten Missionen und die Hinweisanzahl pro Kapitel aus. Über **Drucken / als PDF speichern** kann das Zertifikat mit der Druckfunktion des Browsers als PDF gesichert werden.

Die Hinweisanzahl wird beim erfolgreichen Abschluss jeder Mission eingefroren. Später geöffnete Hinweise verändern das Zertifikat nicht. Bereits vorhandene Spielstände werden beim nächsten Laden automatisch in dieses Format übernommen.

## Lokal starten

WebAssembly wird aus Sicherheitsgründen nicht zuverlässig über eine direkt geöffnete `file://`-Adresse geladen. Starte deshalb einen kleinen lokalen Webserver im Projektordner.

Mit Python:

```bash
python3 -m http.server 8080
```

Danach im Browser öffnen:

```text
http://localhost:8080
```

Alternativ funktionieren auch die Vorschau-Funktionen gängiger Editoren oder `npx serve`.

## Statisch veröffentlichen

### GitHub Pages

1. Den Inhalt dieses Ordners in ein GitHub-Repository übertragen.
2. Im Repository **Settings → Pages** öffnen.
3. Unter **Build and deployment** die Quelle **Deploy from a branch** wählen.
4. Branch `main`, Ordner `/ (root)` auswählen und speichern.

### Netlify

Den kompletten Ordner in Netlify Drop ziehen oder ein Git-Repository verbinden. Es sind weder Build-Befehl noch Publish-Unterordner nötig; der Publish-Ordner ist die Projektwurzel.

### Vercel

Das Repository als neues Projekt importieren, Framework Preset **Other** wählen und ohne Build-Befehl deployen. Als Output Directory dient `.`.

## Projektstruktur

```text
sql-breakout/
├── index.html
├── css/style.css
├── js/
│   ├── app.js
│   ├── challenges.js
│   ├── database.js
│   ├── game-rules.js
│   └── storage.js
├── vendor/
│   ├── sql-wasm.js
│   ├── sql-wasm.wasm
│   └── LICENSE-sql.js.txt
├── .nojekyll
└── README.md
```

## Datenschutz und Speicherung

SQL-Ausführung und Fortschrittsspeicherung erfolgen ausschliesslich lokal im Browser. Es werden keine Lern- oder Personendaten an einen Server übermittelt. Der Fortschritt gehört zum jeweiligen Browserprofil, kann als JSON-Datei exportiert und auf einem anderen Gerät wieder importiert werden.

Der für ein Zertifikat eingegebene Name wird ebenfalls nur lokal gespeichert und in einen exportierten Spielstand aufgenommen.

Beim Wechsel zwischen den Kapiteln bleiben gelöste Missionen, verwendete Hinweise und eigene Abfragen erhalten. Über **Fortschritt zurücksetzen** werden alle lokal gespeicherten Spieldaten gelöscht.

## Lizenzhinweis

`sql.js` steht unter der MIT-Lizenz. Der Lizenztext liegt im Ordner `vendor/`. Die übrigen Dateien dieses Prototyps können für das Lernprojekt angepasst und erweitert werden.
