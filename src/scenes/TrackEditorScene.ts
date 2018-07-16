import Phaser from 'phaser'

import { YardScene } from './YardScene'

export class TrackEditorScene extends Phaser.Scene {
  constructor() {
    super('editor')
  }

  preload() {
    this.load.spritesheet('dragcircle', 'assets/dragcircle.png', {
      frameWidth: 16,
    })
  }

  create() {
    const handles = this.add.group()
    const yardScene = this.scene.get('yard') as YardScene
    const origPath = yardScene.path
    const origStart = origPath.getStartPoint()
    const origJson = origPath.toJSON()

    const updatePath = () => {
      const path = new Phaser.Curves.Path(origStart.x, origStart.y)
      const points = handles.getChildren().map(child => child.getData('vector'))
      path.fromJSON(origJson).splineTo(points)
      yardScene.path = path
      // tslint:disable-next-line:no-console
      console.log(path.toJSON())
    }

    const createPointHandle = (x: number, y: number) => {
      const point = new Phaser.Math.Vector2(x, y)
      const handle = handles
        .create(point.x, point.y, 'dragcircle', 0)
        .setInteractive()

      handle.setData('vector', point)

      this.input.setDraggable(handle)
    }

    this.input.on(
      'pointerdown',
      (
        pointer: Phaser.Input.Pointer,
        gameObjects: Phaser.GameObjects.GameObject[],
      ) => {
        //  Check we didn't click an existing handle
        if (gameObjects.length > 0) {
          return
        }

        createPointHandle(pointer.x, pointer.y)
        updatePath()
      },
    )

    this.input.on(
      'dragstart',
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Sprite,
      ) => {
        gameObject.setFrame(1)
      },
    )

    this.input.on(
      'drag',
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Sprite,
        dragX: number,
        dragY: number,
      ) => {
        gameObject.x = dragX
        gameObject.y = dragY

        gameObject.getData('vector').set(dragX, dragY)
        updatePath()
      },
    )

    this.input.on(
      'dragend',
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Sprite,
      ) => {
        gameObject.setFrame(0)
      },
    )
  }
}
