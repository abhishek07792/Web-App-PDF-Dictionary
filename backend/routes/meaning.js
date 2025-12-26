const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, // 🔑 OpenRouter key
  baseURL: "https://openrouter.ai/api/v1", // 🔁 OpenRouter endpoint
  defaultHeaders: {
    "HTTP-Referer": "http://localhost", // required
    "X-Title": "Meaning API", // your app name
  },
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { text } = req.body;

  try {
    const response = await openai.chat.completions.create({
      // ✅ Free / freemium OpenRouter model
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [
        {
          role: "user",
          content: `Explain this in simple words:\n"${text}"`,
        },
      ],
    });

    res.json({
      meaning: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

module.exports = router;
