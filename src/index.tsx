import './index.css'

import Phaser from 'phaser'
import { YardScene } from 'scenes/YardScene'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: YardScene,
  backgroundColor: '#222222',
  title: 'Yard Master',
})

window.addEventListener('resize', event =>
  game.resize(window.innerWidth, window.innerHeight),
)
