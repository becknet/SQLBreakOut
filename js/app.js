(function () {
  "use strict";

  const chapters = window.SQL_BREAKOUT_CHAPTERS;
  const challenges = window.SQL_BREAKOUT_CHALLENGES;
  const rules = window.SQLBreakoutRules;
  const db = window.PixelwerkDatabase;
  const storage = window.GameStorage;
  let state = storage.load();
  let activeChallenge = challenges[0];
  let selectedTable = "users";
  let toastTimer;

  const els = {};

  document.addEventListener("DOMContentLoaded", initialize);

  async function initialize() {
    collectElements();
    bindEvents();
    freezeCompletedHintCounts();
    const initial = getAvailableChallenge(state.currentChallenge);
    selectChallenge(initial.id);
    renderSchema();
    setBusy(true, "Datenbank wird geladen …");
    if (!state.introSeen) openIntroDialog();
    try {
      await db.initialize();
      setBusy(false, "Datenbank bereit");
    } catch (error) {
      showFeedback("error", `Die Datenbank konnte nicht geladen werden: ${friendlyError(error)}`);
      setBusy(true, "Ladefehler");
    }
  }

  function collectElements() {
    [
      "progress-label", "progress-bar", "chapter-label", "chapter-title", "chapter-subtitle",
      "chapter-switcher", "mission-list", "mission-number", "mission-status",
      "mission-title", "mission-story", "mission-task", "mission-objective", "hint-counter",
      "hint-content", "show-hint", "reset-progress", "reset-database", "table-tabs",
      "schema-fields", "sql-editor", "line-numbers", "run-query", "check-solution", "db-status", "feedback",
      "result-meta", "result-container", "intro-dialog", "start-game", "success-dialog", "success-title", "success-text",
      "code-fragment", "next-mission", "open-info", "close-info", "info-dialog", "export-progress",
      "import-progress", "import-file", "open-final", "final-dialog", "final-code", "final-hints-total", "final-no-hint-count",
      "certificate-name", "certificate-error", "open-certificate", "export-final-progress", "close-final",
      "certificate-dialog", "close-certificate", "certificate-player", "certificate-hints-total",
      "certificate-without-hints", "certificate-chapters", "certificate-date", "certificate-code",
      "print-certificate", "back-to-final", "toast"
    ].forEach(id => { els[id] = document.getElementById(id); });
  }

  function bindEvents() {
    els["chapter-switcher"].addEventListener("click", event => {
      const button = event.target.closest("button[data-chapter]");
      if (button && !button.disabled) selectChapter(Number(button.dataset.chapter));
    });
    els["mission-list"].addEventListener("click", event => {
      const button = event.target.closest("button[data-challenge]");
      if (button && !button.disabled) selectChallenge(button.dataset.challenge);
    });
    els["show-hint"].addEventListener("click", showNextHint);
    els["run-query"].addEventListener("click", runQuery);
    els["check-solution"].addEventListener("click", checkSolution);
    els["reset-database"].addEventListener("click", resetDatabase);
    els["reset-progress"].addEventListener("click", resetProgress);
    els["export-progress"].addEventListener("click", exportProgress);
    els["export-final-progress"].addEventListener("click", exportProgress);
    els["import-progress"].addEventListener("click", () => els["import-file"].click());
    els["import-file"].addEventListener("change", importProgress);
    els["open-final"].addEventListener("click", showFinalDialog);
    els["sql-editor"].addEventListener("input", updateEditor);
    els["sql-editor"].addEventListener("keydown", event => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        runQuery();
      }
      if (event.key === "Tab") {
        event.preventDefault();
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;
        event.target.setRangeText("  ", start, end, "end");
        updateEditor();
      }
    });
    els["table-tabs"].addEventListener("click", event => {
      const tab = event.target.closest("button[data-table]");
      if (tab) {
        selectedTable = tab.dataset.table;
        renderSchema();
      }
    });
    els["next-mission"].addEventListener("click", goToNextMission);
    els["start-game"].addEventListener("click", startGame);
    els["intro-dialog"].addEventListener("cancel", event => event.preventDefault());
    els["open-info"].addEventListener("click", () => els["info-dialog"].showModal());
    els["close-info"].addEventListener("click", () => els["info-dialog"].close());
    els["info-dialog"].addEventListener("click", closeOnBackdrop);
    els["success-dialog"].addEventListener("click", closeOnBackdrop);
    els["final-dialog"].addEventListener("click", closeOnBackdrop);
    els["close-final"].addEventListener("click", () => els["final-dialog"].close());
    els["open-certificate"].addEventListener("click", openCertificate);
    els["certificate-name"].addEventListener("input", () => {
      els["certificate-error"].hidden = true;
    });
    els["certificate-name"].addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        openCertificate();
      }
    });
    els["close-certificate"].addEventListener("click", closeCertificate);
    els["back-to-final"].addEventListener("click", closeCertificate);
    els["print-certificate"].addEventListener("click", () => window.print());
    els["certificate-dialog"].addEventListener("cancel", event => {
      event.preventDefault();
      closeCertificate();
    });
  }

  function closeOnBackdrop(event) {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }

  function openIntroDialog() {
    if (!els["intro-dialog"].open) els["intro-dialog"].showModal();
  }

  function startGame() {
    state.introSeen = true;
    storage.save(state);
    els["intro-dialog"].close();
    els["sql-editor"].focus();
  }

  function getAvailableChallenge(requestedId) {
    return rules.getAvailableChallenge(challenges, state.solvedChallenges, requestedId);
  }

  function selectChallenge(id) {
    const challenge = challenges.find(item => item.id === id);
    if (!challenge || !isUnlocked(challenge)) return;
    activeChallenge = challenge;
    state.currentChallenge = id;
    storage.save(state);
    const hasSavedQuery = Object.prototype.hasOwnProperty.call(state.savedQueries, id);
    els["sql-editor"].value = hasSavedQuery ? state.savedQueries[id] : challenge.starterSql;
    updateEditor(false);
    clearResult();
    render();
  }

  function isUnlocked(challenge) {
    return rules.isChallengeUnlocked(challenges, state.solvedChallenges, challenge);
  }

  function isChapterUnlocked(chapterId) {
    return rules.isChapterUnlocked(challenges, state.solvedChallenges, chapterId);
  }

  function selectChapter(chapterId) {
    const target = rules.getChapterTarget(challenges, state.solvedChallenges, chapterId);
    if (target) selectChallenge(target.id);
  }

  function render() {
    renderProgress();
    renderChapterNavigation();
    renderMissionList();
    renderBriefing();
  }

  function renderProgress() {
    const solved = state.solvedChallenges.length;
    els["progress-label"].textContent = `${solved} von ${challenges.length} Missionen`;
    els["progress-bar"].style.width = `${solved / challenges.length * 100}%`;
    const progress = els["progress-bar"].parentElement;
    progress.setAttribute("aria-valuenow", String(solved));
    els["open-final"].hidden = solved !== challenges.length;
    progress.setAttribute("aria-valuemax", String(challenges.length));
  }

  function renderChapterNavigation() {
    const activeChapter = chapters.find(item => item.id === activeChallenge.chapter);
    els["chapter-label"].textContent = `Kapitel ${activeChapter.number}`;
    els["chapter-title"].textContent = activeChapter.title;
    els["chapter-subtitle"].textContent = activeChapter.subtitle;
    els["chapter-switcher"].innerHTML = chapters.map(chapter => {
      const active = chapter.id === activeChapter.id;
      const unlocked = isChapterUnlocked(chapter.id);
      const chapterChallenges = challenges.filter(item => item.chapter === chapter.id);
      const solved = chapterChallenges.filter(item => state.solvedChallenges.includes(item.id)).length;
      const complete = solved === chapterChallenges.length;
      const visibleMarker = complete ? "✓" : chapter.number;
      const visibleStatus = unlocked ? `${solved}/${chapterChallenges.length}` : "Gesperrt";
      return `<button type="button" class="chapter-button${active ? " active" : ""}${complete ? " done" : ""}"
        data-chapter="${chapter.id}" ${unlocked ? "" : "disabled"} aria-pressed="${active}"
        aria-label="${escapeHtml(`${visibleMarker} ${visibleStatus} – Kapitel ${chapter.number}: ${chapter.title}`)}">
        <span>${visibleMarker}</span>
        <small>${visibleStatus}</small>
      </button>`;
    }).join("");
  }

  function renderMissionList() {
    const chapterChallenges = challenges.filter(item => item.chapter === activeChallenge.chapter);
    els["mission-list"].innerHTML = chapterChallenges.map((challenge, index) => {
      const done = state.solvedChallenges.includes(challenge.id);
      const active = challenge.id === activeChallenge.id;
      const unlocked = isUnlocked(challenge);
      const status = done ? "Abgeschlossen" : active ? "Aktiv" : unlocked ? "Verfügbar" : "Gesperrt";
      return `<li>
        <button type="button" class="mission-button${active ? " active" : ""}${done ? " done" : ""}"
          data-challenge="${challenge.id}" ${unlocked ? "" : "disabled"} aria-current="${active ? "step" : "false"}">
          <span class="mission-index">${done ? "✓" : String(index + 1).padStart(2, "0")}</span>
          <span class="mission-name"><b>${escapeHtml(challenge.shortTitle)}</b><small>${escapeHtml(challenge.concept)} · ${status}</small></span>
          <span class="mission-check">${done ? "●" : unlocked ? "›" : "⌁"}</span>
        </button>
      </li>`;
    }).join("");
  }

  function renderBriefing() {
    const chapterChallenges = challenges.filter(item => item.chapter === activeChallenge.chapter);
    const index = chapterChallenges.indexOf(activeChallenge);
    const done = state.solvedChallenges.includes(activeChallenge.id);
    const usedHints = state.hintsUsed[activeChallenge.id] || 0;
    els["mission-number"].textContent = `MISSION ${String(index + 1).padStart(2, "0")} · KAPITEL ${String(activeChallenge.chapter).padStart(2, "0")}`;
    els["mission-status"].textContent = done ? "GELÖST" : "AKTIV";
    els["mission-status"].classList.toggle("done", done);
    els["mission-title"].textContent = activeChallenge.title;
    els["mission-story"].textContent = activeChallenge.story;
    els["mission-task"].textContent = activeChallenge.task;
    els["mission-objective"].textContent = activeChallenge.objective;
    els["hint-counter"].textContent = `${usedHints} / 3 geöffnet`;
    if (usedHints === 0) {
      els["hint-content"].innerHTML = "<p>Noch kein Hinweis geöffnet. Versuch es zuerst selbst.</p>";
    } else {
      els["hint-content"].innerHTML = `<p><b>Hinweis ${usedHints}:</b> ${activeChallenge.hints[usedHints - 1]}</p>`;
    }
    els["show-hint"].disabled = usedHints >= 3;
    els["show-hint"].innerHTML = usedHints >= 3
      ? "Alle Hinweise geöffnet"
      : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 22h4M8.2 14.5A6 6 0 1 1 15.8 14.5C14.7 15.3 14 16.5 14 18h-4c0-1.5-.7-2.7-1.8-3.5Z"></path></svg> Hinweis ${usedHints + 1} öffnen`;
  }

  function renderSchema() {
    const tables = Object.keys(db.schema);
    els["table-tabs"].innerHTML = tables.map(table =>
      `<button class="table-tab${table === selectedTable ? " active" : ""}" type="button" role="tab" data-table="${table}" aria-selected="${table === selectedTable}">${table}</button>`
    ).join("");
    els["schema-fields"].innerHTML = db.schema[selectedTable].map((field, index) =>
      `<span>${index === 0 ? `<b>${field}</b> PK` : field}</span>`
    ).join("");
  }

  function showNextHint() {
    const count = Math.min((state.hintsUsed[activeChallenge.id] || 0) + 1, 3);
    state.hintsUsed[activeChallenge.id] = count;
    storage.save(state);
    renderBriefing();
  }

  function updateEditor(save = true) {
    const lines = Math.max(1, els["sql-editor"].value.split("\n").length);
    els["line-numbers"].textContent = Array.from({ length: lines }, (_, index) => index + 1).join("\n");
    if (save && activeChallenge) {
      state.savedQueries[activeChallenge.id] = els["sql-editor"].value;
      storage.save(state);
    }
  }

  function runQuery() {
    executeQuery(false);
  }

  function checkSolution() {
    executeQuery(true);
  }

  function executeQuery(shouldValidate) {
    const sql = els["sql-editor"].value;
    const mutationChallenge = activeChallenge.validation.type === "mutation";
    setBusy(true, shouldValidate ? "Lösung wird geprüft …" : "Abfrage läuft …");
    clearFeedback();
    window.setTimeout(() => {
      try {
        const result = db.execute(sql, {
          allowMutations: mutationChallenge,
          verificationSql: mutationChallenge ? activeChallenge.validation.verificationSql : null
        });
        renderResult(result);
        if (shouldValidate) {
          const validation = validateExecution(result, activeChallenge);
          if (validation.ok) completeMission();
          else showFeedback("info", validation.message);
        } else if (result.isMutation) {
          showFeedback("info", `Sichere Vorschau: ${result.rowsModified} Zeile${result.rowsModified === 1 ? "" : "n"} wäre${result.rowsModified === 1 ? "" : "n"} betroffen. Die Ausgangsdaten bleiben unverändert.`);
        } else {
          showFeedback("info", "Abfrage ausgeführt. Prüfe das Ergebnis und klicke anschliessend auf «Lösung prüfen».");
        }
      } catch (error) {
        renderErrorState();
        showFeedback("error", friendlyError(error));
      } finally {
        setBusy(false, "Datenbank bereit");
      }
    }, 100);
  }

  function validateExecution(actual, challenge) {
    return challenge.validation.type === "mutation"
      ? validateMutation(actual, challenge)
      : validateResult(actual, challenge);
  }

  function validateMutation(actual, challenge) {
    const validation = challenge.validation;
    if (actual.command !== validation.command) {
      return { ok: false, message: `Diese Mission erwartet ${validation.command}, deine Anweisung verwendet jedoch ${actual.command}.` };
    }
    if (validation.requireWhere && !actual.hasWhere) {
      return { ok: false, message: `${validation.command} benötigt hier einen sicheren WHERE-Filter.` };
    }
    if (Number.isInteger(validation.minAffectedRows) && actual.rowsModified < validation.minAffectedRows) {
      return { ok: false, message: `Die Anweisung verändert keine passende Zeile. Prüfe Werte und WHERE-Bedingungen.` };
    }
    if (Number.isInteger(validation.maxAffectedRows) && actual.rowsModified > validation.maxAffectedRows) {
      return { ok: false, message: `Die Anweisung würde ${actual.rowsModified} Zeilen verändern. Erlaubt ${validation.maxAffectedRows === 1 ? "ist genau eine Zeile" : `sind höchstens ${validation.maxAffectedRows} Zeilen`}. Verfeinere den Filter.` };
    }

    const expected = db.expectedMutationResult(validation.expectedSql, validation.verificationSql);
    if (!sameColumns(actual.verification.columns, expected.columns)) {
      return { ok: false, message: "Die Anweisung läuft, aber der resultierende Datenzustand besitzt nicht die erwarteten Spalten." };
    }
    const actualRows = normalizeRows(actual.verification.values, validation.ordered);
    const expectedRows = normalizeRows(expected.values, validation.ordered);
    if (JSON.stringify(actualRows) !== JSON.stringify(expectedRows)) {
      return { ok: false, message: "Die Anweisung läuft, führt aber noch nicht zum erwarteten Datenzustand. Prüfe Zielwerte und Filter." };
    }
    return { ok: true };
  }

  function validateResult(actual, challenge) {
    const expected = db.expectedResult(challenge.validation.expectedSql);
    if (!sameColumns(actual.columns, expected.columns)) {
      return { ok: false, message: `Die Abfrage läuft, aber die Spalten stimmen noch nicht. Erwartet: ${expected.columns.join(", ")}.` };
    }
    if (actual.values.length !== expected.values.length) {
      return { ok: false, message: `Die Abfrage läuft, liefert aber ${actual.values.length} statt ${expected.values.length} Zeile${expected.values.length === 1 ? "" : "n"}. Prüfe Filter, Sortierung oder Begrenzung.` };
    }
    const actualRows = normalizeRows(actual.values, challenge.validation.ordered);
    const expectedRows = normalizeRows(expected.values, challenge.validation.ordered);
    if (JSON.stringify(actualRows) !== JSON.stringify(expectedRows)) {
      const message = challenge.validation.ordered
        ? "Die richtigen Daten sind dabei, aber die Reihenfolge stimmt noch nicht. Prüfe ORDER BY und die Sortierrichtung."
        : "Die Anzahl stimmt, aber mindestens ein Wert ist noch nicht der gesuchte. Prüfe deine Bedingungen.";
      return { ok: false, message };
    }
    return { ok: true };
  }

  function sameColumns(actual, expected) {
    return JSON.stringify(actual.map(item => item.toLowerCase())) === JSON.stringify(expected.map(item => item.toLowerCase()));
  }

  function normalizeRows(rows, ordered) {
    const normalized = rows.map(row => JSON.stringify(row.map(value => value === undefined ? null : value)));
    if (!ordered) normalized.sort();
    return normalized;
  }

  function completeMission() {
    const alreadyDone = state.solvedChallenges.includes(activeChallenge.id);
    if (!alreadyDone) {
      state.solvedChallenges.push(activeChallenge.id);
      state.hintsAtCompletion[activeChallenge.id] = getHintCount(activeChallenge.id);
      state.codeFragments.push(activeChallenge.fragment);
      storage.save(state);
    }
    showFeedback(
      "success",
      activeChallenge.validation.type === "mutation"
        ? "Korrekt – der resultierende Datenzustand entspricht dem Auftrag."
        : "Korrekt – das Abfrageergebnis entspricht dem Auftrag."
    );
    renderProgress();
    renderChapterNavigation();
    renderMissionList();
    renderBriefing();
    const chapterChallenges = challenges.filter(item => item.chapter === activeChallenge.chapter);
    const lastInChapter = chapterChallenges[chapterChallenges.length - 1].id === activeChallenge.id;
    const lastOverall = challenges[challenges.length - 1].id === activeChallenge.id;
    els["success-title"].textContent = lastInChapter ? `Kapitel ${activeChallenge.chapter} gelöst` : "Spur gesichert";
    els["success-text"].textContent = activeChallenge.success;
    els["code-fragment"].textContent = activeChallenge.fragment;
    els["next-mission"].innerHTML = lastOverall
      ? "Finale öffnen <span>→</span>"
      : lastInChapter
        ? `Kapitel ${activeChallenge.chapter + 1} starten <span>→</span>`
        : "Nächste Mission <span>→</span>";
    window.setTimeout(() => els["success-dialog"].showModal(), 250);
  }

  function goToNextMission() {
    els["success-dialog"].close();
    const index = challenges.indexOf(activeChallenge);
    if (index < challenges.length - 1) selectChallenge(challenges[index + 1].id);
    else showFinalDialog();
  }

  function getHintCount(challengeId) {
    const frozen = state.hintsAtCompletion[challengeId];
    const current = state.hintsUsed[challengeId];
    const value = frozen ?? current ?? 0;
    return Math.max(0, Math.min(3, Number(value) || 0));
  }

  function freezeCompletedHintCounts() {
    let changed = false;
    state.solvedChallenges.forEach(challengeId => {
      if (state.hintsAtCompletion[challengeId] === undefined) {
        state.hintsAtCompletion[challengeId] = getHintCount(challengeId);
        changed = true;
      }
    });
    if (changed) storage.save(state);
  }

  function getSupportStats() {
    const solved = challenges.filter(challenge => state.solvedChallenges.includes(challenge.id));
    const rows = chapters.map(chapter => {
      const chapterChallenges = solved.filter(challenge => challenge.chapter === chapter.id);
      return {
        chapter,
        missions: chapterChallenges.length,
        hints: chapterChallenges.reduce((sum, challenge) => sum + getHintCount(challenge.id), 0)
      };
    });
    const totalHints = rows.reduce((sum, row) => sum + row.hints, 0);
    const withoutHints = solved.filter(challenge => getHintCount(challenge.id) === 0).length;
    return { solved: solved.length, totalHints, withoutHints, rows };
  }

  function showFinalDialog() {
    const stats = getSupportStats();
    els["final-code"].textContent = state.codeFragments.join("");
    els["final-hints-total"].textContent = String(stats.totalHints);
    els["final-no-hint-count"].textContent = String(stats.withoutHints);
    els["certificate-name"].value = state.certificateName || "";
    els["certificate-error"].hidden = true;
    els["final-dialog"].showModal();
  }

  function openCertificate() {
    if (state.solvedChallenges.length !== challenges.length) {
      els["certificate-error"].textContent = "Das Zertifikat wird nach Abschluss aller Missionen freigeschaltet.";
      els["certificate-error"].hidden = false;
      return;
    }
    const playerName = els["certificate-name"].value.trim().replace(/\s+/g, " ");
    if (!playerName) {
      els["certificate-error"].textContent = "Bitte gib den Namen für das Zertifikat ein.";
      els["certificate-error"].hidden = false;
      els["certificate-name"].focus();
      return;
    }
    state.certificateName = playerName;
    storage.save(state);
    renderCertificate(playerName);
    els["final-dialog"].close();
    els["certificate-dialog"].showModal();
  }

  function renderCertificate(playerName) {
    const stats = getSupportStats();
    els["certificate-player"].textContent = playerName;
    els["certificate-hints-total"].textContent = String(stats.totalHints);
    els["certificate-without-hints"].textContent = String(stats.withoutHints);
    els["certificate-code"].textContent = state.codeFragments.join("");
    els["certificate-date"].textContent = new Intl.DateTimeFormat("de-CH", {
      day: "2-digit", month: "2-digit", year: "numeric"
    }).format(new Date());
    els["certificate-chapters"].innerHTML = stats.rows.map(row => `
      <tr>
        <td>Kapitel ${row.chapter.number} · ${escapeHtml(row.chapter.title)}</td>
        <td>${row.missions}</td>
        <td>${row.hints}</td>
      </tr>
    `).join("");
  }

  function closeCertificate() {
    els["certificate-dialog"].close();
    showFinalDialog();
  }

  function resetDatabase() {
    db.reset();
    clearResult();
    showToast("Die Pixelwerk-Datenbank wurde auf den Ausgangszustand zurückgesetzt.");
  }

  function resetProgress() {
    if (!window.confirm("Wirklich alle gelösten Missionen, Hinweise und gespeicherten Abfragen löschen?")) return;
    state = storage.reset();
    selectChallenge(challenges[0].id);
    showToast("Der Spielfortschritt wurde zurückgesetzt.");
    openIntroDialog();
  }

  function exportProgress() {
    const payload = storage.exportState(state);
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sql-breakout-spielstand-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    showToast("Spielstand wurde als JSON-Datei exportiert.");
  }

  async function importProgress(event) {
    const file = event.target.files[0];
    event.target.value = "";
    if (!file) return;
    if (!window.confirm("Der importierte Spielstand ersetzt den aktuellen Fortschritt. Fortfahren?")) return;

    try {
      const payload = JSON.parse(await file.text());
      state = storage.importState(payload);
      freezeCompletedHintCounts();
      db.reset();
      const initial = getAvailableChallenge(state.currentChallenge);
      selectChallenge(initial.id);
      renderSchema();
      if (!state.introSeen) openIntroDialog();
      showToast("Spielstand erfolgreich importiert.");
    } catch (error) {
      showFeedback("error", friendlyError(error));
    }
  }

  function renderResult(result) {
    els["result-meta"].textContent = `${result.values.length} Zeile${result.values.length === 1 ? "" : "n"} · ${result.columns.length} Spalten`;
    if (result.columns.length === 0) {
      els["result-container"].innerHTML = '<div class="empty-state"><p>Die Abfrage hat keine Ergebnistabelle erzeugt.</p></div>';
      return;
    }
    const header = result.columns.map(column => `<th scope="col">${escapeHtml(column)}</th>`).join("");
    const body = result.values.map(row => `<tr>${row.map(value =>
      `<td>${value === null ? '<span class="null-value">NULL</span>' : escapeHtml(String(value))}</td>`
    ).join("")}</tr>`).join("");
    els["result-container"].innerHTML = `<table class="result-table"><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`;
  }

  function renderErrorState() {
    els["result-meta"].textContent = "Abfrage fehlgeschlagen";
    els["result-container"].innerHTML = '<div class="empty-state"><p>SQLite konnte diese Abfrage nicht ausführen.</p></div>';
  }

  function clearResult() {
    els["result-meta"].textContent = "Noch keine Abfrage";
    els["result-container"].innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"></path></svg><p>Führe deine Abfrage aus.</p></div>';
    clearFeedback();
  }

  function showFeedback(type, message) {
    els.feedback.hidden = false;
    els.feedback.className = `feedback ${type}`;
    els.feedback.textContent = message;
  }

  function clearFeedback() {
    els.feedback.hidden = true;
    els.feedback.textContent = "";
  }

  function setBusy(busy, text) {
    els["run-query"].disabled = busy;
    els["check-solution"].disabled = busy;
    els["db-status"].innerHTML = `<span class="live-dot"></span> ${escapeHtml(text)}`;
  }

  function friendlyError(error) {
    return String(error.message || error)
      .replace(/^Error:\s*/i, "")
      .replace(/near "([^"]+)": syntax error/i, 'Syntaxfehler bei „$1“. Prüfe Schreibweise und Satzzeichen.')
      .replace(/no such table: ([^\s]+)/i, 'Die Tabelle „$1“ existiert nicht. Prüfe das Datenbankschema.')
      .replace(/no such column: ([^\s]+)/i, 'Die Spalte „$1“ existiert nicht. Prüfe das Datenbankschema.');
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    toastTimer = window.setTimeout(() => els.toast.classList.remove("show"), 3500);
  }

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }
})();
