import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";


const categories = [
  {
      id: 1,
      category: 'Programming'
  },
  {
      id: 2,
      category: 'Medicine'
  },
  {
      id: 3,
      category: 'Sports'
  },
  {
      id: 4,
      category: 'Writing'
  },
  {
      id: 5,
      category: 'Education'
  },
  {
      id: 6,
      category: 'Music'
  },
  {
      id: 7,
      category: 'Health'
  },
  {
      id: 8,
      category: 'Other'
  } 
]


function App() {
  const { userInfo } = useSelector(state => state.user)
  
  return (

      <Router>
        <Topbar />
        <Switch>
          <Route exact path="/"><Home categories={categories}/></Route>
          <Route path="/register">{userInfo?.username ? <Home /> : <Register />}</Route>
          <Route path="/login">{userInfo?.username  ? <Home /> : <Login />}</Route>
          <Route path="/write">{userInfo?.username ? <Write /> : <Register />}</Route>
          <Route path="/settings">{userInfo?.username ? <Settings /> : <Register />}</Route>
          <Route path="/posts/:postId"><Single /></Route>
        </Switch>
      </ Router>
  );
}

export default App;
