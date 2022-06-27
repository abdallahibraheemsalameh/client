import './App.css';
import Login from './components/login/Login';
import { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/login/Home';
import Profile from './components/login/profile';
import Additem from './components/login/Additem';
export const itemContext = createContext({});
function App() {
  const [loggedUserID, setLoggedUserID] = useState();
  const [loggedUserItems, setLoggedUserItems] = useState([]);
  // const [loggedUserItems, setLoggedUserItems] = useState([]);

  return (
    <itemContext.Provider
      value={{
        loggedUserID,
        setLoggedUserID,
        loggedUserItems,
        setLoggedUserItems,
      }}
    >
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/additem' element={<Additem />} />
        </Routes>
      </Router>
    </itemContext.Provider>
    // <>hello</>
  );
}

export default App;
