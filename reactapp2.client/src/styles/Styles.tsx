import { makeStyles } from '@material-ui/core/styles';

// Define la clase de estilos para CustomizedTreeView
export const useCustomizedTreeViewStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 150, // Minimum width for the box on mobile devices
        width: '80%', // Default width for the box on mobile devices
        margin: '0 auto', // Center the box horizontally
        [theme.breakpoints.up('sm')]: {
            width: 'auto', // Default width for the box on devices larger than 600px
        },
    },
    header: {
        marginBottom: theme.spacing(2),
    },
    itemsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center', // Alinear elementos verticalmente
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    treeViewContainer: {
        width: '100%',
        maxWidth: 400,
        margin: '0 auto', // Center the TreeView horizontally
    },
    expandButton: {
        margin: 0,
    },
    searchInputContainer: {
        display: 'flex',
        alignItems: 'center', // Alinear elementos verticalmente
        flexGrow: 1, // Para que ocupe todo el espacio disponible
        width: '100%',
        maxWidth: 400, // Limitar el ancho máximo para evitar que se expanda demasiado en pantallas grandes
        marginBottom: theme.spacing(2),
    },
    searchInput: {
        flexGrow: 1, // Para que el cuadro de texto ocupe todo el espacio disponible
        
        marginRight: theme.spacing(1),
    },
}));
