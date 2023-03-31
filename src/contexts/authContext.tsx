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
import { Loading } from "../components/Loading";

interface IUser {
  id: number;
  name: string;
}

interface SignInProps {
  email: string;
  password: string
}

interface AuthContextTypes {
  user: IUser | null,
  signed: boolean,
  signIn({ email, password }: SignInProps): void,
  isLoading: boolean,
  logout(): void
}

const userStoredKey = "@mr:chatgpt:user"
const tokenStoredKey = "@mr:chatgpt:token"

const AuthContext = createContext<AuthContextTypes>({
  user: null,
  signed: false,
  signIn() { },
  isLoading: true,
  logout() { }
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
      const { data } = await axios.post('/users/login', {
        email,
        password
      })

      setUser(data.user)

      axios.defaults.headers['Authorization'] = `Bearer ${data.token}`

      // creating user cache and token
      Cookies.set(tokenStoredKey, data.token, { expires: 7 }) // Espira em 7 dias
      Cookies.set(userStoredKey, JSON.stringify(user), { expires: 7 }) // Espira em 7 dias
    } catch (error) {
      console.log(error)
    }
  }, [])

  const logout = useCallback(async () => {
    Cookies.remove(tokenStoredKey)
    Cookies.remove(userStoredKey)

    setUser(null)
  }, [])

  const value: AuthContextTypes = {
    user,
    signed: !!user,
    signIn,
    isLoading,
    logout
  }

  if(isLoading){
    // return null
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)