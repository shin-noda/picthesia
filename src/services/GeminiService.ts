// /services/GeminiService.ts
export class GeminiService {
  static async getFusionWord(word1: string, word2: string): Promise<string | undefined> {
    try {
      const prompt = `
Please only provide a single word as the answer to the ? part.
Do NOT provide explanations or additional text.
If the question is truly inappropriate or unsafe, respond with N/A.

Question: ${word1} + ${word2} = ?
`.trim();

      const res = await fetch("https://picthesia-backend.vercel.app/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        console.error("GeminiService: Failed to fetch fusion word, status:", res.status);
        return undefined;
      }

      const data = await res.json();

      // Debugging
      // console.log(`GeminiService: answer received for "${word1} + ${word2}":`, data.answer);
      return data.answer;
    } catch (err) {
      console.error("GeminiService error:", err);
      return undefined;
    }
  }
}