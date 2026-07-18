(function () {
  "use strict";

  const SCHEMA = {
    users: ["id", "firstname", "lastname", "username", "role", "department", "active", "created_at"],
    clients: ["id", "company", "industry", "city", "contact_person"],
    campaigns: ["id", "client_id", "title", "channel", "budget", "status", "start_date", "end_date", "project_manager_id"],
    content: ["id", "campaign_id", "title", "content_type", "status", "publish_date", "created_by"],
    activity_log: ["id", "user_id", "action", "table_name", "record_id", "created_at", "ip_address"]
  };

  const SEED_SQL = `
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL,
      department TEXT NOT NULL,
      active INTEGER NOT NULL CHECK (active IN (0, 1)),
      created_at TEXT NOT NULL
    );
    INSERT INTO users VALUES
      (1, 'Mara', 'Keller', 'mkeller', 'Projektleitung', 'Beratung', 1, '2026-01-12'),
      (2, 'Noah', 'Frei', 'nfrei', 'Designer', 'Kreation', 1, '2026-02-03'),
      (3, 'Lina', 'Meier', 'lmeier', 'Content Producer', 'Kreation', 1, '2026-06-08'),
      (4, 'Elias', 'Roth', 'eroth', 'Entwickler', 'Digital', 1, '2025-11-19'),
      (5, 'Sofia', 'Huber', 'shuber', 'Polygrafin', 'Produktion', 0, '2025-09-22'),
      (6, 'Jan', 'Walker', 'jwalker', 'Analyst', 'Strategie', 1, '2026-03-14'),
      (7, 'Aylin', 'Schmid', 'aschmid', 'Lernende', 'Kreation', 0, '2026-04-02'),
      (8, 'Timo', 'Baumann', 'tbaumann', 'Administrator', 'Digital', 1, '2024-08-17');

    CREATE TABLE clients (
      id INTEGER PRIMARY KEY,
      company TEXT NOT NULL,
      industry TEXT NOT NULL,
      city TEXT NOT NULL,
      contact_person TEXT NOT NULL
    );
    INSERT INTO clients VALUES
      (1, 'Alpina Sport AG', 'Sport', 'Bern', 'Reto Aebi'),
      (2, 'NOVA Foods', 'Lebensmittel', 'Zürich', 'Nina Bühler'),
      (3, 'Kulturraum Basel', 'Kultur', 'Basel', 'Samira Ott'),
      (4, 'Greenway Mobility', 'Mobilität', 'Winterthur', 'Leo Graf');

    CREATE TABLE campaigns (
      id INTEGER PRIMARY KEY,
      client_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      channel TEXT NOT NULL,
      budget INTEGER NOT NULL,
      status TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      project_manager_id INTEGER NOT NULL,
      FOREIGN KEY (client_id) REFERENCES clients(id),
      FOREIGN KEY (project_manager_id) REFERENCES users(id)
    );
    INSERT INTO campaigns VALUES
      (11, 1, 'Gipfelsturm 2026', 'Social Media', 42000, 'aktiv', '2026-03-01', '2026-08-31', 1),
      (12, 2, 'Snack der Zukunft', 'Crossmedia', 18000, 'planung', '2026-08-01', '2026-11-15', 1),
      (13, 3, 'Nacht der Museen', 'Digital', 12500, 'aktiv', '2026-05-10', '2026-09-20', 6),
      (14, 4, 'Move Electric', 'Video', 50000, 'gesperrt', '2026-02-15', '2026-07-30', 6),
      (15, 1, 'Trail Kids', 'Print', 9500, 'abgeschlossen', '2025-09-01', '2026-01-31', 1);

    CREATE TABLE content (
      id INTEGER PRIMARY KEY,
      campaign_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content_type TEXT NOT NULL,
      status TEXT NOT NULL,
      publish_date TEXT,
      created_by INTEGER NOT NULL,
      FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
      FOREIGN KEY (created_by) REFERENCES users(id)
    );
    INSERT INTO content VALUES
      (101, 11, 'Drei Wege zum Gipfel', 'Reel', 'publiziert', '2026-05-14', 2),
      (102, 11, 'Packliste Sommer', 'Carousel', 'freigegeben', '2026-07-22', 3),
      (103, 12, 'Teaser Produktlinie', 'Video', 'entwurf', NULL, 3),
      (104, 13, 'Programmübersicht', 'Landingpage', 'publiziert', '2026-06-01', 4),
      (105, 14, 'City Ride', 'Short Video', 'gesperrt', NULL, 2);

    CREATE TABLE activity_log (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL,
      action TEXT NOT NULL,
      table_name TEXT NOT NULL,
      record_id INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      ip_address TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    INSERT INTO activity_log VALUES
      (1001, 1, 'SELECT', 'campaigns', 11, '2026-07-17 08:15:22', '10.10.4.21'),
      (1002, 3, 'UPDATE', 'content', 102, '2026-07-17 11:42:03', '10.10.4.37'),
      (1003, 6, 'SELECT', 'campaigns', 14, '2026-07-17 14:09:41', '10.10.4.52'),
      (1004, 8, 'UPDATE', 'campaigns', 14, '2026-07-18 01:17:09', '172.16.9.88'),
      (1005, 8, 'DELETE', 'content', 105, '2026-07-18 01:19:44', '172.16.9.88'),
      (1006, 8, 'LOGIN', 'users', 8, '2026-07-18 01:21:13', '172.16.9.88');
  `;

  let SQL;
  let database;

  async function initialize() {
    SQL = await window.initSqlJs({ locateFile: file => `vendor/${file}` });
    reset();
  }

  function createSeededDatabase() {
    const seeded = new SQL.Database();
    seeded.run("PRAGMA foreign_keys = ON;");
    seeded.run(SEED_SQL);
    return seeded;
  }

  function reset() {
    if (database) database.close();
    database = createSeededDatabase();
  }

  function inspectStatement(sql) {
    const maskedStrings = sql.replace(/'(?:''|[^'])*'/g, match => " ".repeat(match.length));
    const withoutComments = maskedStrings
      .replace(/\/\*[\s\S]*?\*\//g, " ")
      .replace(/--.*$/gm, " ")
      .trim();
    const withoutTrailingSemicolon = withoutComments.replace(/;\s*$/, "").trim();
    if (withoutTrailingSemicolon.includes(";")) {
      throw new Error("Führe pro Versuch genau eine SQL-Anweisung aus.");
    }
    const match = withoutTrailingSemicolon.match(/^([A-Z]+)\b/i);
    if (!match) throw new Error("Die SQL-Anweisung konnte nicht erkannt werden.");
    return {
      command: match[1].toUpperCase(),
      hasWhere: /\bWHERE\b/i.test(withoutTrailingSemicolon),
      inspectedSql: withoutTrailingSemicolon
    };
  }

  function execute(sql, options = {}) {
    if (!sql.trim()) throw new Error("Bitte gib zuerst eine SQL-Abfrage ein.");
    const statement = inspectStatement(sql);
    const readOnly = statement.command === "SELECT" || statement.command === "WITH";
    const mutation = ["INSERT", "UPDATE", "DELETE"].includes(statement.command);
    const forbidden = /\b(DROP|ALTER|CREATE|REPLACE|ATTACH|DETACH|VACUUM|PRAGMA|REINDEX|ANALYZE|TRANSACTION|COMMIT|ROLLBACK)\b/i;

    if (forbidden.test(statement.inspectedSql)) {
      throw new Error("Diese SQL-Anweisung ist im Trainingslabor nicht erlaubt.");
    }
    if (readOnly && /\b(INSERT|UPDATE|DELETE)\b/i.test(statement.inspectedSql)) {
      throw new Error("Schreibende Unterabfragen sind im Trainingslabor nicht erlaubt.");
    }
    if (!readOnly && !mutation) {
      throw new Error("Erlaubt sind SELECT, INSERT, UPDATE und DELETE.");
    }
    if (mutation && !options.allowMutations) {
      throw new Error("Diese Mission ist schreibgeschützt. Verwende eine SELECT-Abfrage.");
    }
    if (["UPDATE", "DELETE"].includes(statement.command) && !statement.hasWhere) {
      throw new Error(`${statement.command} ohne WHERE wurde blockiert. Grenze die betroffenen Zeilen mit einem sicheren Filter ein.`);
    }

    const sandbox = new SQL.Database(database.export());
    try {
      sandbox.run("PRAGMA foreign_keys = ON;");
      const resultSets = sandbox.exec(sql);
      const rowsModified = mutation ? sandbox.getRowsModified() : 0;
      const result = mutation
        ? {
            columns: ["Aktion", "Betroffene Zeilen", "Ausführung"],
            values: [[statement.command, rowsModified, "Isolierte Trainingskopie"]]
          }
        : resultSets[resultSets.length - 1] || { columns: [], values: [] };
      const verificationSets = options.verificationSql ? sandbox.exec(options.verificationSql) : [];
      return {
        ...result,
        command: statement.command,
        hasWhere: statement.hasWhere,
        isMutation: mutation,
        rowsModified,
        verification: verificationSets[verificationSets.length - 1] || { columns: [], values: [] }
      };
    } finally {
      sandbox.close();
    }
  }

  function expectedResult(sql) {
    const result = database.exec(sql);
    return result[0] || { columns: [], values: [] };
  }

  function expectedMutationResult(sql, verificationSql) {
    const expectedDatabase = createSeededDatabase();
    try {
      expectedDatabase.exec(sql);
      const result = expectedDatabase.exec(verificationSql);
      return result[result.length - 1] || { columns: [], values: [] };
    } finally {
      expectedDatabase.close();
    }
  }

  window.PixelwerkDatabase = {
    initialize,
    reset,
    execute,
    expectedResult,
    expectedMutationResult,
    schema: SCHEMA
  };
})();
