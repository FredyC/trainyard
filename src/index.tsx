import './polyfill'

import { GameState } from 'components/GameState'
import React from 'react'
import { render } from 'react-dom'

import { Game } from './components/Game'
import { createEngine } from './core/engine'

const engine = createEngine()

const rootElement = document.getElementById('root')
render(
  <GameState>{state => <Game engine={engine} state={state} />}</GameState>,
  rootElement,
)
