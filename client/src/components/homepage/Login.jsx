import React from 'react';

const Login = (props) => (
  <form action="/login" method="post">
	  <div>
	    <p>Login here!</p>
	    <label>E-Mail: </label>
	    <input type="text" name="email"/><br/>
	  </div>
	  <div>
	    <label>Password: </label>
	    <input type="password" name="password"/>
	  </div>
	  <div>
	    <input type="submit" value="Submit"/>
	  </div>
  </form>
)

export default Login;