# ChatGPT React Interface

Este projeto é uma interface em React para consumir a API do ChatGPT, utilizando TypeScript e Styled Components. A API do ChatGPT é uma API de processamento de linguagem natural (NLP) que permite a criação de chatbots.

![Preview](https://github.com/LucasLuccaCode/chatgpt-react-interface/blob/react/.github/preview.png)

## Como utilizar

Clone este repositório:

```
git clone https://github.com/LucasLuccaCode/chatgpt-react-interface.git
```

Navegue para a pasta do projeto:

```
cd chatgpt-react-interface
```

Instale as dependências:

```
yarn install 

ou

npm install
```

Crie um arquivo `.env.local` na raiz do projeto, com sua chave de autorização para a API do ChatGPT. A chave pode ser obtida através do site da [OpenAI](https://platform.openai.com/account/api-keys).


```js
VITE_APP_API_KEY=sua-chave-api
```

Em seguida, execute o comando para iniciar o projeto:
 
```
yarn start

ou

npm start
```

## Principais funcionalidades

- Perguntas e Respostas
- Chats
- Contexto contendo respostas anteriores do chat(experimental)
- Temas(Dark - Light)
- Redimensionamento dos textos e espaços

## Extra

Para acessar a versão do projeto onde utilizei apenas JavaScript puro, mude para a branch main no terminal com o comando: `git checkout main`

## Tecnologias e serviços usados

- ReactJs
- Typescript
- Styled-component
- OpenAI(Api do ChatGPT)