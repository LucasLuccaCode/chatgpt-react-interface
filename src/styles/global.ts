import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body,
html, 
#root {
  width: 100%;
  height: 100%;
  font-size: 18px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
}

textarea,
button {
  border: none;
  outline: none;
  resize: none;
}

button {
  cursor: pointer;
}

li {
  list-style: none;
}

.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
`