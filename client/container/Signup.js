import React, { useState, useEffect } from 'react';


const Signup = (props) => {

  const [name, setName] = useState('');
  
  return (
      <div>
        <form id="signup" action="/signup" method="POST">
          <input id="user" name="user" placeholder="user" type="text"></input>
          <button onClick={() => setName(e.target.user)}>
            Sign up
          </button>
        </form>
      </div>
  )
}

export default Signup;