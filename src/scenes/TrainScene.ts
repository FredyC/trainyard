import { YardScene } from './YardScene'

export class TrainScene extends Phaser.Scene {
  preload() {
    this.load.image('loco', 'assets/train_011.png')
  }
  create() {
    this.createEngine()
  }
  createEngine() {
    // const engineCar = new EngineCar(this.scene.scene, 0, 0, 'loco')
    // this.add.existing(engineCar)
  }
  getPoint(position: number) {
    const { path } = this.scene.get('yard') as YardScene
    return path.getPoint(position)
  }
}
