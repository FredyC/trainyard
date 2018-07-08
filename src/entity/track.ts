import { Bodies, Composite } from 'matter-js'

// const createTrack = (x: number, y: number, length: number, degrees: number) => {
//   return Bodies.rectangle(x + length / 2, y, length, 3, {
//     angle: toRadians(degrees),
//     isStatic: true,
//     isSensor: true,
//     render: {
//       strokeStyle: '#333333',
//       fillStyle: 'none',
//       lineWidth: 1,
//     },
//   })
// }

const createBreak = (x: number, y: number) => {
  const size = 40
  return Bodies.rectangle(x, y, size, size, {
    isStatic: true,
    isSensor: true,
    render: {
      fillStyle: 'none',
      lineWidth: 0,
    },
  })
}

export function createTracks() {
  const tracks = Composite.create({
    bodies: [createBreak(300, 100)],
  })

  // const tracks = Composite.create({
  //   bodies: [createTrack(x, y, 200, 180), createTrack(x + 199, y + 8, 50, 200)],
  // })
  return tracks
}
