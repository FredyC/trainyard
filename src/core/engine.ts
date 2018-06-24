import { Engine } from 'matter-js'

import { tick, TickHandler } from './loop'

export const createEngine = () => {
  const engine = Engine.create()
  engine.world.gravity.y = 0
  const updateEngine: TickHandler = delta => {
    Engine.update(engine, delta)
  }
  tick(updateEngine)
  return engine
}
