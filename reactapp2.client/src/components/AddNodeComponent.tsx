/*
* Component: AddNodeComponent
* Description: This component is responsible for adding a new node to the tree.
* Props:
*   - parentId: The ID of the parent node under which the new node will be added.
*   - name: The name of the parent node.
*   - update: A function to update the tree after adding the new node.
*/

import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { environment } from '../environments/enviroment';
import '../css/AddNodeComponent.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

// Define custom styles using makeStyles hook
const useStyles = makeStyles((theme) => ({
    addButton: {
        margin: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.75rem', // Smaller font size on mobile devices
            padding: theme.spacing(0.5, 1), // Smaller padding on mobile devices
        },
    },
    addDialog: {
        [theme.breakpoints.down('xs')]: {
            minWidth: '90%', // Minimum width of the dialog on mobile devices
        },
    },
    addDialogTitle: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem', // Smaller font size on mobile devices
        },
    },
    addDialogContent: {
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1), // Smaller padding on mobile devices
        },
    },
    addDialogActions: {
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1), // Smaller padding on mobile devices
        },
    },
}));
interface AddNodeProps {
    parentId: number; 
    name: string | undefined;
    update: (operationType: string) => void;
}

export default function AddNodeComponent({parentId, name, update }: AddNodeProps) {
    // State variables
    const classes = useStyles();
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
            <Button onClick={handleAddButtonClick} className={classes.addButton} variant="contained" color="primary">
                +
            </Button>
            <Dialog open={open} onClose={handleCancelButtonClick} className={classes.addDialog}>
                <DialogTitle className={classes.addDialogTitle}>Add New Node</DialogTitle>
                <DialogContent className={classes.addDialogContent}>
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
                <DialogActions className={classes.addDialogActions}>
                    <Button onClick={handleCancelButtonClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveButtonClick} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}