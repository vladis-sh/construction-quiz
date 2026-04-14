const WORD_FORMS: { [key: string]: string[] } = {
  этаж: ["этаж", "этажа", "этажей"],
  спальня: ["спальня", "спальни", "спален"],
  комната: ["комната", "комнаты", "комнат"],
  ванная: ["ванная", "ванные", "ванных"],
  санузел: ["санузел", "санузла", "санузлов"],
};

export function pluralize(count: number, word: string): string {
  const forms = WORD_FORMS[word];

  if (!forms) {
    return word;
  }
  const abs = Math.abs(count) % 100;
  const lastChar = abs % 10;
  if (abs >= 11 && abs <= 19) {
    return `${count} ${forms[2]}`;
  }
  if (lastChar >= 2 && lastChar < 5) {
    return `${count} ${forms[1]}`;
  }
  if (lastChar == 1) {
    return `${count} ${forms[0]}`;
  }
  return `${count} ${forms[2]}`;
}
