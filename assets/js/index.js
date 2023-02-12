const c_responses = document.querySelector('.c-responses')
const placeholder = document.querySelector('.placeholder')
const form = document.querySelector('.c-form')
const questionEntry = document.querySelector('.c-form textarea')

const handleForm = (e) => {
  e.preventDefault()

  const question = questionEntry.value.trim()

  if (!question) return

  placeholder.remove()

  sendQuestion(question)
  questionEntry.value = ""
}

const sendQuestion = (question) => {
  c_responses.innerHTML += `<h2 class="question">${question}</h2>`;
  c_responses.scrollTop = c_responses.scrollHeight;



}

form.addEventListener('submit', handleForm)