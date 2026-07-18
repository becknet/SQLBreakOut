(function () {
  "use strict";

  const KEY = "sql-breakout-progress-v1";
  const CONTENT_VERSION = 2;
  const DEFAULT_STATE = {
    contentVersion: CONTENT_VERSION,
    introSeen: false,
    currentChallenge: "1-1",
    solvedChallenges: [],
    hintsUsed: {},
    codeFragments: [],
    savedQueries: {},
    lastPlayed: null
  };

  function load() {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY));
      if (!stored || typeof stored !== "object") return structuredClone(DEFAULT_STATE);
      const savedQueriesAreCurrent = stored.contentVersion === CONTENT_VERSION;
      return {
        ...structuredClone(DEFAULT_STATE),
        ...stored,
        contentVersion: CONTENT_VERSION,
        solvedChallenges: Array.isArray(stored.solvedChallenges) ? stored.solvedChallenges : [],
        hintsUsed: stored.hintsUsed && typeof stored.hintsUsed === "object" ? stored.hintsUsed : {},
        codeFragments: Array.isArray(stored.codeFragments) ? stored.codeFragments : [],
        savedQueries: savedQueriesAreCurrent && stored.savedQueries && typeof stored.savedQueries === "object"
          ? stored.savedQueries
          : {}
      };
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

  window.GameStorage = { load, save, reset };
})();
