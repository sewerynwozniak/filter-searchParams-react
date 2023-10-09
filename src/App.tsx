import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";


function App() {


  return (

    <Router>
    <div>

      <Routes>
        <Route path="/" element={<Home/>}>
        </Route>
      </Routes>
    </div>
  </Router>


  );
}

export default App;




