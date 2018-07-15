import { Engine } from 'matter-js'
import React from 'react'

import { ErrorHandler } from './ErrorHandler'
import { TGameState } from './GameState'
import { PowerControl } from './PowerControl'
import { Scene } from './Scene'
import { TickControl } from './TickControl'

interface IProps {
  engine: Engine
  state: TGameState
}

export class Game extends React.PureComponent<IProps> {
  render() {
    return (
      <ErrorHandler>
        <Scene engine={this.props.engine} />
        <PowerControl state={this.props.state} />
        <TickControl />
      </ErrorHandler>
    )
  }
}
