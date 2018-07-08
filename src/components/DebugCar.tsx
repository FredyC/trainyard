import React from 'react'
import { ObjectInspector } from 'react-inspector'
import styled from 'styled-components'

interface IProps {
  before: any
  after: any
}

const Before = styled.div`
  position: absolute;
  right: 320px;
  top: 100px;
  width: 300px;
  overflow-x: hidden;
  white-space: nowrap;
`

const After = styled.div`
  position: absolute;
  right: 10px;
  top: 100px;
  width: 300px;
  overflow-x: hidden;
  white-space: nowrap;
`

export const DebugCar: React.SFC<IProps> = ({ before, after }) => (
  <>
    <Before>
      <ObjectInspector
        data={before}
        name="BEFORE"
        expandLevel={2}
        theme="chromeDark"
      />
    </Before>
    <After>
      <ObjectInspector
        data={after}
        name="AFTER"
        expandLevel={2}
        theme="chromeDark"
      />
    </After>
  </>
)
