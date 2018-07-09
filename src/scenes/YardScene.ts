import { EngineCar } from 'entity/EngineCar'
import Phaser from 'phaser'

export class YardScene extends Phaser.Scene {
  constructor() {
    super('yard')
  }
  preload() {
    this.load.image('ground', require('../assets/ground.jpg'))
    this.load.image('loco', 'assets/train_011.png')
  }
  engine: EngineCar
  cursors: CursorKeys
  create() {
    this.createGround()
    this.createPaths()
    this.engine = this.createEngine()

    this.cursors = this.input.keyboard.createCursorKeys()

    this.cameras.main.startFollow(this.engine)

    this.events.on('resize', (width: number, height: number) => {
      this.cameras.resize(width, height)
    })
  }
  path: Phaser.Curves.Path
  getPoint(position: number) {
    return this.path.getPoint(position)
  }
  private createEngine() {
    const engineCar = new EngineCar(this.scene.scene, 0, 0, 'loco')
    engineCar.setAngle(-90)
    this.add.existing(engineCar)

    return engineCar
  }
  private createGround() {
    const ground = this.add.tileSprite(0, 0, 20000, 5000, 'ground')
    ground.setScale(0.5, 0.5)
  }
  private createPaths() {
    this.path = new Phaser.Curves.Path(100, 100)
    this.path.lineTo(300, 100)
    this.path.ellipseTo(200, 200, 270, 360, false, 0)
    const end = this.path.getEndPoint()
    this.path.lineTo(end.x, end.y + 200)

    const graphics = this.add.graphics()
    graphics.lineStyle(1, 0xffffff, 1)
    this.path.draw(graphics, 128)
  }
  update() {
    if (this.cursors.up!.isDown) {
      this.engine.powerForward()
    } else if (this.cursors.down!.isDown) {
      this.engine.powerBack()
    } else {
      this.engine.powerOff()
    }
  }
}
