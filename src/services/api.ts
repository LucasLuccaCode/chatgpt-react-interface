interface CreateCompletionTypes {
  prompt: string,
  tokens: number,
  temperature: number
  contextPreviousAnswers: string,
  signal: AbortSignal
}

export const api = {
  async createCompletion({
    prompt,
    tokens,
    temperature,
    contextPreviousAnswers,
    signal
  }: CreateCompletionTypes) {

    return await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
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
