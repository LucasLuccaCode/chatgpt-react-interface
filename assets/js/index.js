const root = document.documentElement
const menu = document.querySelector('[data-menu]')
const blur = document.querySelector('[data-settings-blur]')
const responses = document.querySelector('.c-responses')
const progressElem = document.querySelector(".c-status__progress")
const stopBtn = document.querySelector(".c-status__stop")
const form = document.querySelector('.c-form')
const questionEntry = document.querySelector('.c-form textarea')

const settingsForm = document.querySelector('[data-settings]')
const inputsSettings = settingsForm.querySelectorAll('input')
const temperatureValue = document.querySelector('[data-temperature-value]')
const closeBtn = document.querySelector('[data-settings-close]')
let placeholder = null

let currentQuestion = null
let currentAnswer = null
let questionsAndAnswers = []
let settings = {}

const API_KEY = "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"
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

  responses.append(...tags)
}

const loadDataStorage = () => {
  const data = JSON.parse(localStorage.getItem("@mr:chatGPT")) || []

  questionsAndAnswers = data
  if (data.length) {
    renderLoadedData()
  } else {
    placeholder = createElement('p', 'placeholder', 'Faça uma pergunta para exibir aqui a resposta...')
    responses.appendChild(placeholder)
  }
  responses.scrollTop = responses.scrollHeight;
}
loadDataStorage()

const initialSettings = {
  font_size: 18,
  max_tokens: 2050,
  rendering_speed: 40,
  temperature: 0.6,
  save_context,
  save_queries
}

const loadSettingsStorage = () => {
  settings = JSON.parse(localStorage.getItem("@mr:chatGPT:settings")) || initialSettings

  const keys = Object.keys(settings)
  keys.forEach(key => {
    const isCheckbox = typeof settings[key] === 'boolean'
    if (isCheckbox) {
      document.getElementById(key).checked = settings[key]
      return
    }

    // number and radio input
    const value = settings[key]
    document.getElementById(key).value = value

    if (key === 'temperature') {
      const temperature = value
      temperatureValue.textContent = temperature.toFixed(1)
    }

    if (key === 'font_size') {
      root.style.setProperty('--font-size', `${value}px`)
    }
  })
}
loadSettingsStorage()

const saveDataStorage = () => {
  const dataJson = JSON.stringify(questionsAndAnswers)

  localStorage.setItem("@mr:chatGPT", dataJson)
}

const sendQuestion = async (question) => {
  const h2 = createElement('h2', 'question', question)
  h2.innerHTML = '<img src="./assets/img/send.png" alt="Ícone para enviar pergunta"></img>' + h2.textContent

  responses.appendChild(h2)

  responses.scrollTop = responses.scrollHeight;

  stopBtn.classList.remove('hide')
  progressElem.textContent = "Aguardando resposta da api..."

  const jsonResponse = await fetchAPI(question)

  if (!jsonResponse) return

  if (jsonResponse.error?.message) {
    progressElem.textContent = 'Erro ao fazer consulta, tente mais tarde.'
    stopBtn.classList.add('hide')

    const h2 = createElement('h2', 'response', jsonResponse.error.message)
    responses.appendChild(h2)
    responses.scrollTop = responses.scrollHeight;
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
        max_tokens: settings.max_tokens, // tamanho da resposta
        temperature: settings.temperature, // criatividade na resposta
      }),
      signal
    })

    return response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('A requisição foi interrompida.');
    } else {
      progressElem.textContent = 'Erro ao fazer a requisição, tente mais tarde.'
      console.error('Erro ao fazer a requisição:', error);
    }
    stopBtn.classList.add('hide')
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
  responses.appendChild(responseElem)

  isPrinting = true
  for (let i = 0; i < text.length; i++) {
    const hasText = responseElem.textContent
    responseElem.textContent = hasText ? hasText + text[i] : text[i];

    progressElem.textContent =
      `Respondendo [ ${i + 1} / ${text.length}  ] ${Math.floor((i + 1) / text.length * 100)}%`;

    responses.scrollTop = responses.scrollHeight;

    if (!isPrinting) {
      progressElem.textContent = "Renderização parada..."
      return
    }

    await sleep(settings.rendering_speed)
  }

  isPrinting = false

  progressElem.textContent = `[ ${text.length} / ${text.length}  ] 100%`

  stopBtn.classList.add('hide')
}

const showHideBlurSettings = () => {
  blur.classList.toggle('active')
}

menu.addEventListener('click', showHideBlurSettings)

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

const handleSettingsForm = (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)
  const {
    font_size,
    max_tokens,
    rendering_speed,
    temperature,
    save_context,
    save_queries
  } = Object.fromEntries(formData)

  const updatedData = {
    font_size: Number(font_size),
    max_tokens: Number(max_tokens),
    rendering_speed: Number(rendering_speed),
    temperature: Number(temperature),
    save_context: !!save_context,
    save_queries: !!save_queries
  }

  settings = updatedData

  const settingsJson = JSON.stringify(updatedData)

  localStorage.setItem("@mr:chatGPT:settings", settingsJson)

  showHideBlurSettings()
}


settingsForm.addEventListener('submit', handleSettingsForm)

const handleInputsSettings = ({ target: el }) => {
  const name = el.getAttribute('name')

  const allowedSettings = {
    font_size: () => {
      const size = el.value
      root.style.setProperty('--font-size', `${size}px`)
    },
    temperature: () => {
      const newValue = Number(el.value)
      temperatureValue.textContent = newValue.toFixed(1)
    },
    save_context: () => {
      el.checked && console.log('O contexto das do chat será enviado nas requisições futuras.')
    },
    save_queries: () => {
      el.checked && console.log('As consultas serão salvas.')
    }
  }

  const fn = allowedSettings[name]
  fn && fn()
}

inputsSettings.forEach(input =>
  input.addEventListener('change', handleInputsSettings))

const handleCloseClick = (e) => {
  e.preventDefault()

  loadSettingsStorage()
  showHideBlurSettings()
}

closeBtn.addEventListener('click', handleCloseClick);