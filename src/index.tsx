import './index.css'

import Phaser from 'phaser'
import { YardScene } from 'scenes/YardScene'

const game = new Phaser.Game({
  title: 'Yard Master',
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: YardScene,
})

window.addEventListener('resize', event =>
  game.resize(window.innerWidth, window.innerHeight),
)
