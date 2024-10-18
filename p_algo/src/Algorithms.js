// KMP search algorithm
function computeLPSArray(pattern) {
const lps = new Array(pattern.length).fill(0);
let length = 0;
let i = 1;

while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
    length++;
    lps[i] = length;
    i++;
    } else {
    if (length !== 0) {
        length = lps[length - 1];
    } else {
        lps[i] = 0;
        i++;
    }
    }
}
return lps;
}

function KMPSearch(text, pattern) {
const lps = computeLPSArray(pattern);
const matches = [];
let i = 0;
let j = 0;

while (i < text.length) {
    if (pattern[j] === text[i]) {
    i++;
    j++;
    }
    if (j === pattern.length) {
    matches.push(i - j);
    j = lps[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
    if (j !== 0) {
        j = lps[j - 1];
    } else {
        i++;
    }
    }
}
return matches;
}

// LCS Algorithm to find longest common substring between two texts
function longestCommonSubstring(text1, text2) {
const m = text1.length;
const n = text2.length;
const LCSuff = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));
let length = 0;
let row = 0,
    col = 0;

for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
    if (text1[i - 1] === text2[j - 1]) {
        LCSuff[i][j] = LCSuff[i - 1][j - 1] + 1;
        if (LCSuff[i][j] > length) {
        length = LCSuff[i][j];
        row = i;
        col = j;
        }
    } else {
        LCSuff[i][j] = 0;
    }
    }
}

if (length === 0) return "";

let resultStr = "";
while (LCSuff[row][col] !== 0) {
    resultStr = text1[row - 1] + resultStr;
    row--;
    col--;
}

return resultStr;
}

// Manacher's Algorithm to find the longest palindromic substring
function manacherAlgorithm(text) {
const T = `#${text.split("").join("#")}#`;
const P = new Array(T.length).fill(0);
let center = 0,
    right = 0;
let maxLen = 0,
    centerIndex = 0;

for (let i = 1; i < T.length - 1; i++) {
    const mirror = 2 * center - i;
    if (right > i) P[i] = Math.min(right - i, P[mirror]);

    while (T[i + 1 + P[i]] === T[i - 1 - P[i]]) P[i]++;

    if (i + P[i] > right) {
    center = i;
    right = i + P[i];
    }

    if (P[i] > maxLen) {
    maxLen = P[i];
    centerIndex = i;
    }
}

const start = (centerIndex - maxLen) / 2;
return text.substring(start, start + maxLen);
}

export { KMPSearch, longestCommonSubstring, manacherAlgorithm };
