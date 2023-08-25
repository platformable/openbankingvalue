import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AppWrapper } from '../context/userContext';
import { ValueContextProvider } from '../context/valueContext';


function MyApp({ Component, pageProps }) {
  return (
  <ValueContextProvider>
  {/* <AppWrapper> */}
  <Component {...pageProps} />
  {/* </AppWrapper> */}
  </ValueContextProvider>
  )
}

export default MyApp
