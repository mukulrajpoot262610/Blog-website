import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Userprofile from './pages/Userprofile';
import Post from './pages/Post';
import Settings from './pages/Settings';
import { useSelector, useDispatch } from 'react-redux'
import AddPost from './pages/AddPost'
import { useEffect } from 'react';
import { setCurrentUser, setAuth } from './store/store'
import About from './pages/About';
import Contacts from './pages/Contacts';
import Soon from './pages/Soon';

function App() {

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const fetchUser = async () => {
      // GETTING AUTH USER DATA
      const userRes = await fetch(`/api/auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-auth-token': localStorage.getItem('TOKEN')
        }
      })

      const userData = await userRes.json()
      if (userRes.status === 200) {
        dispatch(setCurrentUser(userData.user))
        dispatch(setAuth(true))
      }
    }

    fetchUser()
  }, [dispatch, history])

  const state = useSelector(state => state.isAuthenticated)

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/enter' component={Login} />
        <Route exact path='/register' component={Signup} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contacts' component={Contacts} />
        <Route exact path='/soon' component={Soon} />
        <Route exact path='/user'>
          {state ? <Userprofile /> : <Login />}
        </Route>
        <Route exact path="/new">
          {state ? <AddPost /> : <Login />}
        </Route>
        <Route exact path='/post/:id' component={Post} />
        <Route exact path='/settings'>
          {state ? <Settings /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
