// src/docs/llmIntegration.ts
// Intégration avec un LLM pour générer de la documentation

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateDocumentation(krobolCode: string, programName: string): Promise<string> {
  const prompt = `
Génère une rétrodocumentation structurée pour ce code Krobol en suivant ce format :

---
# **Rétrodocumentation : ${programName}**

## **Description Générale**
[Une phrase décrivant le rôle du programme.]

---
## **Variables et Structures de Données**
| Nom          | Type       | Description                     | Valeur Initiale |
|--------------|------------|---------------------------------|-----------------|
| [Variable]   | [Type]     | [Description]                   | [Valeur]        |

---
## **Logique Principale**
### **Paragraphe : [Nom du Paragraphe]**
- **Rôle** : [Description du rôle]
- **Logique** :
  - [Étape 1]
  - [Étape 2]
  - [Condition si applicable]
    - Action si vraie
    - Action sinon

---
## **Diagramme de Flux**
\`\`\`mermaid
flowchart TD
    A[Début] --> B[Étape 1]
    B --> C{Condition}
    C -->|Vrai| D[Action 1]
    C -->|Faux| E[Action 2]
    D --> F[Fin]
    E --> F
\`\`\`

---
## **Remarques Importantes**
- [Liste des points à surveiller ou des exceptions]

---
**Code Krobol à documenter :**
\`\`\`
${krobolCode}
\`\`\`
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3, // Moins créatif, plus structuré
  });

  return response.choices[0].message.content;
}