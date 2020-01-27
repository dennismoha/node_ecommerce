import React from 'react'
import {Link, withRouter} from 'react-router-dom';

const isActive = (history,path) => {
	if(history.location.pathname === path) {
		return {color: 'red'};
	}else {
		return {color: 'white'};
	}
}

const Menu = ({history}) => (
		<div>
			<ul className="nav nav-tabs bg-success">
				<li className="nav-item">
					<Link className="nav-link"  to='/home' style={isActive(history,'/home')}>Home</Link>
				</li>

				<li className="nav-item">
					<Link className="nav-link" to='/singup' style={isActive(history,'/singup')}>Singup</Link>
				</li>

				<li className="nav-item">
					<Link className="nav-link" to='/login' style={isActive(history,'/login')}>login</Link>
				</li>
			</ul>

		</div>
	) 

export default withRouter(Menu);
