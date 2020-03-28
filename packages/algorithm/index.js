import React, { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import Loading from './components/Loading'
import Provider from './contexts'

import 'normalize.css/normalize.css'
import './globals/normalize.css'

// // import './globals/variables.sass'
// // import './globals/buttons.sass'

// // import './sass/onedark.sass'
// // import './sass/editor.sass'

const Docs = lazy(() => import('./containers/Docs'))
const Console = lazy(() => import('./containers/Console'))
const TabsAndEditor = lazy(() => import('./containers/TabsAndEditor'))
const exact = true

function Root() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Provider>
          <Switch id="content-menu" class="content" contentId="content-menu" main>
            <Route component={Docs} path="/docs" exact={exact} />
            <Route component={Console} path="/console" exact={exact} />
            <Route component={TabsAndEditor} path="/" exact={exact} />
          </Switch>
        </Provider>
      </Suspense>
    </Router>
  )
}

render(
  <Root />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (window.location.protocol === 'file:') serviceWorker.unregister()
else serviceWorker.register()
// serviceWorker.register()
