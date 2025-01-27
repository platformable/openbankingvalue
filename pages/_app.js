import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { ValueContextProvider } from '../context/valueContext';
import PlausibleProvider from "next-plausible"
import {Poppins} from '@next/font/google'
const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})
function MyApp({ Component, pageProps }) {
  return (
  <PlausibleProvider domain="openbankingvalue.platformable.com" enabled taggedEvents trackFileDownloads>
    <ValueContextProvider>
      <div className={poppins.className}>
        <Component {...pageProps} />
      </div>
    </ValueContextProvider>
  </PlausibleProvider>

  )
}

export default MyApp
