// import { Container } from 'react-bootstrap';
// import Register from './Components/Register';
// import Footer from './Components/Footer';
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Unsubscribe from './Components/Unsubscribe';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import FileNotFound from './Components/FileNotFound';
require('dotenv').config();
function App() {
  

  return (
    <>

    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/unsubscribe/:id" component={Unsubscribe}>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route component={FileNotFound} />
        </Switch>
      </div>
    </Router>


      {/* <h2 align="center" className="mb-4 mt-4">Covid19 Vaccination Alert</h2>
      <Container className="d-xl-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Register></Register>
        </div>
      </Container>
      <Footer></Footer> */}
    </>
  );
}

export default App;
