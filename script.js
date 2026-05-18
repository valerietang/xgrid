const grid = document.getElementById("grid");

const codeInput = document.getElementById("codeInput");

const submitBtn = document.getElementById("submitBtn");

const statusEl = document.getElementById("status");

const usedCodesEl = document.getElementById("usedCodes");

/* =========================
   CREATE GRID
========================= */

for (let i = 1; i <= 100; i++) {

    const cell = document.createElement("div");

    cell.classList.add("cell");

    cell.dataset.number = i;

    cell.textContent = i;

    grid.appendChild(cell);
}

/* =========================
   STATE
========================= */

const eliminatedNumbers = new Set();

const usedCodes = new Set();

/* =========================
   HELPERS
========================= */

function eliminateNumber(num) {

    if (num < 1 || num > 100) return;

    if (!eliminatedNumbers.has(num)) {

        eliminatedNumbers.add(num);

        const cell = document.querySelector(
            `[data-number="${num}"]`
        );

        if (cell) {
            cell.classList.add("eliminated");
        }
    }
}

function eliminateMultiplesOf(n) {

    for (let i = n; i <= 100; i += n) {
        eliminateNumber(i);
    }
}

function isPrime(num) {

    if (num < 2) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {

        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

function fibonacciSet(limit) {

    const fibs = new Set();

    let a = 1;
    let b = 1;

    fibs.add(1);

    while (a <= limit) {

        fibs.add(a);

        let temp = a + b;

        a = b;

        b = temp;
    }

    return fibs;
}

/* =========================
   RULES
========================= */

const rules = {

    /* multiples of 4 */
    DJKT: () => {
        eliminateMultiplesOf(4);
    },

    /* multiples of 5 */
    KYIK: () => {
        eliminateMultiplesOf(5);
    },

    /* eliminate non-fibonacci */
    KYXQ: () => {

        const fibs = fibonacciSet(100);

        for (let i = 1; i <= 100; i++) {

            if (!fibs.has(i)) {
                eliminateNumber(i);
            }
        }
    },

    /* multiples of 9 */
    GSRM: () => {
        eliminateMultiplesOf(9);
    },

    /* second digit smaller than first */
    TDUT: () => {

        for (let i = 10; i <= 99; i++) {

            const first = Math.floor(i / 10);

            const second = i % 10;

            if (second < first) {
                eliminateNumber(i);
            }
        }
    },

    /* multiples of 7 */
    LUTD: () => {
        eliminateMultiplesOf(7);
    },

    /* multiples of 3 */
    NATR: () => {
        eliminateMultiplesOf(3);
    },

    /* prime numbers */
    YRSL: () => {

        for (let i = 1; i <= 100; i++) {

            if (isPrime(i)) {
                eliminateNumber(i);
            }
        }
    },

    /* multiples of 8 */
    PYRS: () => {
        eliminateMultiplesOf(8);
    },

    /* same digits */
    KTDE: () => {

        const doubles = [
            11,22,33,44,55,
            66,77,88,99
        ];

        doubles.forEach(eliminateNumber);
    }
};

/* =========================
   APPLY CODE
========================= */

function applyCode() {

    const code = codeInput.value
        .trim()
        .toUpperCase();

    if (!code) {

        setStatus("Enter a code.");

        return;
    }

    if (!rules[code]) {

        setStatus("Invalid code.");

        return;
    }

    if (usedCodes.has(code)) {

        setStatus("Code already used.");

        return;
    }

    usedCodes.add(code);

    rules[code]();

    addCodePill(code);

    setStatus(`Applied code: ${code}`);

    codeInput.value = "";
}

/* =========================
   UI HELPERS
========================= */

function setStatus(message) {

    statusEl.textContent = message;
}

function addCodePill(code) {

    const pill = document.createElement("div");

    pill.classList.add("code-pill");

    pill.textContent = code;

    usedCodesEl.appendChild(pill);
}

/* =========================
   EVENTS
========================= */

submitBtn.addEventListener("click", applyCode);

codeInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        applyCode();
    }
});
