import React from 'react';

const Signup = (props) => (
  <form action="/signup" method="post">
	  <div>
	    <p>Sign up here!</p>
	    <label>Name: </label>
	    <input type="text" name="name"/>
	  </div>
	  <div>
	    <label>E-Mail: </label>
	    <input type="text" name="e-mail"/>
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

export default Signup;