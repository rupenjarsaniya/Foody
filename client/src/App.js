import React, { useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Components/customer/Header';
import Footer from './Components/customer/Footer';
import Home from './Components/customer/Home';
import Account from './Components/customer/Account';
import Cart from './Components/customer/Cart';
import Wishlist from './Components/customer/Wishlist';
import Login from './Components/customer/Login';
import Signup from './Components/customer/Signup';
import Newpassword from './Components/customer/Newpassword';
import Error from './Components/customer/Error';
import Basket from './Components/customer/Basket';
import FoodState from './context/foody/FoodState';
import LoadingBar from 'react-top-loading-bar'
import FoodManagement from './Components/restaurant/FoodManagement';

function App() {
  const [loadingBar, setloadingBar] = useState(0);

  return (
    <>
      <FoodState>
        <Router>
          <Header />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={loadingBar}
            onLoaderFinished={() => setloadingBar(0)}
          />
          <Basket setloadingBar={setloadingBar} />
          <Switch>
            <Route exact path="/login">
              <Login setloadingBar={setloadingBar} />
            </Route>
            <Route exact path="/signup">
              <Signup setloadingBar={setloadingBar} />
            </Route>
            <Route exact path="/account">
              <Account setloadingBar={setloadingBar} />
            </Route>
            <Route exact path="/Cart">
              <Cart setloadingBar={setloadingBar} />
            </Route>
            <Route exact path="/wishlist">
              <Wishlist setloadingBar={setloadingBar} />
            </Route>
            <Route exact path="/newpassword">
              <Newpassword setloadingBar={setloadingBar} />
            </Route>
            <Route exact path="/foodmanagement">
              <FoodManagement setloadingBar={setloadingBar} />
            </Route>
            <Route exact path="/">
              <Home setloadingBar={setloadingBar} />
            </Route>
            <Route>
              <Error />
            </Route>
          </Switch>
          <Footer />
        </Router >
      </FoodState >
    </>
  );
}

export default App;
