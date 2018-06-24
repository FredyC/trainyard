import { observable } from 'mobx'
import React from 'react'

export enum ECarGear {
  NEUTRAL,
  ACCELERATE,
  BRAKE,
}

export enum ECarDirection {
  FORWARD,
  REVERSE,
}

const defaultState = {
  speed: 0,
  gear: ECarGear.NEUTRAL,
  direction: ECarDirection.FORWARD,
  powerForward() {
    if (this.speed === 0 && this.gear === ECarGear.NEUTRAL) {
      this.direction = ECarDirection.FORWARD
    }
    if (this.direction === ECarDirection.FORWARD) {
      this.gear = ECarGear.ACCELERATE
    } else {
      this.gear = ECarGear.BRAKE
    }
  },
  powerBack() {
    if (this.speed === 0 && this.gear === ECarGear.NEUTRAL) {
      this.direction = ECarDirection.REVERSE
    }
    if (this.direction === ECarDirection.FORWARD) {
      this.gear = ECarGear.BRAKE
    } else {
      this.gear = ECarGear.ACCELERATE
    }
  },
  powerOff() {
    this.gear = ECarGear.NEUTRAL
  },
}

export type TGameState = typeof defaultState

export const { Consumer: GameState } = React.createContext<TGameState>(
  observable(defaultState),
)
