import React from 'react'
import {Link, withRouter} from 'react-router-dom';

const Menu = () => (
		<div>
			<ul className="nav nav-tabs bg-primary">
				<li className="nav-item">
					<link className="nav-link" to='/'>Home</link>
				</li>

				<li className="nav-item">
					<link className="nav-link" to='/'>Singup</link>
				</li>

				<li className="nav-item">
					<link className="nav-link" to='/'>login</link>
				</li>
			</ul>

		</div>
	) 

export default withRouter(Menu)
