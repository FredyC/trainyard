import KeyboardJS from 'keyboardjs'
import { Observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'

import { ECarDirection, ECarGear, TGameState } from './GameState'

interface IProps {
  state: TGameState
}

const PowerControlContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  color: white;
`

export class PowerControl extends React.PureComponent<IProps> {
  componentDidMount() {
    KeyboardJS.bind(
      ['numadd'],
      () => {
        this.props.state.powerForward()
      },
      () => {
        this.props.state.powerOff()
      },
    )
    KeyboardJS.bind(
      ['num-'],
      () => {
        this.props.state.powerBack()
      },
      () => {
        this.props.state.powerOff()
      },
    )
  }
  render() {
    const { state } = this.props
    return (
      <Observer>
        {() => (
          <PowerControlContainer>
            <div>{`Speed: ${state.speed}`}</div>
            <div>{`Gear: ${ECarGear[state.gear]}`}</div>
            <div>{`Direction: ${ECarDirection[state.direction]}`}</div>
          </PowerControlContainer>
        )}
      </Observer>
    )
  }
}
