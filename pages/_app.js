import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { ValueContextProvider } from '../context/valueContext';
import PlausibleProvider from "next-plausible"


function MyApp({ Component, pageProps }) {
  return (
  <PlausibleProvider domain="openbankingvalue.platformable.com" enabled taggedEvents trackFileDownloads>
    <ValueContextProvider>
     <Component {...pageProps} />
    </ValueContextProvider>
  </PlausibleProvider>

  )
}

export default MyApp
