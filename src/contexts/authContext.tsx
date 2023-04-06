import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";

import Cookies from "js-cookie";
import axios from "../services/axios"
import { useToast } from "./toaskContext";

interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface SignInProps {
  email: string;
  password: string
}

interface SignUpProps {
  user: {
    name: string;
    email: string;
    password: string
    confirmPassword: string;
  },
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthContextTypes {
  user: IUser | null;
  signed: boolean;
  signIn({ email, password }: SignInProps): Promise<void>;
  signUp({ user, setIsLogin }: SignUpProps): Promise<void>;
  signOut(): void;
  update(user: IUserUpdate): void;
  isLoading: boolean
}

const userStoredKey = "@mr:chatgpt:user"
const tokenStoredKey = "@mr:chatgpt:token"

const AuthContext = createContext<AuthContextTypes>({
  user: null,
  signed: false,
  async signIn() { },
  async signUp() { },
  signOut() { },
  update() { },
  isLoading: true
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { updateToast } = useToast()

  useEffect(() => {
    loadCacheData()
  }, [])

  const loadCacheData = useCallback(() => {
    const tokenCookie = Cookies.get(tokenStoredKey)
    const userCookie = Cookies.get(userStoredKey)

    if (tokenCookie && userCookie) {
      const userData = JSON.parse(userCookie)

      axios.defaults.headers['Authorization'] = `Bearer ${tokenCookie}`

      setUser(userData)
    }
    setIsLoading(false)
  }, [])

  const signIn = useCallback(async ({ email, password }: SignInProps) => {
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password
      })

      if (data?.error) {
        return console.log(data.error)
      }
      setUser(data.user)

      axios.defaults.headers['Authorization'] = `Bearer ${data.token}`

      // creating user cache and token
      Cookies.set(tokenStoredKey, data.token, { expires: 7 }) // Espira em 7 dias
      Cookies.set(userStoredKey, JSON.stringify(data.user), { expires: 7 }) // Espira em 7 dias
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data.error
        : error.message

      console.log(errorMessage)

      updateToast({
        title: errorMessage,
        type: 'error'
      })
    }
  }, [])

  const signUp = useCallback(async ({ user, setIsLogin }: SignUpProps) => {
    try {
      const { name, email, password, confirmPassword } = user
      const { data } = await axios.post('/auth/register', {
        name,
        email,
        password,
        confirmPassword
      })

      if (data?.error) {
        console.log(data.error)
        return
      }

      setIsLogin(true)
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data.error
        : error.message

      console.log(errorMessage)

      updateToast({
        title: errorMessage,
        type: 'error'
      })
    }
  }, [])

  const update = useCallback(async ({ name, email, password, confirmPassword }: IUserUpdate) => {
    try {
      const userId = user?.id

      const { data } = await axios.patch(`/users/${userId}`, {
        name,
        email,
        password,
        confirmPassword
      })

      updateToast({
        title: data.message,
        type: 'success'
      })
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data.error
        : error.message

      console.log(errorMessage)

      updateToast({
        title: errorMessage,
        type: 'error'
      })
    }
  }, [user])

  const signOut = useCallback(async () => {
    Cookies.remove(tokenStoredKey)
    Cookies.remove(userStoredKey)

    setUser(null)

    updateToast({
      title: 'Desconectado com sucesso.',
      type: 'success'
    })
  }, [])

  const value: AuthContextTypes = {
    user,
    signed: !!user,
    signIn,
    signUp,
    signOut,
    update,
    isLoading
  }

  if (isLoading) {
    // return null
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)