// src/transpiler/krobolToCobol.ts
// Fonction de transpilation Krobol → COBOL

export function transpileKrobolToCobol(krobolCode: string): string {
  const krobolToCobolMap: Record<string, string> = {
    "ID:": "IDENTIFICATION DIVISION.\nPROGRAM-ID. ",
    "DATA:": "DATA DIVISION.\n",
    "WS:": "WORKING-STORAGE SECTION.\n",
    "PROC:": "PROCEDURE DIVISION.\n",
    "DISP:": "DISPLAY ",
    "PERF:": "PERFORM ",
    "MV:": "MOVE ",
    "IF ": "IF ",
    "ELSE": "ELSE",
    "END-IF": "END-IF.",
    "STOP RUN": "STOP RUN.",
    "ACCEPT:": "ACCEPT ",
    "CALL:": "CALL ",
    "OPEN:": "OPEN ",
    "READ:": "READ ",
    "WRITE:": "WRITE ",
    "CLOSE:": "CLOSE ",
    "#": "*> ",
  };

  let cobolCode = krobolCode;
  for (const [krobolToken, cobolToken] of Object.entries(krobolToCobolMap)) {
    cobolCode = cobolCode.replace(new RegExp(krobolToken, "g"), cobolToken);
  }

  // Nettoyage et formatage
  cobolCode = cobolCode
    .replace(/:/g, " ")
    .replace(/(\w+)(\s|$)/g, "$1.")
    .replace(/(\w+)\./g, "$1.\n");

  return cobolCode;
}