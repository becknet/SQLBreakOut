(function () {
  "use strict";

  const KEY = "sql-breakout-progress-v1";
  const CONTENT_VERSION = 2;
  const EXPORT_FORMAT = "sql-breakout-save";
  const EXPORT_VERSION = 1;
  const DEFAULT_STATE = {
    contentVersion: CONTENT_VERSION,
    introSeen: false,
    currentChallenge: "1-1",
    solvedChallenges: [],
    hintsUsed: {},
    hintsAtCompletion: {},
    codeFragments: [],
    savedQueries: {},
    certificateName: "",
    lastPlayed: null
  };

  function normalize(stored) {
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) return structuredClone(DEFAULT_STATE);
    const savedQueriesAreCurrent = stored.contentVersion === CONTENT_VERSION;
    return {
      ...structuredClone(DEFAULT_STATE),
      ...stored,
      contentVersion: CONTENT_VERSION,
      introSeen: stored.introSeen === true,
      solvedChallenges: Array.isArray(stored.solvedChallenges) ? stored.solvedChallenges.filter(id => typeof id === "string") : [],
      hintsUsed: stored.hintsUsed && typeof stored.hintsUsed === "object" && !Array.isArray(stored.hintsUsed) ? stored.hintsUsed : {},
      hintsAtCompletion: stored.hintsAtCompletion && typeof stored.hintsAtCompletion === "object" && !Array.isArray(stored.hintsAtCompletion) ? stored.hintsAtCompletion : {},
      codeFragments: Array.isArray(stored.codeFragments) ? stored.codeFragments.filter(fragment => typeof fragment === "string") : [],
      certificateName: typeof stored.certificateName === "string" ? stored.certificateName.slice(0, 80) : "",
      savedQueries: savedQueriesAreCurrent && stored.savedQueries && typeof stored.savedQueries === "object" && !Array.isArray(stored.savedQueries)
        ? stored.savedQueries
        : {}
    };
  }

  function load() {
    try {
      return normalize(JSON.parse(localStorage.getItem(KEY)));
    } catch (_error) {
      return structuredClone(DEFAULT_STATE);
    }
  }

  function save(state) {
    state.lastPlayed = new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function reset() {
    localStorage.removeItem(KEY);
    return structuredClone(DEFAULT_STATE);
  }

  function exportState(state) {
    return {
      format: EXPORT_FORMAT,
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      progress: normalize(state)
    };
  }

  function importState(payload) {
    if (!payload || payload.format !== EXPORT_FORMAT || payload.version !== EXPORT_VERSION) {
      throw new Error("Die Datei ist kein gültiger SQL-Breakout-Spielstand.");
    }
    const imported = normalize(payload.progress);
    save(imported);
    return imported;
  }

  window.GameStorage = { exportState, importState, load, save, reset };
})();
