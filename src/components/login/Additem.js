import React from 'react';
import { useState, useContext } from 'react';
import Axios from 'axios';
import { itemContext } from '../../App';

function Additem() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemDescription, setItemDescription] = useState('');
  const user = useContext(itemContext);

  function formHandler(e) {
    e.preventDefault();
    if (itemName.trim().length === 0) {
      alert('user name error');
    } else {
      Axios.post('http://localhost:3003/addItem', {
        owner: user.loggedUserID,
        itemName: itemName,
        itemPrice: itemPrice,
        itemDiscription: itemDescription,
      })
        .then((res) => {
          //   user.setLoggedUserItems(() => [
          //     ...user.loggedUserItems,
          //     {
          //       owner: user.loggedUser,
          //       itemName: itemName,
          //       price: itemPrice,
          //       description: itemDescription,
          //     },
          //   ]);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <>
      <form onSubmit={formHandler}>
        <label htmlFor='itemname'>item name </label>
        <input
          type='text'
          id='itemname'
          onChange={(e) => setItemName(e.target.value)}
        ></input>

        <label htmlFor='itemprice'> item price</label>
        <input
          type='number'
          id='itemprice'
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        ></input>

        <label htmlFor='itemdescription'>description</label>
        <input
          type='text'
          id='itemdescription'
          onChange={(e) => setItemDescription(e.target.value)}
          placeholder='optional'
        ></input>

        <input type='submit' value='ADD'></input>
      </form>
    </>
  );
}

export default Additem;
