const BREAKABLE_SPACE_PATTERN = /[ \t\r\n\f\v]+/g;
const SINGLE_LETTER_WORD_PATTERN = /\b([AaI]) (?=\S)/g;
const FINAL_WORD_PAIR_PATTERN = /(\S+) (\S+)$/;

export function preventTextOrphans(text: string) {
  return text
    .replace(BREAKABLE_SPACE_PATTERN, " ")
    .replace(SINGLE_LETTER_WORD_PATTERN, "$1\u00a0")
    .replace(FINAL_WORD_PAIR_PATTERN, "$1\u00a0$2");
}

export function splitTypographicWords(text: string) {
  return preventTextOrphans(text).trim().split(BREAKABLE_SPACE_PATTERN).filter(Boolean);
}
