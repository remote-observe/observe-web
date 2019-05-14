import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { db } from '../firebase/auth.js';

export default function Observatory() {
  const [ obsData, setObsData ] = useState(null);

  useEffect(() =>
    db
      .collection('observatories')
      .where("name", "==", "rovor")
      .onSnapshot(({docs}) => {
        setObsData(docs[0].data())
      }),
    []
  );

  return <div>
    <Typography variant="h4" gutterBottom>
      Live observatory information
    </Typography>
    <Typography variant="h5" gutterBottom>
<pre>{JSON.stringify(obsData, null, '  ')}</pre>
    </Typography>
  </div>
}
