import Header from "@/components/ui/Header"
import Head from "next/head"
import { FormEvent, useState } from "react"
import styles from './styles.module.scss'
import { toast } from "react-toastify";
import { api } from "@/services/apiClient";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Category() {
  const [category, setCategory] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (category === '') {
      toast.warn("Field is empty")
      return;
    }

    await api.post('category/create', {
      name: category
    })

    toast.success("Register is success!")
    setCategory('');
  }
  return (
    <>
      <Head>
        <title>Cagetory</title>
      </Head>
      <div>
        <Header />
        <main className={styles.containerMain}>
          <h1>New Category</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              placeholder="Enter new category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <button type="submit">Create</button>
          </form>

        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})

