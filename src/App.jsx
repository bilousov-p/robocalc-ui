import './App.css';
import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NewCalculationPage from "./components/NewCalculationPage/NewCalculationPage";
import CalculationPage from "./components/CalculationPage/CalculationPage";

function App() {
  return (
      <Router>
          <Switch>
            <Route path="/calculation/:calculationId">
              <CalculationPage />
            </Route>
            <Route path="/new">
              <NewCalculationPage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
  );
}

export default App;
