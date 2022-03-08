
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Pages
import {
  Register,
  Dashboard,
  Home,
  Edit,
  PrivateRoute,
  Error,
} from './Pages/index'

function App() {
  // const { ...state } = useGlobalContext()
  // console.log(state.user)

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/dashboard' exact>
          <Dashboard />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/edit/:id'>
          <Edit />
        </Route>

        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
