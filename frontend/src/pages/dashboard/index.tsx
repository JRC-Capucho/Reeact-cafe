import Header from "@/components/ui/Header"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"

export default function Dashboard() {
  return (
    <>
      <Header />
      <Head>
        <title>Dashboard Cafe</title>
      </Head>
      <div>
        <h1>Dashboard</h1>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
