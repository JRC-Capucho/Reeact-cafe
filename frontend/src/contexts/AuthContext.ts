import { useRouter } from "next/router";
import { ReactNode, createContext, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import { toast } from "react-toastify";

interface UserProps {
  id: number;
  name: string;
  email: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  email: string;
  name: string;
  password: string;
}

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  const router = useRouter();
  try {
    destroyCookie(undefined, "@nextauth.token");
    router.push("/");
  } catch (error) {}
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;
  const router = useRouter();

  async function sigIn({ email, password }: SignInProps) {
    try {
      const res = await api.post("user/login", { email, password });

      const { id, name, token } = res.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie barra / que dizer todos
      });

      setUser({ id, name, email });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Logged");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const res = await api.post("user/create", {
        name,
        email,
        password,
      });
      toast.success("Create success!");
      router.push("/");
    } catch (error) {
      toast.error("Invalid create");
    }
  }
  return (
  <AuthContext.Provider value={{user,isAuthenticated,signIn,signUp}}>
  {children}
    </AuthContext.Provider>

  )
}
