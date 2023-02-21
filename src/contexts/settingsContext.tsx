import React, { ChangeEvent, createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"


interface ObjectFielType {
  [key: string]: number | boolean;
}

export interface SettingsTypes {
  size: number,
  temperature: number,
  tokens: number,
  speed: number,
  darkTheme: boolean,
  queries: boolean,
  contexts: boolean
}

interface SettingsContextTypes {
  settings: SettingsTypes,
  updateSettings(event: ChangeEvent<HTMLInputElement>): void
}

const initialSettings: SettingsTypes = {
  size: 18,
  temperature: 0.6,
  tokens: 2050,
  speed: 40,
  darkTheme: true,
  queries: true,
  contexts: false
}

const SettingsContext = createContext<SettingsContextTypes>({
  settings: initialSettings,
  updateSettings() { }
})

const settingsStorageKey = '@mr:chatgpt:settings'

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsTypes>(initialSettings)

  useEffect(() => {
    loadStoredSettings()
  }, [])

  useEffect(() => {
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings))
  }, [settings])

  const loadStoredSettings = () => {
    const storedSettings = localStorage.getItem(settingsStorageKey)

    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    }
  }

  const updateSettings = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const nameAttribute: unknown = input.getAttribute('name')

    if (typeof nameAttribute !== 'string') return

    const inputsCheckbox = ['darkTheme', 'contexts', 'queries']

    const isCheckbox = inputsCheckbox.includes(nameAttribute)

    const objectField: ObjectFielType = isCheckbox
      ? { [nameAttribute]: input.checked }
      : { [nameAttribute]: Number(input.value) }

    setSettings(prevState => ({ ...prevState, ...objectField }))
  }, [])

  const value: SettingsContextTypes = {
    settings,
    updateSettings
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = (): SettingsContextTypes => {
  const context = useContext(SettingsContext)
  return context
}