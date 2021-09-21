import './App.scss';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";
import Main from './Components/Main/Main';
import Coin from './Components/CoinInfo/Coin';

export default function App() {
  return (
    <Router>        
        <Switch>
          <Route exact path="/"> 
            <Main></Main>          
          </Route>
          <Route path="/coin">
            <Coin></Coin>
          </Route>          
        </Switch>      
    </Router>
  );
}
