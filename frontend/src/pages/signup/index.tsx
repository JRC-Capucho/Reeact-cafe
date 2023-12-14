import { Button } from "@/components/ui/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/Input"
import { FormEvent, useState, useContext } from "react"
import { toast } from "react-toastify";

import styles from '../../styles/home.module.scss'
import logoImg from '../../../public/logo.svg'

import Image from "next/image"
import Link from "next/link";
import Head from "next/head";

export default function SignUp() {
  const { signUp } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (email === '' || password === '' || name === '') {
      toast.warn("Fields is empty")
      return;
    }

    setLoading(true);

    let data = { name, email, password }

    await signUp(data)

    setLoading(false)
  }


  return (
    <>
      <Head>
        <title>Reeact Cafe</title>
      </Head>
      <div className={styles.containerLogin}>
        <Image src={logoImg} alt='logo' width='298' height='502' />
        <div className={styles.containerForm}>
          <form onSubmit={handleSubmit}>

            <Input
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading}>Sing In</Button>
          </form>
          <Link href="/" className={styles.text}>Already have a account. Sign In</Link>
        </div>
      </div>
    </>
  )
}
