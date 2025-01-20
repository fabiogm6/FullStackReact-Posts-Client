import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes'
import "./App.css";

export default function App() {
  return (

    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>

  );
}


/*
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createpost"> Create A Post</Link>
        <Link to="/">Home Page</Link>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/createpost" exact component={CreatePost} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

*/
