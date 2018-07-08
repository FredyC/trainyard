import { afterTick, beforeTick } from 'core/loop'
import { createTracks } from 'entity/track'
import { Common, Engine, World } from 'matter-js'
import React from 'react'

import { createCar } from '../entity/car'
import { DebugCar } from './DebugCar'
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
  private tracks = createTracks()
  private mainCar = createCar(200, 100, 180)

  state = { before: this.dumpCar(), after: this.dumpCar() }

  componentDidMount() {
    const { engine, state } = this.props

    beforeTick(delta => {
      const speedChange = delta * this.mainCar.getGearPower(state.gear)
      state.speed = Common.clamp(
        state.speed + speedChange,
        0,
        this.mainCar.maxSpeed,
      )
      if (state.speed === 0) {
        this.mainCar.stop()
      } else {
        this.mainCar.drive(
          state.speed * this.mainCar.getDirectionPower(state.direction),
        )
      }
      this.setState({ before: this.dumpCar() })
    })
    afterTick(() => {
      this.setState({ after: this.dumpCar() })
    })
    World.add(engine.world, this.mainCar)
    World.add(engine.world, this.tracks)
  }

  dumpCar() {
    const {
      position,
      // @ts-ignore
      positionPrev,
      force,
      torque,
      angle,
      // @ts-ignore
      anglePrev,
      speed,
      inertia,
      velocity,
      angularSpeed,
      angularVelocity,
    } = this.mainCar.body
    // @ts-ignore
    return Common.clone(
      {
        position,
        positionPrev,
        angle,
        anglePrev,
        force,
        torque,
        speed,
        inertia,
        velocity,
        angularSpeed,
        angularVelocity,
      },
      true,
    )
  }

  render() {
    return (
      <ErrorHandler>
        <Scene engine={this.props.engine} />
        <PowerControl state={this.props.state} />
        <TickControl />
        <DebugCar before={this.state.before} after={this.state.after} />
      </ErrorHandler>
    )
  }
}
