const c_responses = document.querySelector('.c-responses')
const placeholder = document.querySelector('.placeholder')
const form = document.querySelector('.c-form')
const questionEntry = document.querySelector('.c-form textarea')

const API_KEY = "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"
const renderingSpeed = 50
const isPrinting = false
const maxTokens = 2048
const temperature = 0.6

const handleForm = (e) => {
  e.preventDefault()

  const question = questionEntry.value.trim()

  if (!question) return

  placeholder.remove()

  sendQuestion(question)
  questionEntry.value = ""
}

const createElement = (element, className, textContent) => {
  const el = document.createElement(element)
  el.classList.add(className)
  el.textContent = textContent
  return el
}

const sendQuestion = async (question) => {
  const h2 = createElement('h2', 'question', question)
  c_responses.appendChild(h2)

  c_responses.scrollTop = c_responses.scrollHeight;

  const jsonResponse = await fetchAPI(question)

  if (!jsonResponse) return

  if (jsonResponse.error?.message) {
    const h2 = createElement('h2', 'error', jsonResponse.error.message)
    c_responses.appendChild(h2)
    return
  }

  if (jsonResponse.choices?.[0].text) {
    const text = jsonResponse.choices[0].text
    console.log(text)
    return
  }

  console.log("Sem resposta")
}

const fetchAPI = async (question) => {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: maxTokens, // tamanho da resposta
        temperature: temperature, // criatividade na resposta
      }),
    })

    return response.json()
  } catch (error) {
    console.log(error)
  } finally {
    questionEntry.value = "";
    questionEntry.disabled = false;
    questionEntry.focus();
  }
}

form.addEventListener('submit', handleForm)