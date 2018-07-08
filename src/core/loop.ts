import MainLoop from 'mainloop.js'

export type TickHandler = (delta: number) => void

type Handlers = TickHandler[]

const beforeHandlers: Handlers = []
export function beforeTick(handler: TickHandler) {
  beforeHandlers.push(handler)
}

const afterHandlers: Handlers = []
export function afterTick(handler: TickHandler) {
  afterHandlers.push(handler)
}

const tickHandlers: Handlers = []
export function tick(handler: TickHandler) {
  tickHandlers.push(handler)
}

export function executeTick(delta: number) {
  for (const handler of beforeHandlers) {
    handler(delta)
  }
  for (const handler of tickHandlers) {
    handler(delta)
  }
  for (const handler of afterHandlers) {
    handler(delta)
  }
}

export function startLoop() {
  MainLoop.setUpdate(executeTick)
  MainLoop.start()
}

export function stopLoop() {
  MainLoop.stop()
}

export function isRunning() {
  return MainLoop.isRunning()
}

export function toggleLoop() {
  if (MainLoop.isRunning()) {
    MainLoop.start()
    return true
  } else {
    MainLoop.stop()
    return false
  }
}
