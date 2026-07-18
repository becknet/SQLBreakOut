# SQL Breakout – Der verschwundene Datensatz

Statische Lern-Web-App für SQL mit einer fortlaufenden Geschichte in der fiktiven Mediamatikagentur Pixelwerk. Zehn Missionen in zwei Kapiteln führen von einfachen Abfragen zu kombinierten Filtern.

## Enthalten

- SQLite direkt im Browser mit lokal eingebundenem `sql.js`
- kleine Pixelwerk-Datenbank mit fünf Tabellen und realistischen Beispieldaten
- zwei aufeinander aufbauende Kapitel mit je fünf Missionen
- SQL-Editor mit Tastenkürzel `Cmd/Ctrl + Enter`
- leerer SQL-Editor zu Beginn jeder Mission; Hilfen erscheinen nur auf Wunsch
- ergebnisbasierte Prüfung: alternative korrekte Abfragen werden akzeptiert
- drei Hinweisstufen pro Aufgabe
- Datenbank- und Fortschritts-Reset
- lokaler Spielstand via `localStorage`
- responsive, tastaturbedienbare Oberfläche
- keine Benutzerkonten, kein Backend und keine externen Laufzeit-Abhängigkeiten

## Lernpfad

### Kapitel 1 – Das Briefing

`SELECT *`, einzelne Spalten, `WHERE`, `ORDER BY` und `LIMIT`.

### Kapitel 2 – Die Spur im System

Vergleichsoperatoren mit `AND`, `OR` und `NOT`, Textmuster mit `LIKE`, Wertebereiche mit `BETWEEN` sowie `IN` und kombinierte Filter. Kapitel 2 wird erst nach Abschluss aller fünf Missionen aus Kapitel 1 freigeschaltet.

Die Aufgaben werden über das tatsächliche Abfrageergebnis geprüft. Dadurch sind unterschiedliche SQL-Formulierungen möglich, sofern Spalten, Werte und – wo verlangt – Sortierung dem Auftrag entsprechen.

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

SQL-Ausführung und Fortschrittsspeicherung erfolgen ausschliesslich lokal im Browser. Es werden keine Lern- oder Personendaten an einen Server übermittelt. Der Fortschritt gehört zum jeweiligen Browserprofil und kann über **Fortschritt zurücksetzen** gelöscht werden.

Beim Wechsel zwischen den Kapiteln bleiben gelöste Missionen, verwendete Hinweise und eigene Abfragen erhalten. Bereits vorhandene Spielstände aus Kapitel 1 werden übernommen.

## Lizenzhinweis

`sql.js` steht unter der MIT-Lizenz. Der Lizenztext liegt im Ordner `vendor/`. Die übrigen Dateien dieses Prototyps können für das Lernprojekt angepasst und erweitert werden.
