import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { itemContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import Axios from 'axios';
function Profile() {
  let navigate = useNavigate();
  const user = useContext(itemContext);
  const userID = user.loggedUserID;
  const [userItems, setUserItems] = useState([]);
  //   console.log(userID);
  useEffect(() => {
    Axios.post('http://localhost:3003/readOwnerItems', {
      username: userID,
    })
      .then((res) => {
        // console.log(res.data);
        setUserItems(() => [...res.data]);
        //بدنا نوخذ الداتا ونحطها في الكوننكست
      })
      .catch((err) => console.log(err));
  }, []);

  const updateHandler = async (id, itemname, price, description) => {
    console.log(itemname, id);
    const newItemName = await prompt(
      `enter new item name. current name is ${itemname}`
    );
    const newItemPrice = await prompt(
      `enter new item price. current price is ${price}`
    );
    const newItemDescription = await prompt(
      `enter new item description. current description is ${description}`
    );
    Axios.put('http://localhost:3003/update', {
      newItemName: newItemName,
      newItemPrice: Number(newItemPrice),
      newItemDescription: newItemDescription,
      id: id,
    }).then(() => {
      console.log(userItems);

      setUserItems(
        userItems.map((i) => {
          return i._id === id
            ? {
                _id: id,
                itemName: newItemName,
                price: newItemPrice,
                description: newItemDescription,
                owner: i.owner,
              }
            : i;
        })
      );
    });
  };

  function deleteHandler(id) {
    Axios.delete(`http://localhost:3003/delete/${id}`).then(() =>
      setUserItems(
        userItems.filter((i) => {
          return i._id !== id;
        })
      )
    );
  }
  return (
    <div>
      <div>
        <button onClick={() => navigate('/additem')}>
          Add Item <span style={{ color: 'red', fontSize: '20px' }}>+</span>
        </button>
        {/* <h3>items of {userItems[0].owner}</h3> */}
      </div>
      <ul>
        {userItems.map((i) => {
          return (
            <li key={i._id}>
              <span>item name: {i.itemName}</span>
              {'   '}
              <span>Price: {i.price}</span>
              {'   '}
              <span>item description: {i.description}</span>
              {'             '}
              <button
                style={{ color: 'blue' }}
                onClick={() =>
                  updateHandler(i._id, i.itemName, i.price, i.description)
                }
              >
                Update
              </button>
              {'  '}
              <button
                style={{ color: 'red' }}
                onClick={() => deleteHandler(i._id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Profile;
