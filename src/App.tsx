import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from "./firebase";
import { FormControl, TextField } from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";


const App: React.FC = () => {
  const [subsucs, setSubsucs] = useState([{ id: "", title: "", price: "" }]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");


  useEffect(()=> {
    const unSub = db.collection("subsucs").onSnapshot((snapshot)=>{
      setSubsucs(
        snapshot.docs.map((doc)=> ({id: doc.id, title: doc.data().title, price: doc.data().price }))
      );
    });
    return () => unSub();
  },[]);

  const addSubsuc = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("subsucs").add({ title: title, price: price });
    setTitle("");
    setPrice("");
  };

  return (
    <div className="App">
      <h1>Subsuc App</h1>
      <FormControl>
        <TextField 
          InputLabelProps={{
            shrink: true,
          }}
          label="Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        <TextField 
          InputLabelProps={{
            shrink: true,
          }}
          type="number"
          label="Price"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
        />
      </FormControl>
      <button disabled={!title} onClick={addSubsuc}>
        <AddToPhotosIcon />
      </button>
      {subsucs.map((subsuc)=>
      <h3 key={subsuc.id}>{subsuc.title}</h3>
      )}
      {subsucs.map((subsuc)=>
      <h4 key={subsuc.id}>{subsuc.price}</h4>
      )}
    </div>
  );
};

export default App;
