function solveProblem() {
    const problemBox = document.querySelector('.old-space-indent');
    if (!problemBox) return;

    let equationText = problemBox.textContent.replace(/–/g, '-').replace(/−/g, '-').trim();
    equationText = equationText.replace(/[^\d+\-*/(). ]/g, '').trim();

    const inputBox = problemBox.querySelector('input.fillIn');
    if (!inputBox) return;

    const scoreElement = document.querySelector('.current-smartscore');
    let smartScore = scoreElement ? parseInt(scoreElement.textContent, 10) : 0;

    try {
        let answer = eval(equationText);
        if (window.forceWrongAnswer) {
            answer = 1000;
            window.forceWrongAnswer = false;
            setTimeout(() => {
                const nextProblemDiv = document.querySelector('.next-problem');
                if (nextProblemDiv) {
                    const gotItButton = nextProblemDiv.querySelector('button.crisp-button');
                    if (gotItButton) {
                        gotItButton.click();
                    }
                }
            }, 2000);
        } else if (smartScore >= 80 && window.overrideCount < 15) {
            answer = 10000000;
            window.overrideCount = (window.overrideCount || 0) + 1;
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
        window.forceWrongAnswer = true;
    }
}

window.overrideCount = 0;
window.forceWrongAnswer = false;

setInterval(solveProblem, 1000);
