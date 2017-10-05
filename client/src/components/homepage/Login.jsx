import React from 'react';

const Login = (props) => (
  <form  class="inner" action="/login" method="post">
	  <div>
	    <p>Login here:</p>
	    <label>E-Mail: </label>
	    <input class="field" type="text" name="email"/><br/>
	  </div>
	  <br/>
	  <div>
	    <label>Password: </label>
	    <input  class="field" type="password" name="password"/>
	  </div>
	  <br/>
	  <div>
	    <input class="button" type="submit" value="Submit"/>
	  </div>
  </form>
)

export default Login;