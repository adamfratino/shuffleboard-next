import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { amber, deepOrange, lightBlue } from '@material-ui/core/colors'
import { Controls, Main, PageHead, PlayArea } from '../components'
import { addBiscuit, parseValue, updateUrlParams } from '../utils'

const initialBiscuits = {
  yellow: [],
  black: [],
}

const Home = () => {
  const [isYellow, setIsYellow] = useState(true)
  const [biscuits, setBiscuits] = useState(initialBiscuits)
  const firstUpdate = useRef(true)
  const router = useRouter()

  useEffect(() => {
    firstUpdate.current
      ? (firstUpdate.current = false)
      : updateUrlParams(biscuits, router)
    console.log(biscuits)
  }, [biscuits])

  useEffect(() => {
    // why doesn't router.query work?
    // https://github.com/vercel/next.js/discussions/11484
    const urlParams = router.asPath.replace('/?', '')

    const parsed = urlParams.split('&').reduce((acc, p) => {
      const [key, value] = p.split('=')
      const parsedValue = parseValue(value)
      acc[key] = parsedValue
      return acc
    }, {})

    setBiscuits(parsed)
  }, [])

  return (
    <>
      <PageHead title="Shuffleboard Visualizer" />

      <ThemeProvider theme={theme}>
        <Main>
          <PlayArea
            backgroundColor={lightBlue[200]}
            biscuits={biscuits}
            isYellow={isYellow}
            setBiscuits={setBiscuits}
          />
          <Controls
            isYellow={isYellow}
            handleAddBiscuit={() => addBiscuit(isYellow, biscuits, setBiscuits)}
            handleClearBoard={() => setBiscuits(initialBiscuits)}
            handleToggleActiveColor={() => setIsYellow(!isYellow)}
          />
        </Main>
      </ThemeProvider>
    </>
  )
}

export default Home

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[200],
    },
    secondary: {
      main: amber[500],
    },
  },
  tertiary: {
    main: deepOrange[700],
  },
})
