import React,{useState} from 'react';
import Layout from '../core/layout'
import {API} from '../config'
import axios from 'axios'

const Singup = () => {



	const [values, setValues] = useState({
		name : "",
		email: "",
		hashed_password: "",
		error : "",
		success: false
	})

	//high order function _ function that returns another function
	//the function below returns both the name and the event functions

	const handleChange = name => event => {
		setValues({...values,error:false,[name]: event.target.value})
	}

	//whenever a change happens in the form, it gets grabbed by the handlechange function

	const {name, email, hashed_password} = values //grabbing name, email,pass from values in the state
	
	const singup = (name, email,hashed_password) => {
		console.log(name,email,hashed_password)
		axios({

			method: 'POST',
			url : "http://localhost:8080/auth/Singup/",
			headers: {
				'Accept': 'application/json',
   				 'Content-Type': 'application/json',
			},
			data: JSON.stringify({name,email,hashed_password})
		})
		.then(response => {	
			console.log(response)
;		
			return response.json()
			//return response.text();
		})
		
		.catch(error=> {
			console.log(error)
		})

	}
	const clickSubmit = event => {
		event.preventDefault();
		singup(name,email,hashed_password)
	}


	const SingupForm = () => (
			<form>
				<div class = "form-group">
					<label for="name" className="text-muted">name </label>
					<input type="text" onChange={handleChange("name")} className="form-control" />
				</div>

				<div class = "form-group">
					<label for="email" className="text-muted">email </label>
					<input type="email" onChange={handleChange("email")} className="form-control" />
				</div>

				<div class = "form-group">
					<label for="hashed_password" className="text-muted">password</label>
					<input type="password" onChange={handleChange("hashed_password")} className="form-control" />
				</div>
				<br />
				<button onClick={clickSubmit} className="btn btn-success" type="submit">submit</button>


			</form>

		)
	return(
			<Layout title="Singup page" description="signup page" className="container col-md-8 offset-md-2">	
				<p> this is the singup form </p>
				 {SingupForm()} 
				{JSON.stringify(values)}
			</Layout>
		)

		
}

export default Singup;