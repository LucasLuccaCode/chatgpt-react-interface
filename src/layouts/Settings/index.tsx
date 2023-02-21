import React from "react"

import { useSettings } from "../../contexts/settingsContext"

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

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings()

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
                onChange={updateSettings}
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
                onChange={updateSettings}
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
                onChange={updateSettings}
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
                onChange={updateSettings}
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
              checked={settings.darkTheme}
              onChange={updateSettings}
            />
          </Control>
          <Control>
            <Label htmlFor="contexts">Ativar contexto</Label>
            <InputToggle
              type="checkbox"
              name="contexts"
              id="contexts"
              checked={settings.contexts}
              onChange={updateSettings}
            />
          </Control>
          <Control>
            <Label htmlFor="queries">Salvar consultas</Label>
            <InputToggle
              type="checkbox"
              name="queries"
              id="queries"
              checked={settings.queries}
              onChange={updateSettings}
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