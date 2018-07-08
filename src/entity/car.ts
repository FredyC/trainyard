import { ECarDirection, ECarGear } from 'components/GameState'
import { Bodies, Body, Composite } from 'matter-js'

import { toRadians } from '../core/util'

export interface IEngineCar {
  acceleration: number
  brakingPower: number
  slowDown: number
}

export function createCar(x: number, y: number, degrees: number) {
  const car = Composite.create({ label: 'Car' })
  const carBody = Bodies.rectangle(0, 0, 90, 45, {
    density: 2,
    frictionAir: 0.2,
    frictionStatic: 5,
    chamfer: {
      radius: 7,
    },
  })

  Composite.add(car, carBody)
  Composite.translate(car, { x, y })
  Composite.rotate(car, toRadians(degrees), {
    x: carBody.position.x,
    y: carBody.position.y,
  })
  Composite.scale(car, 0.5, 0.5, carBody.position)

  return {
    ...car,
    get body() {
      return carBody
    },
    get maxSpeed() {
      return 3
    },
    get acceleration() {
      return 1 / carBody.mass
    },
    get brakingPower() {
      return 1.5 / carBody.mass
    },
    get slowDown() {
      return 0.05 / carBody.mass
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
    stop() {
      Body.setVelocity(carBody, { x: 0, y: 0 })
    },
    drive(force: number) {
      Body.applyForce(
        carBody,
        { x: carBody.position.x, y: carBody.position.y },
        { x: force, y: 0 },
      )
    },
    turn(force: number) {
      Body.applyForce(
        carBody,
        { x: carBody.position.x + 45, y: carBody.position.y - 22 },
        { x: force, y: force },
      )
    },
  }
}
