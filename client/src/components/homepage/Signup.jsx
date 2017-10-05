import React from 'react';

const Signup = (props) => (
  <form class="inner" action="/signup" method="post">
	  <div>
	    <p>Sign up here:</p>
	    <label>Name: </label>
	    <input  class="field" type="text" name="name"/>
	  </div>
	  <br/>
	  <div>
	    <label>E-Mail: </label>
	    <input  class="field" type="text" name="email"/>
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

export default Signup;