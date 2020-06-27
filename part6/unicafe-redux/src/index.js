import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const dispatchStore = actionType => {
    store.dispatch({
      type: actionType
    })
  }

  return (
    <div>
      <button onClick={() => dispatchStore('GOOD')}>good</button> 
      <button onClick={() => dispatchStore('OK')}>neutral</button> 
      <button onClick={() => dispatchStore('BAD')}>bad</button>
      <button onClick={() => dispatchStore('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
