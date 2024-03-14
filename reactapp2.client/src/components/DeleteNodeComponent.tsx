/*
* Component: DeleteNodeComponent
* Description: This component is responsible for deleting a node from the tree.
* Props:
*   - nodeId: The ID of the node to be deleted.
*   - name: The name of the node to be deleted.
*   - update: A function to update the tree after deleting the node.
*   - hasChildren: Indicates whether the node has children or not.
*/

import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { environment } from '../environments/enviroment';
import '../css/DeleteNodeComponent.css';
import axios from 'axios';
import useComponentStyles from '../styles/ComponentStyles';
import useStyles from '../styles/DeleteStyles';

interface DeleteNodeProps {
    nodeId: number;
    name: string | undefined;
    hasChildren: boolean | undefined;
    update: (operationType: string) => void;
}

export default function DeleteNodeComponent({ nodeId, name, hasChildren, update }: DeleteNodeProps) {
    const classes = useStyles();
    const components = useComponentStyles();
    // State variable for dialog open state
    const [open, setOpen] = useState(false);

    // Function to handle delete button click
    const handleDeleteButtonClick = () => {
        if (!hasChildren && nodeId !== null && name !== "") {
            setOpen(true);

        }
        else if (nodeId == null || name === "") {
            alert("Please, select a node before deleting");
        }
        else {
            alert("A node with children cannot be deleted");
        }
    };

    // Function to handle cancel button click
    const handleCancelButtonClick = () => {
        setOpen(false);
    };

    // Function to handle delete confirmation button click
    const handleDeleteConfirmClick = () => {
        axios.delete(`${environment.API_URL}/TreeNodes/${nodeId}`)
            .then((result) => {
                if (result.status === 200) {
                    update('delete'); 
                }
            })
            .catch((error) => {
                console.log(error)
            })
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleDeleteButtonClick} className={classes.deleteButton} color="secondary">
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleCancelButtonClick} className={components.dialog}>
                <DialogTitle className={components.dialogTitle}>Delete Node</DialogTitle>
                <DialogContent className={components.dialogContent}>
                    <p>Are you sure you want to delete Node: "{name}"?</p>
                </DialogContent>
                <DialogActions className={components.dialogActions}>
                    <Button onClick={handleCancelButtonClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirmClick} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
