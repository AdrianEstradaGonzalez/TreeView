import { makeStyles } from '@material-ui/core/styles';

// Estilos para el cuadro de diálogo
const useComponentStyles = makeStyles((theme) => ({
    dialog: {
        [theme.breakpoints.down('xs')]: {
            minWidth: '90%', // Ancho mínimo del diálogo en dispositivos móviles
        },
    },
    dialogTitle: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem', // Tamaño de fuente más pequeño en dispositivos móviles
        },
    },
    dialogContent: {
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1), // Padding más pequeño en dispositivos móviles
        },
    },
    dialogActions: {
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1), // Padding más pequeño en dispositivos móviles
        },
    },
}));

export default useComponentStyles;
