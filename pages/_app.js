import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { ValueContextProvider } from '../context/valueContext';


function MyApp({ Component, pageProps }) {
  return (
  <ValueContextProvider>
  <Component {...pageProps} />
  </ValueContextProvider>
  )
}

export default MyApp
