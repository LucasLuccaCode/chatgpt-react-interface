const root = document.documentElement
const menu = document.querySelector('[data-menu]')
const addChatBtn = document.querySelector('[data-add-chat]')

const main = document.querySelector('[data-main]')

const statusProgress = document.querySelector('[data-status-progress]')
const statusStopBtn = document.querySelector('[data-status-stop]')
const askForm = document.querySelector('[data-ask-form]')
const questionEntry = document.querySelector('[data-question-entry]')

const settingsBlur = document.querySelector('[data-settings-blur]')
const settingsForm = document.querySelector('[data-settings]')
const inputsSettings = document.querySelectorAll('[data-settings] input')
const closeSettingsBtn = document.querySelector('[data-settings-close]')
const fontSizeValue = document.querySelector('[data-font_size-value]')
const temperatureValue = document.querySelector('[data-temperature-value]')

const footer = document.querySelector('[data-footer]')

let chats = []
let currentChat = {}
let currentChatNumber = 0
let settings = {}

const API_KEY = "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"
let isPrinting = false
let controller = null

const initialSettings = {
  font_size: 18,
  max_tokens: 2050,
  rendering_speed: 40,
  temperature: 0.6,
  save_context: false,
  save_queries: true
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
      fontSizeValue.textContent = value
    }
  })
}
loadSettingsStorage()

const createElement = (element, className, textContent) => {
  const el = document.createElement(element)

  if (className && className.includes(' ')) {
    className.split(' ').forEach(c => el.classList.add(c))
  } else {
    className && el.classList.add(className)
  }

  if (textContent) el.textContent = textContent

  return el
}

const generateCurrentChatHtml = () => {
  const questionsAndAnswersTags = currentChat.data.reduce((acc, { question, answer }) => {
    answer = answer.replace(/^.?\n\n/, 'Chat GPT:\n\n');

    const questionContainer = createElement('div', 'c-responses__question')
    const questionMessage = createElement('h3', null, question)
    questionContainer.innerHTML = '<i class="bi bi-send-fill"></i>'
    questionContainer.appendChild(questionMessage)

    const answerTag = createElement('pre', 'c-responses__response', answer)

    acc = [...acc, questionContainer, answerTag]
    return acc
  }, [])

  return questionsAndAnswersTags
}

const renderCurrentChat = () => {
  main.innerHTML = ""

  const responsesContainer = createElement('ul', 'c-responses')
  responsesContainer.setAttribute('data-responses', '')

  const responsesTags = generateCurrentChatHtml()

  responsesContainer.append(...responsesTags)
  main.appendChild(responsesContainer)

  main.scrollTop = main.scrollHeight;
}

const generateChatsHtml = chats => {
  const cardsTag = chats.map((chat, index) => {
    const title = chat.title || chat.data[0].question

    const card = createElement('li', 'c-chats__card')
    card.setAttribute('data-chat', index)

    const titleEl = createElement('h3', 'c-chats__card__title nowrap', title)
    titleEl.setAttribute('data-chat-title', '')

    const actions = createElement('div', 'c-chats__card__actions')

    const editBtn = createElement('button')
    editBtn.setAttribute('data-edit', index)
    editBtn.innerHTML = "<i class='bi bi-pencil-fill' />"

    const deleteBtn = createElement('button')
    deleteBtn.setAttribute('data-delete', index)
    deleteBtn.innerHTML = "<i class='bi bi-trash-fill' />"

    actions.append(editBtn, deleteBtn)
    card.append(titleEl, actions)

    return card
  })

  return cardsTag
}

function debounce(func, delay) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
      timerId = null;
    }, delay);
  };
}


const handleChatClick = ({ target: el }) => {
  const key = Object.keys(el.dataset)[0]
  const id = el.dataset[key]

  if (!key) return

  const chatEl = document.querySelector(`[data-chat='${id}']`)

  const allowedActions = {
    chat() {
      footer.classList.remove('hide')
      questionEntry.focus()

      currentChatNumber = id
      currentChat = chats[currentChatNumber]

      renderCurrentChat()
    },
    delete() {
      chats.splice(id, 1)

      const chatEl = document.querySelector(`[data-chat='${id}']`)
      chatEl.remove()

      saveDataStorage()
    },
    edit() {
      const title = chatEl.querySelector('[data-chat-title]')
      const editBtn = chatEl.querySelector('[data-edit]')

      title.classList.add('editing')
      title.contentEditable = true
      title.focus()

      editBtn.removeAttribute('data-edit')
      editBtn.setAttribute('data-save', id)
      editBtn.innerHTML = '<i class="bi bi-check-lg"></i>'

      title.addEventListener("blur", debounce(() => {
        title.contentEditable = false
        title.classList.remove('editing')

        editBtn.removeAttribute('data-save')
        editBtn.setAttribute('data-edit', id)
        editBtn.innerHTML = "<i class='bi bi-pencil-fill' />"
      }, 100))
    },
    save() {
      const title = chatEl.querySelector('[data-chat-title]')

      const oldTitle = chats[id].title
      const newTitle = title.textContent

      if (newTitle !== oldTitle) {
        chats[currentChatNumber].title = newTitle
        currentChat.title = newTitle

        saveDataStorage()
      }
    }
  }

  const fn = allowedActions[key]
  fn && fn()
}


const renderLoadedChats = () => {
  const chatsContainer = createElement('ul', 'c-chats')
  chatsContainer.addEventListener('click', handleChatClick)

  const cardsTag = generateChatsHtml(chats)

  chatsContainer.append(...cardsTag)
  main.appendChild(chatsContainer)
}

const loadDataStorage = () => {
  chats = JSON.parse(localStorage.getItem("@mr:chatGPT:chats")) || []

  !!chats.length && renderLoadedChats()
}
settings.save_queries && loadDataStorage()

const saveDataStorage = () => {
  const dataJson = JSON.stringify(chats)
  localStorage.setItem("@mr:chatGPT:chats", dataJson)
}

const sendQuestion = async (question) => {
  const responses = document.querySelector('[data-responses]')

  const questionContainer = createElement('div', 'c-responses__question')
  const questionMessage = createElement('h3', null, question)
  questionContainer.innerHTML = '<i class="bi bi-send-fill"></i>'
  questionContainer.appendChild(questionMessage)

  responses.appendChild(questionContainer)
  main.scrollTop = main.scrollHeight

  statusStopBtn.classList.remove('hide')
  statusProgress.textContent = "Aguardando resposta da api..."

  const jsonResponse = await fetchAPI(question)

  if (!jsonResponse) return

  const hasError = jsonResponse.error?.message
  if (!!hasError) {
    statusProgress.textContent = 'Erro ao fazer consulta, tente mais tarde.'
    statusStopBtn.classList.add('hide')

    const h2 = createElement('h2', 'c-responses__response--error', jsonResponse.error.message)
    responses.appendChild(h2)
    responses.scrollTop = responses.scrollHeight;
    return
  }

  const hasText = jsonResponse.choices?.[0].text
  if (!!hasText) {
    const text = hasText

    writeText(text)

    if (settings.save_queries) {
      currentChat.data.push({
        question,
        answer: text
      })

      if (!currentChat.title) {
        currentChat.title = question
      }

      saveDataStorage()
      console.log('Salvando queries')
    }

    return
  }

  writeText("Sem resposta")
}

const fetchAPI = async (question) => {
  try {
    const context = settings.save_context
      ? currentChat.data.map(({ answer }) => answer)?.join('')
      : ''

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
        prompt: question + context,
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
      statusProgress.textContent = 'Erro ao fazer a requisição, tente mais tarde.'
      console.error('Erro ao fazer a requisição:', error);
    }
    statusStopBtn.classList.add('hide')
  } finally {
    questionEntry.value = "";
    questionEntry.disabled = false;
    questionEntry.focus();
  }
}

const sleep = (ms) => new Promise(res => setInterval(res, ms))


const writeText = async (text) => {
  text = text.replace(/^.?\n\n/, 'Chat GPT:\n\n');

  const responses = document.querySelector('[data-responses]')

  const classResponse = text === 'Sem resposta' ? 'c-responses__response--error' : 'c-responses__response'
  const responseEl = createElement('pre', classResponse)
  responses.appendChild(responseEl)

  isPrinting = true
  for (let i = 0; i < text.length; i++) {
    const hasText = responseEl.textContent
    responseEl.textContent = hasText ? hasText + text[i] : text[i];

    statusProgress.textContent =
      `Respondendo [ ${i + 1} / ${text.length}  ] ${Math.floor((i + 1) / text.length * 100)}%`;

    main.scrollTop = main.scrollHeight

    if (!isPrinting) {
      statusProgress.textContent = "Renderização parada..."
      return
    }

    await sleep(settings.rendering_speed)
  }

  isPrinting = false

  statusProgress.textContent = `[ ${text.length} / ${text.length}  ] 100%`

  statusStopBtn.classList.add('hide')
}

const showHideBlurSettings = () => {
  settingsBlur.classList.toggle('active')
}

menu.addEventListener('click', showHideBlurSettings)

const handleForm = (e) => {
  e.preventDefault()

  const question = questionEntry.value.trim()

  if (!question) return

  const placeholder = document.querySelector('.placeholder')
  placeholder && placeholder.remove()

  sendQuestion(question)
  questionEntry.value = ""
}

askForm.addEventListener('submit', handleForm)

const handleStopRequest = () => {
  isPrinting = false
  controller.abort();
  statusProgress.textContent = "Requisição parada...";
  statusStopBtn.classList.add('hide')
}

statusStopBtn.addEventListener('click', handleStopRequest)

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
      fontSizeValue.textContent = size
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

closeSettingsBtn.addEventListener('click', handleCloseClick);

const handleAddChat = () => {
  chats.unshift({
    title: null,
    data: []
  })

  currentChatNumber = 0
  currentChat = chats[currentChatNumber]

  main.innerHTML = `<p class="placeholder">Faça uma pergunta para exibir aqui a resposta...</p>`

  const responsesContainer = createElement('ul', 'c-responses')
  responsesContainer.setAttribute('data-responses', '')
  main.appendChild(responsesContainer)

  footer.classList.remove('hide')
  questionEntry.value = ''
  questionEntry.focus()
}

addChatBtn.addEventListener('click', handleAddChat)