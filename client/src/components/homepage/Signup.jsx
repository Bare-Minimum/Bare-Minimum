import React from 'react';

const Signup = (props) => (
  <form action="/signup" method="post">
	  <div>
	    <p>Sign up here:</p>
	    <label>Name: </label>
	    <input  className="field" type="text" name="name"/>
	  </div>
	  <br/>
	  <div>
	    <label>E-Mail: </label>
	    <input  className="field" type="text" name="email"/>
	  </div>
	  <br/>
	  <div>
	    <label>Password: </label>
	    <input  className="field" type="password" name="password"/>
	  </div>
	  <br/>
	  <div>
	    <input className="button" type="submit" value="Submit"/>
	  </div>
  </form>
)

export default Signup;