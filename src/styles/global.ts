import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
:root {
  --font-size: 18px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body,
html, 
#root {
  width: 100%;
  height: 100%;
  font-size: var(--font-size);
  background: ${props => props.theme.colors.bg.body};
  color: ${props => props.theme.colors.text.title};
}

textarea,
button {
  border: none;
  outline: none;
  resize: none;
}

button {
  cursor: pointer;

  &:active {
    transform: scale(.95);
  }
}

i {
  vertical-align: 0;
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