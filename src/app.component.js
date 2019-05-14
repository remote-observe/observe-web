import React, {useState, useEffect} from 'react';
import {UserContext, useLoggedInUser, hasAccess} from './firebase/auth.js';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoginDialog from './login.component.js';
import Navbar from './navbar.component.js';
import Observatory from './observatory/observatory.component.js';

export default function App() {
  const [user, loading] = useLoggedInUser();
  const [userHasAccess, setHasAccess] = useState(null);
  console.log('loading', loading);

  useEffect(
    () => {
      if (user)
        hasAccess(user)
          .then(setHasAccess)
          .catch(console.error.bind(console));
    },
    [user],
  );

  console.log(user);

  return (
    <UserContext.Provider value={{user, userHasAccess}}>
      <Navbar user={user} />
      {(loading || userHasAccess == null) ? (
        <div style={{marginTop: 300, display: 'flex', justifyContent: 'center'}}>
          <CircularProgress />
        </div>
      ) : userHasAccess ? (
        <Observatory />
      ) : user ? (
        <div>
          <Typography variant="h3" gutterBottom>
            You do not have access!
          </Typography>
          <div>Public information about the observatory</div>
        </div>
      ) : (
        <div>Public information about the observatory</div>
      )}
      {!loading && <LoginDialog user={user} />}
    </UserContext.Provider>
  );
}
