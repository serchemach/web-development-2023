import '@/styles/globals.css'
import { ThemeProvider } from '@mui/material'
import {red} from '@mui/material/colors';
import { createTheme, PaletteColorOptions } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from './store/store';

const theme = createTheme({
  palette: {
    primary: {
      main: red["400"]
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}><Provider store={store}><Component {...pageProps} /> </Provider></ThemeProvider> 
}
