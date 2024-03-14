/*
* Component: EditNodeComponent
* Description: This component is responsible for editing the properties of a node in the tree.
* Props:
*   - open: A boolean indicating whether the edit dialog is open or not.
*   - setOpen: A function to control the open state of the edit dialog.
*   - nodeId: The ID of the node to be edited.
*   - parentName: The name of the parent node.
*   - currentName: The current name of the node.
*   - parentID: The ID of the parent node.
*   - update: A function to update the tree after editing the node.
*/

import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { environment } from '../environments/enviroment';
import '../css/EditNodeComponent.css'; // Import custom CSS for the component
import axios from 'axios';
import useStyles from '../styles/EditStyles';

interface EditNodeProps {
    open: boolean; // Prop to control the open state of the dialog
    setOpen: (open: boolean) => void;
    nodeId: number | undefined;
    parentName: string | undefined;
    currentName: string | undefined;
    parentID: number | undefined;
    update: (operationType: string) => void;
}

export default function EditNodeComponent({ open, setOpen, nodeId, parentName, currentName, parentID, update }: EditNodeProps) {
    const classes = useStyles();
    const [editedName, setEditedName] = useState('');

    // Function to handle cancel button click
    const handleCancelButtonClick = () => {
        setOpen(false);
        setEditedName('');
    };

    // Function to handle save button click
    const handleSaveButtonClick = () => {
        const updatedNode = {
            "ID":nodeId,
            "name": editedName,
            "parentID": parentID,
            "childs":[]
        };
        axios.put(`${environment.API_URL}/TreeNodes/${nodeId}`, updatedNode)
            .then((result) => {
                if (result.status === 204) {
                    update('edit');
                }
            })
            .catch((error) => {
                console.log(error)
            })
        setOpen(false);
        setEditedName('');
    };

    return (
        <Dialog onClose={handleCancelButtonClick} open={open} className={classes.editDialog}>
            <DialogTitle>Edit Node</DialogTitle>
            <DialogContent>
                <p>Parent name: {parentName}</p>
                <TextField
                    autoFocus
                    margin="dense"
                    id="edited-node-name"
                    label="New name"
                    type="text"
                    fullWidth
                    value={editedName || currentName}
                    onChange={(e) => setEditedName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButtonClick} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveButtonClick} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
