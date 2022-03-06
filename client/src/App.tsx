import React from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import DefaultLayout from './components/pages/layouts/Default'
import theme from './theme'
import { Homepage } from './components/pages/home/Homepage'

const defaultTheme = extendTheme(theme)

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            {/* We've just bundled everything into one file here to 
            get you started!*/}
            <DefaultLayout>
                <Homepage />
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
