const c_responses = document.querySelector('.c-responses')
const placeholder = document.querySelector('.placeholder')
const progressElem = document.querySelector(".c-status__progress")
const stopBtn = document.querySelector(".c-status__stop")
const form = document.querySelector('.c-form')
const questionEntry = document.querySelector('.c-form textarea')

let currentQuestion = null
let currentAnswer = null
let questionsAndAnswers = []

const API_KEY = "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"
const renderingSpeed = 40
const maxTokens = 2048
const temperature = 0.6
let isPrinting = false
let controller = null

const createElement = (element, className, textContent) => {
  const el = document.createElement(element)
  el.classList.add(className)
  el.textContent = textContent
  return el
}

const renderLoadedData = () => {
  const tags = questionsAndAnswers.reduce((acc, { question, answer }) => {
    answer = answer.replace(/^(\n)+/g, '');

    const questionTag = createElement('h2', 'question', question)
    questionTag.innerHTML = '<img src="./assets/img/send.png" alt="Ícone para enviar pergunta"></img>' + questionTag.textContent
    const responseTag = createElement('pre', 'response', `Chat GPT:\n\n${answer}`)

    acc = [...acc, questionTag, responseTag]
    return acc
  }, [])

  c_responses.append(...tags)
}

const loadDataStorage = () => {
  const data = JSON.parse(localStorage.getItem("@mr:chatGPT")) || []

  questionsAndAnswers = data
  if (data.length) {
    renderLoadedData()
  } else {
    c_responses.innerHTML = '<p class="placeholder">Faça uma pergunta para exibir aqui a resposta...</p>'
  }
  c_responses.scrollTop = c_responses.scrollHeight;
}
loadDataStorage()

const saveDataStorage = () => {
  const dataJson = JSON.stringify(questionsAndAnswers)

  localStorage.setItem("@mr:chatGPT", dataJson)
}

const sendQuestion = async (question) => {
  const h2 = createElement('h2', 'question', question)
  h2.innerHTML = '<img src="./assets/img/send.png" alt="Ícone para enviar pergunta"></img>' + h2.textContent

  c_responses.appendChild(h2)

  c_responses.scrollTop = c_responses.scrollHeight;

  stopBtn.classList.remove('hide')
  progressElem.textContent = "Aguardando resposta da api..."

  const jsonResponse = await fetchAPI(question)

  if (!jsonResponse) return

  if (jsonResponse.error?.message) {
    const h2 = createElement('h2', 'response', jsonResponse.error.message)
    c_responses.appendChild(h2)
    return
  }

  if (jsonResponse.choices?.[0].text) {
    const text = jsonResponse.choices[0].text

    writeText(text)

    questionsAndAnswers.push({
      question,
      answer: text
    })
    saveDataStorage()

    return
  }

  writeText("Sem resposta")
}

const fetchAPI = async (question) => {
  try {
    controller = new AbortController();
    const signal = controller.signal;

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
      signal
    })

    return response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('A requisição foi interrompida.');
    } else {
      console.error('Erro ao fazer a requisição:', error);
    }
  } finally {
    questionEntry.value = "";
    questionEntry.disabled = false;
    questionEntry.focus();
  }
}

const sleep = (ms) => new Promise(res => setInterval(res, ms))

const writeText = async (text) => {
  text = text.replace(/^(\n)+/g, '');

  const responseElem = createElement('pre', 'response', "Chat GPT:\n\n")
  c_responses.appendChild(responseElem)

  isPrinting = true
  for (let i = 0; i < text.length; i++) {
    const hasText = responseElem.textContent
    responseElem.textContent = hasText ? hasText + text[i] : text[i];

    progressElem.textContent =
      `Respondendo [ ${i + 1} / ${text.length}  ] ${Math.floor((i + 1) / text.length * 100)}%`;

    c_responses.scrollTop = c_responses.scrollHeight;

    if (!isPrinting) {
      progressElem.textContent = "Renderização parada..."
      return
    }

    await sleep(renderingSpeed)
  }

  isPrinting = false

  progressElem.textContent = `[ ${text.length} / ${text.length}  ] 100%`

  stopBtn.classList.add('hide')
}

const handleForm = (e) => {
  e.preventDefault()

  const question = questionEntry.value.trim()

  if (!question) return

  placeholder && placeholder.remove()

  sendQuestion(question)
  questionEntry.value = ""
}

form.addEventListener('submit', handleForm)

const handleStopRequest = () => {
  isPrinting = false
  controller.abort();
  progressElem.textContent = "Requisição parada...";
  stopBtn.classList.add('hide')
}

stopBtn.addEventListener('click', handleStopRequest)