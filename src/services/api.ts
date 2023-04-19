import axios from "./axios"

interface CreateCompletionProps {
  prompt: string,
  tokens: number,
  temperature: number
  signal: AbortSignal
}

export const api = {
  async createCompletion({
    prompt,
    tokens,
    temperature,
    signal
  }: CreateCompletionProps) {

    return await axios.post("/completions", {
      body: {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: tokens, // tamanho da resposta
        temperature: temperature, // criatividade na resposta
      },
      signal
    })

  }
}
