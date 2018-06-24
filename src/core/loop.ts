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

export function startLoop() {
  MainLoop.setUpdate(delta => {
    for (const handler of beforeHandlers) {
      handler(delta)
    }
    for (const handler of tickHandlers) {
      handler(delta)
    }
    for (const handler of afterHandlers) {
      handler(delta)
    }
  })
  MainLoop.start()
}
