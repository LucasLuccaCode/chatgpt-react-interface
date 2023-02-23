import React, { 
  ChangeEvent, 
  createContext, 
  ReactNode, 
  useCallback, 
  useContext, 
  useEffect, 
  useState 
} from "react"

interface PropertiesToApplyTypes {
  size: () => void;
  darkTheme: () => void;
}

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
  updateSettings(event: ChangeEvent<HTMLInputElement>): void,
  restoreSettings(): void
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
  updateSettings() { },
  restoreSettings() { }
})

const settingsStorageKey = '@mr:chatgpt:settings'

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsTypes>(initialSettings)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    loadStoredSettings()
  }, [])

  useEffect(() => {
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings))

    if (!isLoading) {
      Object.keys(settings).forEach(key => {
        const value = settings[key as keyof typeof settings];
        applySettings(key as keyof SettingsTypes, value)
      })
    }
  }, [settings])

  const loadStoredSettings = useCallback(() => {
    const storedSettings = localStorage.getItem(settingsStorageKey)

    if (storedSettings) {
      const data = JSON.parse(storedSettings)
      setSettings(data)
    }
    setIsLoading(false)
  }, [])

  const applySettings = useCallback((
    key: keyof SettingsTypes, 
    value: SettingsTypes[keyof SettingsTypes]
  ) => {

    const propertiesToApply: PropertiesToApplyTypes = {
      size: () => {
        document.documentElement.style.setProperty('--font-size', `${value}px`);
      },
      darkTheme: () => {
        // implementação do darkTheme
      }
    }

    const fn = propertiesToApply[key as keyof PropertiesToApplyTypes]
    fn && fn()
  }, [])

  const updateSettings = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const nameAttribute = input.getAttribute('name')

    if (typeof nameAttribute !== 'string') return

    const inputsCheckbox = ['darkTheme', 'contexts', 'queries']

    const isCheckbox = inputsCheckbox.includes(nameAttribute)

    const objectField: ObjectFielType = isCheckbox
      ? { [nameAttribute]: input.checked }
      : { [nameAttribute]: Number(input.value) }

    setSettings(prevState => ({ ...prevState, ...objectField }))
  }, [])

  const restoreSettings = useCallback(() => {
    setSettings(initialSettings)
    console.log('Configurações restauradas...')

    Object.keys(settings).forEach(key => {
      const value = settings[key as keyof typeof settings];
      applySettings(key as keyof SettingsTypes, value)
    })
  }, [settings])

  const value: SettingsContextTypes = {
    settings,
    updateSettings,
    restoreSettings
  }

  if (isLoading) {
    return null
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
