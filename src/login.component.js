import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import google from './images/google.svg';
import {Scoped} from 'kremling';
import {signIn} from './firebase/auth.js';

export default function LoginDialog({user, setUser}) {

  return (
    <Scoped css={css}>
      <Dialog onClose={() => {}} open={!user} aria-labelledby="Login">
        <div class="wrapper">
          <div>
            <Fab
              onClick={() =>
                signIn()
                  .then(setUser)
                  .catch(error => console.error(error))
              }
              color="primary"
              variant="extended"
              aria-label="Login">
              <img src={google} alt="Google" />
              Login with Google
            </Fab>
          </div>
        </div>
      </Dialog>
    </Scoped>
  );
}

const css = `
  & .wrapper {
    padding: 40px 40px 40px 40px;
    text-align: center;
  }
  & img {
    width: 30px;
    margin-right: 16px;
  }
`;
