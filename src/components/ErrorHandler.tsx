import React, { ErrorInfo } from 'react'

export class ErrorHandler extends React.Component {
  componentDidCatch(err: Error, info: ErrorInfo) {
    // tslint:disable-next-line:no-console
    console.error(err)
    // tslint:disable-next-line:no-console
    console.log(info.componentStack)
  }
  render() {
    return this.props.children
  }
}
