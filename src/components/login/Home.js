import React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { itemContext } from '../../App';
import Axios from 'axios';
import './profile.css';
function Home() {
  const user = useContext(itemContext);

  useEffect(() => {
    Axios.get('http://localhost:3003/readItems')
      .then((response) => {
        user.setLoggedUserItems([...response.data]);
        // console.log(...response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <nav>
        <a href='#'>home</a>
        <Link to='/profile'>Profile</Link>
      </nav>
      <h3>public items🔽</h3>
      <div>
        <ul>
          {user.loggedUserItems.map((i) => {
            return (
              <li>
                <span>item name: {i.itemName}</span>
                {'   '}
                <span>Price: {i.price}</span>
                {'   '}
                <span>item description: {i.description}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Home;
