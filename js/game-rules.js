(function () {
  "use strict";

  function isChallengeUnlocked(challenges, solvedChallenges, challenge) {
    const index = challenges.findIndex(item => item.id === challenge.id);
    return index === 0 || (index > 0 && solvedChallenges.includes(challenges[index - 1].id));
  }

  function getAvailableChallenge(challenges, solvedChallenges, requestedId) {
    const requested = challenges.find(item => item.id === requestedId);
    if (requested && isChallengeUnlocked(challenges, solvedChallenges, requested)) return requested;

    for (let index = challenges.length - 1; index >= 0; index -= 1) {
      if (isChallengeUnlocked(challenges, solvedChallenges, challenges[index])) return challenges[index];
    }
    return challenges[0];
  }

  function isChapterUnlocked(challenges, solvedChallenges, chapterId) {
    const firstChallenge = challenges.find(item => item.chapter === chapterId);
    return firstChallenge ? isChallengeUnlocked(challenges, solvedChallenges, firstChallenge) : false;
  }

  function getChapterTarget(challenges, solvedChallenges, chapterId) {
    const chapterChallenges = challenges.filter(item => item.chapter === chapterId);
    if (!chapterChallenges.length || !isChapterUnlocked(challenges, solvedChallenges, chapterId)) return null;

    return chapterChallenges.find(item =>
      !solvedChallenges.includes(item.id) && isChallengeUnlocked(challenges, solvedChallenges, item)
    ) || chapterChallenges[chapterChallenges.length - 1];
  }

  window.SQLBreakoutRules = {
    getAvailableChallenge,
    getChapterTarget,
    isChallengeUnlocked,
    isChapterUnlocked
  };
})();
