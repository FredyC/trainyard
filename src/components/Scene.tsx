import './Scene.css'

import { Engine, IRendererOptions, Render } from 'matter-js'
import React from 'react'

interface IProps {
  engine: Engine
}

const renderOptions: IRendererOptions = {
  // @ts-ignore
  showAngleIndicator: true,
  showVelocity: true,
  showPositions: true,
  wireframes: process.env.NODE_ENV === 'development',
}

export class Scene extends React.PureComponent<IProps> {
  canvasRef = React.createRef<HTMLCanvasElement>()
  componentDidMount() {
    const render = Render.create({
      canvas: this.canvasRef.current!,
      engine: this.props.engine,
      options: {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
        ...renderOptions,
      },
    })
    Render.run(render)
  }
  render() {
    return <canvas ref={this.canvasRef} />
  }
}
