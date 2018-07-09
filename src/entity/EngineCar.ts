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

export class EngineCar extends Phaser.GameObjects.Image {
  private position = 0
  private speed = 0
  private gear = ECarGear.NEUTRAL
  private direction = ECarDirection.FORWARD
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
  rotateToward(point: Phaser.Math.Vector2) {
    const speedX = this.x - point.x
    const speedY = this.y - point.y
    const targetAngle = this.direction === ECarDirection.REVERSE ? -90 : 90
    this.setRotation(
      Math.atan2(speedY, speedX) + Phaser.Math.DegToRad(targetAngle),
    )
  }
  moveBy(position: number) {
    const nextPosition = this.position + position
    const nextPoint = this.getPoint(nextPosition)
    if (nextPoint) {
      if (this.speed !== 0) {
        this.rotateToward(nextPoint)
      }
      this.setPosition(nextPoint.x, nextPoint.y)
      this.position = nextPosition
    }
  }
}
