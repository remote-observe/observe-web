import React, {useState, useEffect} from 'react';
import {UserContext, getUser, hasAccess} from './firebase/auth.js';
import Typography from '@material-ui/core/Typography';
import LoginDialog from './login.component.js';
import Navbar from './navbar.component.js';
import Observatory from './observatory/observatory.component.js';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [userHasAccess, setHasAccess] = useState(false);

  useEffect(
    () => {
      if (user)
        hasAccess(user)
          .then(setHasAccess)
          .catch(console.error.bind(console));
    },
    [user],
  );

  return (
    <UserContext.Provider value={{user, userHasAccess}}>
      <Navbar user={user} />
      {userHasAccess ? (
        <Observatory />
      ) : user ? (
        <div>
          <Typography variant="h3" gutterBottom>
            You do not have access!
          </Typography>
          <div>Public information about the observatory</div>
        </div>
      ) : <div>Public information about the observatory</div>}
      <LoginDialog user={user} setUser={setUser} />
    </UserContext.Provider>
  );
}
