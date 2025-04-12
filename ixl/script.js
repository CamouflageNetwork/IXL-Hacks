(function () {
  const popup = window.open(window.location.href, '_blank', 'width=1000,height=800');

  const runSolver = function () {
    (function keepSolving() {
      let lastAttempt = Date.now();

      function solveProblem() {
        const problemBox = document.querySelector('.old-space-indent');
        if (!problemBox) return;

        let equationText = problemBox.textContent
          .replace(/â€“/g, '-')
          .replace(/âˆ’/g, '-')
          .trim();
        equationText = equationText.replace(/[^\d+\-*/(). ]/g, '').trim();

        const inputBox = problemBox.querySelector('input.fillIn');
        if (!inputBox) return;

        const scoreElement = document.querySelector('.current-smartscore');
        let smartScore = scoreElement ? parseInt(scoreElement.textContent, 10) : 0;

        try {
          if (smartScore > 90) {
            alert("Got a question wrong. Reloading...");
            location.reload();
            return;
          }

          let answer = eval(equationText);
          if (smartScore >= 80) {
            answer = 10000000;
          }

          inputBox.value = answer;
          inputBox.dispatchEvent(new Event('input', { bubbles: true }));
          inputBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

          setTimeout(() => {
            const nextProblemDiv = document.querySelector('.next-problem');
            if (nextProblemDiv) {
              const gotItButton = nextProblemDiv.querySelector('button.crisp-button');
              if (gotItButton) {
                gotItButton.click();
              }
            }
          }, 500);
        } catch (e) {
          console.error('Error solving the problem:', e);
        }
      }

      function loop() {
        const now = Date.now();
        if (now - lastAttempt >= 500) {
          solveProblem();
          lastAttempt = now;
        }
        requestAnimationFrame(loop);
      }

      loop();
    })();
  };

  popup.onload = function () {
    popup.eval(`(${runSolver.toString()})();`);
  };
})();
