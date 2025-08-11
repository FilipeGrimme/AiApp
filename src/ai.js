import { InferenceClient } from "@huggingface/inference";

const accessToken = import.meta.env.VITE_HF_ACCESS_TOKEN;

//Checks to see if the token is working
if (!accessToken) {
  console.log("Hugging Face access token (VITE_HF_ACCESS_TOKEN) is missing from environment variables.");
}

const hf = new InferenceClient(accessToken);

const SYSTEM_PROMPT = `You are a helpful, concise assistant. 
Answer clearly, and use markdown to make it easier to render to a web page.`;

export async function getAIReply(prompt, opts = {}) {

  //Model specificaitons
  const {
    model = "meta-llama/Meta-Llama-3-8B-Instruct",
    max_tokens = 1024,
    temperature = 0.2,
  } = opts;

  //Messages
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: prompt },
  ];

  try {
    //Response
    const resp = await hf.chatCompletion({
      model,
      messages,
      max_tokens,
      temperature,
    });

    return resp?.choices?.[0]?.message?.content ?? "";

  } catch (err) {
    console.error("HF error:", err);
    return "Sorry, I couldn't generate a response right now.";
  }
}