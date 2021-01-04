import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { amber, deepOrange, lightBlue } from '@material-ui/core/colors'
import { Controls, Main, PageHead, PlayArea } from '../components'
import { addBiscuit } from '../utils'

const initialBiscuits = {
  yellow: [],
  black: [],
}

const Home = () => {
  const [isYellow, setIsYellow] = useState(true)
  const [biscuits, setBiscuits] = useState(initialBiscuits)

  const router = useRouter()

  useEffect(() => {
    if (biscuits.yellow.length && !biscuits.black.length) {
      router.push(`?yellow=${biscuits.yellow}`)
    } else if (!biscuits.yellow.length && biscuits.black.length) {
      router.push(`?black=${biscuits.black}`)
    } else if (biscuits.yellow.length && biscuits.black.length) {
      router.push(`?yellow=${biscuits.yellow}&black=${biscuits.black}`)
    } else {
      router.push('/')
    }
  }, [biscuits])

  return (
    <>
      <PageHead title="Board State Visualizer" />

      <ThemeProvider theme={theme}>
        <Main>
          <PlayArea backgroundColor={lightBlue[200]} biscuits={biscuits} />
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
