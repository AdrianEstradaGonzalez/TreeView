/*
* Component: AddNodeComponent
* Description: This component is responsible for adding a new node to the tree.
* Props:
*   - parentId: The ID of the parent node under which the new node will be added.
*   - name: The name of the parent node.
*   - update: A function to update the tree after adding the new node.
*/

import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { environment } from '../environments/enviroment';
import '../css/AddNodeComponent.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import useStyles from '../styles/AddStyles';
import useComponentStyles from '../styles/ComponentStyles';

interface AddNodeProps {
    parentId: number; 
    name: string | undefined;
    update: (operationType: string) => void;
}

export default function AddNodeComponent({parentId, name, update }: AddNodeProps) {
    // State variables
    const classes = useStyles();
    const components = useComponentStyles();

    const [open, setOpen] = useState(false); // Dialog open state
    const [nodeName, setNodeName] = useState(''); // New node name

    // Function to handle add button click
    const handleAddButtonClick = () => {
        setOpen(true);
    };

    // Function to handle cancel button click
    const handleCancelButtonClick = () => {
        setOpen(false);
        setNodeName('');
    };

    // Function to handle save button click
    const handleSaveButtonClick = () => {
      const newNode = {
          "name": nodeName,
          "parentID": parentId,
          "childs":[]
      };
  
      axios.post(`${environment.API_URL}/TreeNodes`, newNode)
          .then((result) => {
              if (result.status === 201) {
                  update('add');
              }
          })
          .catch((error) => {
              console.log(error);
          });
  
      setOpen(false);
      setNodeName('');
  };

    return (
        <>
            <IconButton onClick={handleAddButtonClick} className={classes.addButton} color="primary">
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleCancelButtonClick} className={components.dialog}>
                <DialogTitle className={components.dialogTitle}>Add New Node</DialogTitle>
                <DialogContent className={components.dialogContent}>
                    <p>Parent name: {name}</p>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="node-name"
                        label="Node name"
                        type="text"
                        fullWidth
                        value={nodeName}
                        onChange={(e) => setNodeName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions className={components.dialogActions}>
                    <Button onClick={handleCancelButtonClick} color="primary">
                            Cancel
                    </Button>
                    <Button onClick={handleSaveButtonClick} color="secondary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
