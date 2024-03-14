import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    addButton: {
        margin: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.75rem', // Tamaño de fuente más pequeño en dispositivos móviles
            padding: theme.spacing(0.5, 1), // Padding más pequeño en dispositivos móviles
        },
    },
    addDialog: {
        [theme.breakpoints.down('xs')]: {
            minWidth: '90%', // Ancho mínimo del diálogo en dispositivos móviles
        },
    },
    addDialogTitle: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem', // Tamaño de fuente más pequeño en dispositivos móviles
        },
    },
    addDialogContent: {
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1), // Padding más pequeño en dispositivos móviles
        },
    },
    addDialogActions: {
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1), // Padding más pequeño en dispositivos móviles
        },
    },
}));

export default useStyles;
