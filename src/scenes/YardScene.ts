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
    this.load.json('track', 'assets/track.json')
  }
  engine: EngineCar
  graphics: Phaser.GameObjects.Graphics
  cursors: CursorKeys
  path: Phaser.Curves.Path
  create() {
    this.createGround()
    this.graphics = this.add.graphics()
    this.path = this.createPaths()
    this.engine = this.createEngine()
    this.appendCars(10)
    this.engine.runNow(2.5)
    this.add.text(
      10,
      10,
      'Use up/down arrow to control power. Train need to stop fully before changing direction.',
    )

    this.cursors = this.input.keyboard.createCursorKeys()

    this.cameras.main.startFollow(this.engine)

    this.events.on('resize', this.onResize)
    this.onResize(window.innerWidth, window.innerHeight)

    // this.scene.add('editor', TrackEditorScene, true)
  }
  onResize = (width: number, height: number) => {
    this.cameras.resize(width, height)
    this.cameras.main.setBounds(0, 0, width, height)
  }
  getPoint(position: number) {
    return this.path.getPoint(position)
  }
  private createEngine() {
    const engineCar = new EngineCar(this.scene.scene, 0, 0, 'loco')
    this.add.existing(engineCar)
    return engineCar
  }
  private appendCars(count: number) {
    for (let i = 0; i < count; i++) {
      this.engine.appendCar(this.add.image(0, 0, 'car'))
    }
  }
  private createGround() {
    const ground = this.add.tileSprite(0, 0, 20000, 5000, 'ground')
    ground.setScale(0.5, 0.5)
  }

  private createPaths() {
    const path = new Phaser.Curves.Path(-100, 100)
    // path.lineTo(800, 100)
    path.fromJSON(this.cache.json.get('track'))
    return path
  }
  update() {
    if (this.cursors.up!.isDown) {
      this.engine.powerForward()
    } else if (this.cursors.down!.isDown) {
      this.engine.powerBack()
    } else {
      this.engine.powerOff()
    }
    this.graphics.clear()
    this.graphics.lineStyle(20, 0x2d1607, 0.7)
    this.path.draw(this.graphics, 128)
  }
}
