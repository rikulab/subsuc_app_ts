import React from 'react';
import { db } from './firebase';

const Total: React.FC = () => {

  db.collection("subsucs").get().then(function(querySnapshot) {      
    console.log(querySnapshot.docs.length); 
  });

  return (
    <div>
    </div>
  )
}

export default Total

