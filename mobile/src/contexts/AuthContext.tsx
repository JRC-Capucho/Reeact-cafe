import React, {
  useState,
  createContext,
  ReactNode,
  useEffect
} from "react";

import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


type AuthProviderProps = {
  children: ReactNode;
}

type UserProps = {
  id: number;
  name: number;
  email: string;
  token: string;
}

type SignInProps = {
  email: string;
  password: string;
}
type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  loadingAuth: boolean;
  loading: boolean
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {


  const [user, setUser] = useState<UserProps>({
    id: 0,
    name: '',
    email: '',
    token: ''
  })

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.name;

  useEffect(() => {
    async function getUser() {

      const userInfo = await AsyncStorage.getItem("@nextauth.token")

      let hasUser: UserProps = JSON.parse(userInfo || '{}')

      if (Object.keys(hasUser).length > 0) {
        console.log("hasuser")
        api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token
        })

      }
      setLoading(false);
    }

    getUser()
  }, [])

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true)
    try {
      const res = await api.post("user/login", { email, password })

      const { id, name, token } = res.data

      const data = {
        ...res.data
      }

      await AsyncStorage.setItem("@nextauth.token", JSON.stringify(data))

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser({ id, name, email, token })

      setLoadingAuth(false);

    } catch (error) {
      console.log(error)
      setLoadingAuth(false)
    }
  }

  async function signOut() {
    await AsyncStorage.clear()
      .then(() => {
        setUser({
          id: 0,
          name: '',
          email: '',
          token: ''
        })
      })

  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signIn,
      loadingAuth,
      loading,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}
