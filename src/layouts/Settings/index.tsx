import React, { ChangeEvent, useCallback, useState } from "react"
import {
  SettingsContainer,
  Form,
  Division,
  Wrapper,
  Control,
  Buttons,
  Button,
  Label,
  InputRange,
  InputToggle,
} from "./styles"

interface ISettings {
  size: number,
  temperature: number,
  tokens: number,
  speed: number,
  darkTheme: boolean,
  queries: boolean,
  contexts: boolean
}

interface MyObject {
  [key: string]: number | boolean;
}

const initialSettings: ISettings = {
  size: 18,
  temperature: 0.6,
  tokens: 2050,
  speed: 40,
  darkTheme: true,
  queries: true,
  contexts: false
}

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState<ISettings>(initialSettings)

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const name: unknown = input.getAttribute('name')

    if(typeof name !== 'string') return

    const inputsCheckbox = ['darkTheme', 'contexts', 'queries']

    let obj: MyObject;

    const isCheckbox = inputsCheckbox.includes(name)
    obj = isCheckbox ? { [name]: input.checked } : { [name]: Number(input.value) }

    setSettings(prevState => ({ ...prevState, ...obj }))
  }, [])

  return (
    <SettingsContainer>
      <Form>
        <Division>
          <Wrapper>
            <Label>Tamanho dos textos</Label>
            <Control>
              <InputRange
                type="range"
                min="14"
                max="30"
                step="1"
                value={settings.size}
                name="size"
                onChange={handleInputChange}
              />
              <span>{settings.size}</span>
            </Control>
          </Wrapper>
          <Wrapper>
            <Label>Temperatura</Label>
            <Control>
              <InputRange
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                name="temperature"
                onChange={handleInputChange}
              />
              <span>{settings.temperature}</span>
            </Control>
          </Wrapper>
          <Wrapper>
            <Label>Máximo de tokens</Label>
            <Control>
              <InputRange
                type="range"
                min="1"
                max="4001"
                step="100"
                value={settings.tokens}
                name="tokens"
                onChange={handleInputChange}
              />
              <span>{settings.tokens}</span>
            </Control>
          </Wrapper>
          <Wrapper>
            <Label>Velocidade de renderização(ms)</Label>
            <Control>
              <InputRange
                type="range"
                max="1000"
                min="0"
                step="1"
                value={settings.speed}
                name="speed"
                onChange={handleInputChange}
              />
              <span>{settings.speed}</span>
            </Control>
          </Wrapper>
        </Division>

        <Division>
          <Control>
            <Label htmlFor="darkTheme">Tema dark</Label>
            <InputToggle
              type="checkbox"
              name="darkTheme"
              id="darkTheme"
              onChange={handleInputChange}
            />
          </Control>
          <Control>
            <Label htmlFor="contexts">Ativar contexto</Label>
            <InputToggle
              type="checkbox"
              name="contexts"
              id="contexts"
              onChange={handleInputChange}
            />
          </Control>
          <Control>
            <Label htmlFor="queries">Salvar consultas</Label>
            <InputToggle
              type="checkbox"
              name="queries"
              id="queries"
              onChange={handleInputChange}
            />
          </Control>
        </Division>

        <Buttons>
          {/* <Button>
            Reset
          </Button> */}
          <Button type="submit">
            Salvar
          </Button>
        </Buttons>
      </Form>
    </SettingsContainer>
  )
}