import { ECarDirection, ECarGear } from 'components/GameState'
import { Bodies, Body, Composite } from 'matter-js'

import { toRadians } from '../core/util'

export interface IEngineCar {
  acceleration: number
  brakingPower: number
  slowDown: number
}

export function createCar() {
  const car = Composite.create({ label: 'Car' })
  const carBody = Bodies.rectangle(0, 0, 90, 45, {
    density: 1,
    frictionAir: 0.2,
    frictionStatic: 5,
  })

  Composite.add(car, carBody)

  return {
    ...car,
    get body() {
      return carBody
    },
    get maxSpeed() {
      return 5
    },
    get acceleration() {
      return 2 / carBody.mass
    },
    get brakingPower() {
      return 1.5 / carBody.mass
    },
    get slowDown() {
      return 0.5 / carBody.mass
    },
    getGearPower(gear: ECarGear) {
      switch (gear) {
        case ECarGear.NEUTRAL:
          return -this.slowDown
        case ECarGear.ACCELERATE:
          return this.acceleration
        case ECarGear.BRAKE:
          return -this.brakingPower
      }
    },
    getDirectionPower(direction: ECarDirection) {
      return direction === ECarDirection.REVERSE ? -1 : 1
    },
    translate(x: number, y: number) {
      Composite.translate(car, { x, y })
    },
    rotate(degrees: number) {
      Composite.rotate(car, toRadians(degrees), {
        x: carBody.position.x,
        y: carBody.position.y,
      })
    },
    drive(force: number) {
      Body.applyForce(
        carBody,
        { x: carBody.position.x - 45, y: carBody.position.y },
        { x: force, y: 0 },
      )
    },
  }
}
