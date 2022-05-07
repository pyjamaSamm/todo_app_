import {
    List,
    ListItemText,
    ListItem,
    ListItemAvatar,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
import todo__list from "./todo.css"

const Todo = ({ arr }) => {
    return (
        <List className="todo__list">
            <ListItem>
                <ListItemAvatar />
                <ListItemText primary={arr.item.todo} secondary={arr.item.todo} />
            </ListItem>
            <DeleteIcon
                fontSize="large"
                style={{ color: "#1e5162"  }}
                onClick={() =>
                    deleteDoc(doc(db, "todos", arr.id))
                }
            />
        </List>
    )
};

export default Todo;