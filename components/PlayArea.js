import { darken } from 'polished'
import styled from 'styled-components'
import { amber, lightBlue } from '@material-ui/core/colors'
import { Biscuit, Court } from './'

const PlayArea = ({ backgroundColor }) => (
  <StyledPlayArea backgroundColor={backgroundColor}>
    <Biscuit color={amber[500]} isVisible />
    <Court fill={lightBlue[50]} stroke="black" />
  </StyledPlayArea>
)

export default PlayArea

const StyledPlayArea = styled.section`
  border: 16px solid ${(props) => darken(0.1, props.backgroundColor)};
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0 0 60px -30px black;
  display: flex;
  height: 100%;
  justify-content: center;
  max-width: 100%;
  position: absolute;
`
