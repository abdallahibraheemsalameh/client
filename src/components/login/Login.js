import { useState, useContext } from 'react';
import SignUp from './Signup';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { itemContext } from '../../App';
import './login.css';
export default function Login(props) {
  const [showSignup, setShowSignUp] = useState(false);
  const [username, setUserName] = useState('');
  const [userpass, setUserPass] = useState();
  let navigate = useNavigate();
  const { setLoggedUserID } = useContext(itemContext);

  function formHandler(e) {
    e.preventDefault();
    if (username.trim().length === 0 || userpass.length < 5) {
      alert(
        'password must contain 5 digits at least! & username must contains 1 char at least'
      );
    } else {
      Axios.post('http://localhost:3003/getUser', {
        username: username,
        userpass: userpass,
      })
        .then((res) => {
          console.log(res.data.username);
          navigate('/home');
          setLoggedUserID(res.data.username);
          //بدنا نوخذ الداتا ونحطها في الكونكست
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <>
      <div className={showSignup ? 'showsignup' : ''}>
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
          <input type='submit' value='login'></input>
        </form>
        <button onClick={() => setShowSignUp(true)}>sing up</button>
      </div>
      {showSignup && <SignUp onshowSign={() => setShowSignUp(!showSignup)} />}
    </>
  );
}
