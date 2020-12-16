import React, { useState } from 'react'
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from './firebase';
import './style.module.scss';


interface PROPS {
    id: string;
    title: string;
    price: string;
}

const SubsucItem:React.FC<PROPS> = (props) => {
    const [title, setTitle] = useState(props.title);
    const [price, setPrice] = useState(props.price);

    const editItem = () => {
        db.collection("subsucs").doc(props.id).set({title: title, price: price});
    }

    const deleteItem = () => {
        db.collection("subsucs").doc(props.id).delete();
    }
    
    return (
        <div>
            <ListItem>
                <h2>{props.title}</h2>
                <h2>{props.price}</h2>
                <Grid container justify="flex-end">
                    <TextField 
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="Edit Title"
                    value={title}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}
                    />
                    <TextField 
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="Edit price"
                    value={price}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPrice(e.target.value)}
                    />
                </Grid>
                <button onClick={editItem}>
                    <EditOutlinedIcon />
                </button>
                <button onClick={deleteItem}>
                    <DeleteOutlineOutlinedIcon />
                </button>
            </ListItem>
            
        </div>
    )
}

export default SubsucItem;
