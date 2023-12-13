import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import 'react-toastify/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}