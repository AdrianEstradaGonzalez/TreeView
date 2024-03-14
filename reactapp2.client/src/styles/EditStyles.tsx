import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    editDialog: {
        [theme.breakpoints.down('xs')]: {
            minWidth: '90%', // Ancho mínimo del diálogo en dispositivos móviles
        },
    },
}));

export default useStyles;
