import { useState } from 'react';
import Axios from 'axios';
export default function SignUp(props) {
  const [username, setUserName] = useState('');
  const [userpass, setUserPass] = useState();

  function formHandler(e) {
    e.preventDefault();
    if (username.trim().length === 0 || userpass.length < 5) {
      alert(
        'password must contain 5 digits at least! & username must contains 1 char at least'
      );
    } else {
      Axios.post('http://localhost:3003/newUser', {
        username: username,
        userpass: userpass,
      }).then((res) => console.log(res));
      props.onshowSign();
    }
  }

  return (
    <form onSubmit={formHandler}>
      <input
        type='text'
        placeholder='username'
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <input
        type='password'
        placeholder='password'
        onChange={(e) => setUserPass(e.target.value)}
      ></input>
      <input type='submit' value='signup'></input>
    </form>
  );
}
