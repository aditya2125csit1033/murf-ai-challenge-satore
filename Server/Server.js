const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 

console.log("API Key:", process.env.YOUR_API_KEY); 

const { Groq } = require("groq-sdk");
const axios = require("axios");
const express = require("express");
const cors = require("cors");

const murfKey = process.env.MURF_API_KEY;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

const mentorTraits = {
  sage: "Use poetic, timeless language with a calm, reflective tone.",
  reformer: "Be direct, passionate, and fiery. Inspire change.",
  creator: "Speak with vivid imagination and optimism.",
  healer: "Respond with warmth, emotional depth, and care.",
  companion: "Be playful, casual, yet supportive — like a close friend."
};

const voiceSettings = {
  sage: { voice_id: "de-DE-björn", style: "Conversational", multiNativeLocale: "en-US" },
  reformer: { voice_id: "en-US-terrell", style: "Inspirational" },
  healer: { voice_id: "en-UK-ruby", style: "Calm", multiNativeLocale: "en-US" },
  creator: { voice_id: "en-US-carter", style: "Calm" },
  companion: { voice_id: "en-UK-juliet", style: "Conversational", multiNativeLocale: "en-US" }
};

app.post("/voiceControl", async (req, res) => {
  try {
    const { prompt, mentor } = req.body;

    if (!prompt || !mentor) {
      return res.status(400).json({ error: "Missing prompt or mentor." });
    }

    const mentorName = mentor.charAt(0).toUpperCase() + mentor.slice(1).toLowerCase(); // e.g., "Sage"
    const style = mentorTraits[mentor.toLowerCase()] || "Speak with compassion and clarity.";

    const finalPrompt = `
You are ${mentorName}, a wise, compassionate mentor. ${style}

Speak directly as ${mentorName}. Avoid generic AI language. Keep your response under 2500 characters.

User says: "${prompt}"

${mentorName}, your response:
    `.trim();

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: finalPrompt }
      ],
      model: "llama3-70b-8192" 
    });

    const revisedPrompt = completion.choices[0].message.content.slice(0, 2500); 

    const murfPayload = {
      ...voiceSettings[mentor.toLowerCase()],
      text: revisedPrompt
    };

    const response = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      murfPayload,
      {
        headers: {
          "api-key": murfKey,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    res.json({ audioFile: response.data.audioFile, text: revisedPrompt });

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong in voice generation." });
  }
});

app.listen(5000, () => {
  console.log("✅ Server is running on port 5000");
});


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});