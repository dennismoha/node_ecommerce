import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Singup from './user/Singup.js';
import Login  from './user/Login.js';
import Home from './core/home'

const Routes = () => {
	return(
		<BrowserRouter>
			<Switch>
				<Route path="/singup" exact component={Singup} />
				<Route path="/login"  exact component={Login}  />
				<Route path="/home" exact component={Home} />

			</Switch>
		</BrowserRouter>


		)
}

export default Routes;


//reference about react route
//https://medium.com/@thejasonfile/basic-intro-to-react-router-v4-a08ae1ba5c42