import { API_KEY } from "../../config"

interface RequestQuestionTypes {
  prompt: string,
  tokens: number,
  temperature: number
  contextPreviousAnswers: string,
  signal: AbortSignal
}

export default {
  async requestQuestion({
    prompt,
    tokens,
    temperature,
    contextPreviousAnswers,
    signal
  }: RequestQuestionTypes) {
    
    return await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt + contextPreviousAnswers,
        max_tokens: tokens, // tamanho da resposta
        temperature: temperature, // criatividade na resposta
      }),
      signal
    })

  }
}
