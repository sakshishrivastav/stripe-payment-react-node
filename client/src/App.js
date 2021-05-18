import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import CheckOutResult from './pages/CheckOutResult';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/products" component={ProductPage} />
          <Route exact path="/checkoutresult" component={CheckOutResult} />
      </Switch>
    </ Router>
      
    </div>
  );
}

export default App;
