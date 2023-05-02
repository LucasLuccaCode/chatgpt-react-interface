import React from "react"

import { useSettings } from "../../../contexts/settingsContext"

import {
  SettingsContainer,
  Division,
  Wrapper,
  Control,
  Buttons,
  Label,
  InputRange,
  InputToggle,
} from "./styles"
import { Button } from "../../../components/Button"

export const Settings: React.FC = () => {
  const { settings, updateSettings, restoreSettings } = useSettings()

  return (
    <SettingsContainer>
      <Division>
        <Control>
          <Label
            htmlFor="darkTheme"
            title="Alternar entre tema dark e light"
          >
            Tema dark
          </Label>
          <InputToggle
            type="checkbox"
            name="darkTheme"
            id="darkTheme"
            checked={settings.darkTheme}
            onChange={updateSettings}
          />
        </Control>
        <Control>
          <Label
            htmlFor="contexts"
            title="Incluir respostas anteriores do chat nas futuras consultas"
          >
            Habilitar contexto
          </Label>
          <InputToggle
            type="checkbox"
            name="contexts"
            id="contexts"
            checked={settings.contexts}
            onChange={updateSettings}
          />
        </Control>
        <Control>
          <Label
            htmlFor="queries"
            title="Salvar todas as consultas dos chats"
          >
            Salvar consultas
          </Label>
          <InputToggle
            type="checkbox"
            name="queries"
            id="queries"
            checked={settings.queries}
            onChange={updateSettings}
          />
        </Control>
      </Division>

      <Division>
        <Wrapper>
          <Label title="Tamanho da fonte dos textos">Tamanho dos textos</Label>
          <Control>
            <InputRange
              type="range"
              min="14"
              max="25"
              step="1"
              value={settings.size}
              name="size"
              onChange={updateSettings}
            />
            <span>{settings.size}</span>
          </Control>
        </Wrapper>
        <Wrapper>
          <Label title="Temperatura da resposta">Temperatura</Label>
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
          <Label title="Máximo de token">Máximo de tokens</Label>
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
          <Label title="Velocidade de renderização(ms)">Velocidade de renderização(ms)</Label>
          <Control>
            <InputRange
              type="range"
              max="150"
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

      <Buttons>
        <Button text="Restaurar" size="full" handleClick={restoreSettings} />
      </Buttons>
    </SettingsContainer >
  )
}