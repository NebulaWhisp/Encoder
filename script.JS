let isLetterToNumber = true;

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function toggleMode() {
    isLetterToNumber = !isLetterToNumber;
    const modeButton = document.getElementById('modeToggle');
    const modeDescription = document.getElementById('modeDescription');
    const input = document.getElementById('textInput');

    if (isLetterToNumber) {
        modeButton.textContent = 'Switch to Number→Letter';
        modeDescription.textContent = 'Convert letters to numbers (A=1, B=2, ..., Z=26)';
        input.placeholder = 'Type letters to convert to numbers...';
        document.title = "Encoder"; // Make sure this line executes
        console.log("Switched to Encoder mode"); // Debug line
    } else {
        modeButton.textContent = 'Switch to Letter→Number';
        modeDescription.textContent = 'Convert numbers to letters (1=A, 2=B, ..., 26=Z)';
        input.placeholder = 'Type numbers separated by spaces...';
        document.title = "Decoder"; // Make sure this line executes
        console.log("Switched to Decoder mode"); // Debug line
    }
    
    convertText();
}

function convertText() {
    if (isLetterToNumber) {
        convertToNumbers();
    } else {
        convertToLetters();
    }
}

function convertToNumbers() {
    const text = document.getElementById('textInput').value.toUpperCase();
    let result = '';
    
    for (let char of text) {
        if (char >= 'A' && char <= 'Z') {
            result += (char.charCodeAt(0) - 64) + ' ';
        } else if (char === ' ') {
            result += '| ';
        } else if (/[.,!?;:]/.test(char)) {
            result += char + ' ';
        } else if (/[0-9]/.test(char)) {
            result += '#' + char + ' ';
        } else {
            result += '□ ';
        }
    }

    document.getElementById('output').innerText = result.trim() || 'Result will appear here...';
}

function convertToLetters() {
    const input = document.getElementById('textInput').value.trim();
    let numbers = input.split(/[\s,]+/);
    let result = '';
    
    for (let num of numbers) {
        if (num === '|') {
            result += ' ';
        } else {
            const parsedNum = parseInt(num);
            if (!isNaN(parsedNum) && parsedNum >= 1 && parsedNum <= 26) {
                result += String.fromCharCode(64 + parsedNum);
            } else if (num.length > 0) {
                result += '□';
            }
        }
    }

    document.getElementById('output').innerText = result || 'Result will appear here...';
}

function copyResult(button) {
    const output = document.getElementById('output');
    navigator.clipboard.writeText(output.innerText).then(() => {
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = 'Copy Result';
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        button.textContent = 'Failed to copy';
        setTimeout(() => {
            button.textContent = 'Copy Result';
        }, 2000);
    });
}

function clearInput() {
    document.getElementById('textInput').value = '';
    convertText();
}

window.onload = function() {
    isLetterToNumber = true; 
    document.title = "Encoder"; 
    convertText();
    document.getElementById('modeToggle').textContent = 'Switch to Number→Letter';
}
(function protectFooter() {
    // Create and insert footer as soon as possible
    const footer = document.createElement('div');
    footer.className = 'protected-footer';
    footer.innerHTML = 'by Faseeh Haider';
    document.body.appendChild(footer);

    // Protect the footer content and styling
    const protectElement = () => {
        const footer = document.querySelector('.protected-footer');
        if (!footer || footer.innerHTML !== 'by Faseeh Haider') {
            location.reload(); // Reload if footer is modified or removed
        }
    };

    // Multiple protection layers
    const protection = {
        // Make footer read-only
        lockElement: () => {
            const footer = document.querySelector('.protected-footer');
            Object.defineProperty(footer, 'innerHTML', {
                get: function() { return 'by Faseeh Haider'; },
                set: function() { return 'by Faseeh Haider'; },
                configurable: false
            });
        },

        // Monitor footer changes
        watchFooter: () => {
            const observer = new MutationObserver(() => protectElement());
            const footer = document.querySelector('.protected-footer');
            observer.observe(footer, {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true
            });
        },

        // Prevent style modifications
        protectStyles: () => {
            const style = document.createElement('style');
            style.innerHTML = `
                .protected-footer {
                    position: fixed !important;
                    bottom: 20px !important;
                    left: 20px !important;
                    color: rgba(255, 255, 255, 0.8) !important;
                    font-size: 0.9rem !important;
                    z-index: 9999 !important;
                    user-select: none !important;
                    pointer-events: none !important;
                    -webkit-user-select: none !important;
                    -moz-user-select: none !important;
                    -ms-user-select: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    };

    // Initialize protection when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        protection.lockElement();
        protection.watchFooter();
        protection.protectStyles();
    });

    // Continuous monitoring
    setInterval(protectElement, 1000);

    // Prevent console modifications
    Object.freeze(footer);
})();