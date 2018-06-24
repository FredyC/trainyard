import { beforeTick, startLoop } from 'core/loop'
import { Common, Engine, World } from 'matter-js'
import React from 'react'

import { createCar } from '../entity/car'
import { ErrorHandler } from './ErrorHandler'
import { TGameState } from './GameState'
import { PowerControl } from './PowerControl'
import { Scene } from './Scene'

interface IProps {
  engine: Engine
  state: TGameState
}

export class Game extends React.PureComponent<IProps> {
  private mainCar = createMainCar()

  componentDidMount() {
    const { engine, state } = this.props

    beforeTick(delta => {
      const speedChange = delta * this.mainCar.getGearPower(state.gear)
      state.speed = Common.clamp(
        state.speed + speedChange,
        0,
        this.mainCar.maxSpeed,
      )
      this.mainCar.drive(
        state.speed * this.mainCar.getDirectionPower(state.direction),
      )
    })
    World.add(engine.world, this.mainCar)
    startLoop()
  }

  render() {
    return (
      <ErrorHandler>
        <Scene engine={this.props.engine} />
        <PowerControl state={this.props.state} />
      </ErrorHandler>
    )
  }
}

function createMainCar() {
  const mainCar = createCar()
  mainCar.translate(200, 100)
  mainCar.rotate(180)
  return mainCar
}
