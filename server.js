
import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

const apiKey = process.env.OPENAI_API_KEY;
const client = apiKey ? new OpenAI({ apiKey }) : null;

app.post("/api/chat", async (req, res) => {
  try {
    if (!client) {
      return res.status(503).json({
        error: "O cérebro ainda não foi ativado. Configure OPENAI_API_KEY no servidor."
      });
    }

    const { messages = [], name = "Marco", personality = "amigável" } = req.body;

    const cleanMessages = messages
      .filter(m => m && typeof m.text === "string")
      .slice(-20)
      .map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text.slice(0, 12000)
      }));

    const instructions = `
Você é MilBra, um assistente de IA moderno, inteligente e amigável.
Seu usuário se chama ${name || "Marco"}.
Personalidade escolhida: ${personality || "amigável"}.
Responda em português do Brasil, salvo quando o usuário pedir outro idioma.
Se o usuário for criança, explique de forma simples, segura e apropriada para a idade.
Não diga que é o ChatGPT; seu nome no aplicativo é MilBra.
Se não souber algo, diga claramente.
`;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      instructions,
      input: cleanMessages,
      max_output_tokens: 1200
    });

    res.json({ reply: response.output_text || "Não consegui formar uma resposta agora." });
  } catch (err) {
    console.error(err);
    const message =
      err?.status === 401 ? "A chave da IA não foi aceita." :
      err?.status === 429 ? "O limite da IA foi atingido. Tente novamente em instantes." :
      "O MilBra teve um problema ao falar com a IA.";
    res.status(500).json({ error: message });
  }
});

app.get("/api/status", (_req, res) => {
  res.json({
    brainConnected: Boolean(apiKey),
    model: process.env.OPENAI_MODEL || "gpt-5.6-luna"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MilBra 3.0 rodando em http://localhost:${port}`);
  console.log(apiKey ? "Cérebro de IA: CONECTADO" : "Cérebro de IA: aguardando OPENAI_API_KEY");
});
