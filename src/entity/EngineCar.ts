import { YardScene } from 'scenes/YardScene'

export enum ECarGear {
  NEUTRAL,
  ACCELERATE,
  BRAKE,
}

export enum ECarDirection {
  FORWARD,
  REVERSE,
}

type TCar = Phaser.GameObjects.Image

export class EngineCar extends Phaser.GameObjects.Image {
  private position = 0
  private speed = 0
  private gear = ECarGear.NEUTRAL
  private direction = ECarDirection.FORWARD
  private cars: TCar[] = []
  get maxSpeed() {
    return 3
  }
  get acceleration() {
    return 1 / 500
  }
  get brakingPower() {
    return 1.5 / 500
  }
  get slowDown() {
    return 0.05 / 500
  }
  getGearPower() {
    switch (this.gear) {
      case ECarGear.NEUTRAL:
        return -this.slowDown
      case ECarGear.ACCELERATE:
        return this.acceleration
      case ECarGear.BRAKE:
        return -this.brakingPower
    }
  }
  getDirectionPower() {
    return this.direction === ECarDirection.REVERSE ? -1 : 1
  }
  powerForward() {
    if (this.speed === 0 && this.gear === ECarGear.NEUTRAL) {
      this.direction = ECarDirection.FORWARD
    }
    if (this.direction === ECarDirection.FORWARD) {
      this.gear = ECarGear.ACCELERATE
    } else {
      this.gear = ECarGear.BRAKE
    }
  }
  powerBack() {
    if (this.speed === 0 && this.gear === ECarGear.NEUTRAL) {
      this.direction = ECarDirection.REVERSE
    }
    if (this.direction === ECarDirection.FORWARD) {
      this.gear = ECarGear.BRAKE
    } else {
      this.gear = ECarGear.ACCELERATE
    }
  }
  powerOff() {
    this.gear = ECarGear.NEUTRAL
  }
  runNow(speed: number) {
    this.speed = speed
  }
  stopNow() {
    this.gear = ECarGear.NEUTRAL
    this.speed = 0
  }
  appendCar(car: Phaser.GameObjects.Image) {
    this.cars.push(car)
    car.setRotation(this.rotation)
  }
  preUpdate(time: number, delta: number) {
    const speedChange = delta * this.getGearPower()
    this.speed = Phaser.Math.Clamp(this.speed + speedChange, 0, this.maxSpeed)
    const nextPosition =
      (this.speed * this.getDirectionPower()) / this.getTrackLength()
    this.moveBy(nextPosition)
  }
  getPoint(position: number) {
    return (this.scene as YardScene).path.getPoint(position)
  }
  getTrackLength() {
    return (this.scene as YardScene).path.getLength()
  }
  rotateToward(obj: Phaser.GameObjects.Image, point: Phaser.Math.Vector2) {
    const speedX = obj.x - point.x
    const speedY = obj.y - point.y
    const targetAngle = this.direction === ECarDirection.REVERSE ? 180 : 0
    obj.setRotation(
      Math.atan2(speedY, speedX) + Phaser.Math.DegToRad(targetAngle),
    )
  }
  moveBy(position: number) {
    const nextPosition = this.position + position
    if (nextPosition < 0 || nextPosition > 1) {
      this.stopNow()
      return
    }
    const nextPoint = this.getPoint(nextPosition)
    if (nextPoint) {
      if (this.speed !== 0) {
        this.rotateToward(this, nextPoint)
      }
      this.setPosition(nextPoint.x, nextPoint.y)
      this.cars.forEach((car, i) => {
        const carOffset = car.width / this.getTrackLength()
        const carPosition = nextPosition - carOffset * (i + 1)
        const carPoint = this.getPoint(carPosition)
        if (this.speed !== 0) {
          this.rotateToward(car, carPoint)
        }
        car.setPosition(carPoint.x, carPoint.y)
      })
      this.position = nextPosition
    }
  }
}
