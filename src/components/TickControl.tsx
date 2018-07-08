import { Button } from '@material-ui/core'
import { PlayArrow, Stop } from '@material-ui/icons'
import { executeTick, startLoop, stopLoop } from 'core/loop'
import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
`

const delta = (1 / 60) * 1000

export class TickControl extends React.Component {
  state = { running: false }
  renderControlButton() {
    return (
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          const { running } = this.state
          if (running) {
            stopLoop()
          } else {
            startLoop()
          }
          this.setState({ running: !running })
        }}
      >
        {this.state.running ? <Stop /> : <PlayArrow />}
      </Button>
    )
  }
  renderFrameButton(frameMulti: number) {
    return (
      <Button
        color="primary"
        variant="contained"
        onClick={() => executeTick(delta * frameMulti)}
      >
        {`${frameMulti} Frame${frameMulti > 1 ? 's' : ''}`}
      </Button>
    )
  }
  render() {
    return (
      <Wrap>
        {this.renderControlButton()}
        {this.renderFrameButton(1)}
        {this.renderFrameButton(10)}
        {this.renderFrameButton(30)}
        {this.renderFrameButton(60)}
      </Wrap>
    )
  }
}
