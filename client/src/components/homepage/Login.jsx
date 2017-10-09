import React from 'react';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const Login = (props) => (
	<Col md={4} mdOffset={4} className="credentials-box">
		<h3>Login here:</h3>
		<form  action="/login" method="post">

			<div className="form-entry">
				<label>E-Mail: </label>
				<input className="field" type="text" name="email"/>
			</div>

			<div className="form-entry">
				<label>Password: </label>
				<input className="field" type="password" name="password"/>
			</div>

			<div className="form-entry">
				<Button type="submit" value="Submit">Submit</Button>
			</div>
		</form>
	</Col>
)

export default Login;
