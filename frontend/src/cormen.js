const axios = require("axios");
require("dotenv").config();

const Groq = require("groq-sdk");

// Confirm if the key is loaded:
if (!process.env.GROQ_API_KEY || !process.env.MURF_API_KEY) {
  console.error("❌ Missing API keys!");
  process.exit(1);
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  try {
    // Step 1: Get the text from Groq
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Explain the importance of fast language models (the content should be within 2500 charcters and in the form of narration)",
        },
      ],
      model: "llama3-70b-8192",
    });

    const generatedText = completion.choices[0]?.message?.content || "";
    console.log("✅ GROQ Response:", generatedText);

    // Step 2: Send the text to Murf for audio generation
    const murfPayload = {
      voice_id: "de-DE-björn",
      style: "Narration",
      multiNativeLocale: "en-US",
      text: generatedText,
    };

    const response = await axios.post("https://api.murf.ai/v1/speech/generate", murfPayload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": process.env.MURF_API_KEY,
      },
    });

    console.log("🔊 Audio File URL:", response.data.audioFile);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

main();
