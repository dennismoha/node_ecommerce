import React from 'react';
import Layout from '../core/layout' //make sure the component is in caps
import {API} from '../config'
const Login = () => (

	<Layout title="login page" description="this is the login page">
		{API}
		
	</Layout>

	)


export default Login;