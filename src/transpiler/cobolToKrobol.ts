// src/transpiler/cobolToKrobol.ts
// Fonction de transpilation COBOL → Krobol

export function transpileCobolToKrobol(cobolCode: string): string {
  const cobolToKrobolMap: Record<string, string> = {
    "IDENTIFICATION DIVISION.": "ID:",
    "PROGRAM-ID.": "",
    "DATA DIVISION.": "DATA:",
    "WORKING-STORAGE SECTION.": "WS:",
    "PROCEDURE DIVISION.": "PROC:",
    "DISPLAY": "DISP:",
    "PERFORM": "PERF:",
    "MOVE": "MV:",
    "IF": "IF ",
    "ELSE": "ELSE",
    "END-IF.": "END-IF",
    "STOP RUN.": "STOP RUN",
    "ACCEPT": "ACCEPT:",
    "CALL": "CALL:",
    "USING": "",
    "OPEN": "OPEN:",
    "READ": "READ:",
    "WRITE": "WRITE:",
    "CLOSE": "CLOSE:",
    "PIC 9(5)": ":9(5)",
    "PIC X(30)": ":X(30)",
    "VALUE": "VALUE ",
    ">": "→",
  };

  let krobolCode = cobolCode;
  for (const [cobolToken, krobolToken] of Object.entries(cobolToKrobolMap)) {
    krobolCode = krobolCode.replace(new RegExp(cobolToken, "g"), krobolToken);
  }

  // Gestion des commentaires
  krobolCode = krobolCode.replace(/\*>.*/g, (match) => `# ${match.replace(">", "").trim()}`);

  return krobolCode;
}