import { EngineCar } from 'entity/EngineCar'
import Phaser from 'phaser'

export class YardScene extends Phaser.Scene {
  constructor() {
    super('yard')
  }
  preload() {
    this.load.image('ground', require('../assets/ground.jpg'))
    this.load.image('loco', 'assets/train_011.png')
    this.load.image('car', 'assets/train_022.png')
  }
  engine: EngineCar
  cursors: CursorKeys
  create() {
    this.createGround()
    this.createPaths()
    this.engine = this.createEngine()
    this.engine.appendCar(this.add.image(0, 0, 'car'))

    this.cursors = this.input.keyboard.createCursorKeys()

    this.cameras.main.startFollow(this.engine)

    this.events.on('resize', this.onResize)
    this.onResize(window.innerWidth, window.innerHeight)
  }
  onResize = (width: number, height: number) => {
    this.cameras.resize(width, height)
    this.cameras.main.setBounds(0, 0, width, height)
  }
  path: Phaser.Curves.Path
  getPoint(position: number) {
    return this.path.getPoint(position)
  }
  private createEngine() {
    const engineCar = new EngineCar(this.scene.scene, 0, 0, 'loco')
    engineCar.setAngle(-90)
    // engineCar.runNow(1)
    this.add.existing(engineCar)

    return engineCar
  }
  private createGround() {
    const ground = this.add.tileSprite(0, 0, 20000, 5000, 'ground')
    ground.setScale(0.5, 0.5)
  }
  private createPaths() {
    this.path = new Phaser.Curves.Path(-100, 100)
    this.path.lineTo(300, 100)
    this.path.cubicBezierTo(400, 800, 300, 100, 800, 150)

    const graphics = this.add.graphics()
    graphics.lineStyle(15, 0x2d1607, 0.7)
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
