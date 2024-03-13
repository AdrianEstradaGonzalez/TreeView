import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import AddNodeComponent from './components/AddNodeComponent';
import DeleteNodeComponent from './components/DeleteNodeComponent';
import EditNodeComponent from './components/EditNodeComponent';
import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';
import './css/CustomizedTreeView.css';
import { useState, useEffect, Fragment } from 'react';
import { environment } from './environments/enviroment';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomSvgIcons } from './styles/CustomSvgIcons';
import { useCustomizedTreeViewStyles } from './styles/Styles';
import { NodeDto } from './interfaces/NodeDto';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

// Main component
export default function CustomizedTreeView() {
    const classes = useCustomizedTreeViewStyles();
    // States
    const [selectedNodeID, setSelectedNode] = useState<number>(0);
    const [selectedName, setSelectedName] = useState<string>();
    const [treeNodes, setTreeNodes] = useState<NodeDto[]>([]);
    const [parentName, setParentName] = useState<string>();
    const [parentId, setParentId] = useState<number>();
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

    useEffect(() => {
        fetchTreeNodes('get');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // Fetch tree nodes from the API
    /*
     * Fetch tree nodes from the API based on the specified operation type.
     * @param operationType: string - Type of operation ('get', 'add', 'delete', 'edit')
     */
    const fetchTreeNodes = async (operationType: string) => {
        try {
            const response = await axios.get(`${environment.API_URL}/TreeNodes`);
            const data = await response.data;
            setTreeNodes(organizeTreeNodes(data));
            setSelectedNode(0);
            setSelectedName("");
            switch (operationType) {
                case 'add':
                    toast.success('Node added successfully');
                    break;
                case 'delete':
                    toast.error('Node deleted successfully');
                    break;
                case 'edit':
                    toast.info('Node updated successfully');
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Organize tree nodes
    /*
     * Organize tree nodes into a hierarchical structure based on their parent-child relationships.
     * @param nodes: NodeDto[] - Array of nodes to organize
     * @returns NodeDto[] - Array of root nodes representing the organized tree structure
     */
    const organizeTreeNodes = (nodes: NodeDto[]): NodeDto[] => {
        const treeMap = new Map<number, NodeDto>();

        // Build a map for easy access to nodes by their ID
        nodes.forEach(node => treeMap.set(node.id, node));

        // Filter root nodes (nodes without a parent)
        const rootNodes: NodeDto[] = [];

        for (let i: number = 0; i < nodes.length; i = i + 1) {
            if (nodes[i].parentId === undefined || nodes[i].parentId === 0 ) {
                rootNodes.push(nodes[i]);
            }
        }


        return rootNodes;
    };
    

    // Find a node by its ID
    /*
     * Find a node by its ID in the given array of nodes.
     * @param nodes: Node[] - Array of nodes to search in
     * @param id: number - ID of the node to find
     * @returns Node | undefined - The node with the specified ID, or undefined if not found
     */
    const findNodeById = (nodes: NodeDto[], id: number): NodeDto | undefined => {
        for (const node of nodes) {
            if (node.id === id) {
                return node;
            }
            if (node.childs) {
                const foundNode = findNodeById(node.childs, id);
                if (foundNode) {
                    return foundNode;
                }
            }
        }
        return undefined;
    };
    
        /* Handle node selection
    * @param _event: React.ChangeEvent<{}> - Event object representing the node selection event
    * @param nodeIds: string | string[] - ID or array of IDs of the selected node(s)
    */
    const handleNodeSelect = (_event: React.ChangeEvent<unknown>, nodeIds: string | string[]) => {
        // Extract the selected node ID
        const nodeId = Array.isArray(nodeIds) ? nodeIds[0] : nodeIds;
        // Update the selected node ID state
        setSelectedNode(parseInt(nodeId));

        setExpandedNodes(prevExpanded => {
            if (prevExpanded.includes(nodeId)) {
                return prevExpanded.filter(id => id !== nodeId); 
            } else {
                return [...prevExpanded, nodeId]; 
            }
        });

        // Find the selected node in the treeNodes array
        const selectedNode = findNodeById(treeNodes, parseInt(nodeId));
        if (selectedNode !== undefined) {
            // Update the selectedName state with the name of the selected node
            setSelectedName(selectedNode.name);
            // Find the parent node of the selected node
            const parentNode = findNodeById(treeNodes, selectedNode.parentId);
            if (parentNode !== undefined) {
                // Update the parentName and parentId states with the name and ID of the parent node
                setParentName(parentNode.name);
                setParentId(parentNode.id);
            }
            else {
                // Reset parentName and parentId states if the selected node has no parent
                setParentName(undefined);
                setParentId(0);
            }
        }
    };

    // Handle double click on a node
    /*
     * Handle double click event on a node in the tree view.
     * @param node: Node - The node that was double-clicked
     * @param event: React.MouseEvent<HTMLLIElement, MouseEvent> - Mouse event object representing the double click event
     */
    const handleNodeDoubleClick = (node: NodeDto, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.stopPropagation();
        setSelectedNode(node.id);
        setOpenEditDialog(true);
    };
    
    // Render tree nodes recursively
    /*
     * Render tree nodes recursively based on the given array of nodes.
     * @param nodes: Node[] - Array of nodes to render
     * @returns JSX.Element[] - Array of JSX elements representing the rendered tree nodes
     */
    const renderTreeNodes = (nodes: NodeDto[]) => {
        console.info("Renderizado");
        try {
            return nodes.map(node => (
                <TreeItem 
                key={node.id} 
                nodeId={node.id.toString()} 
                label={node.name} 
                onDoubleClick={(event) => handleNodeDoubleClick(node, event)}>
                    {node.childs && node.childs.length > 0 && renderTreeNodes(node.childs)}
                </TreeItem>
            ))                     
        } catch (error) {
            console.error('Error fetching tree nodes:', error);
        }
    };

    // Handle update
    /*
     * Handle update operation by fetching tree nodes based on the specified operation type.
     * @param operationType: string - Type of operation ('add', 'delete', 'edit')
     */
    const handleUpdate = async (operationType: string) => {
        await fetchTreeNodes(operationType);
    };

    // Handle expand/collapse all nodes
    const handleExpandToggle = () => {
        if (expandedNodes.length > 0) {
            // Si hay nodos expandidos, colapsar todos los nodos
            setExpandedNodes([]);
        } else {
            // Si no hay nodos expandidos, expandir todos los nodos
            const allNodeIds = getAllNodeIds(treeNodes);
            setExpandedNodes(allNodeIds);
        }
    };

    // Método para obtener todos los IDs de los nodos en el árbol
    const getAllNodeIds = (nodes: NodeDto[]): string[] => {
        const allNodeIds: string[] = [];
        const traverse = (node: NodeDto) => {
            allNodeIds.push(node.id.toString());
            if (node.childs && node.childs.length > 0) {
                node.childs.forEach(child => traverse(child));
            }
        };
        nodes.forEach(node => traverse(node));
        return allNodeIds;
    };
    


    const selectedNode = findNodeById(treeNodes, selectedNodeID);
    const selectedNodeHasChildren = selectedNode && selectedNode.childs && selectedNode.childs.length > 0;

    const PlusSquareIcon = CustomSvgIcons.PlusSquare;
    const MinusSquareIcon = CustomSvgIcons.MinusSquare;
    const CloseSquareIcon = CustomSvgIcons.CloseSquare;

    return (
        <div className={classes.container}>
            <Fragment>
                <ToastContainer />
                <h1 className={classes.header}>Node Tree View</h1>
                <div className={classes.buttonsContainer}>
                    <IconButton onClick={handleExpandToggle} className={classes.expandButton}>
                        {expandedNodes.length>0 ? (
                            <>
                                <ExpandLessIcon />
                                Collapse All
                            </>
                        ) : (
                            <>
                                <ExpandMoreIcon />
                                Expand All
                            </>
                        )}
                    </IconButton>
                    <AddNodeComponent parentId={selectedNodeID} name={selectedName} update={(operationType) => handleUpdate(operationType)} />
                    <DeleteNodeComponent nodeId={selectedNodeID} name={selectedName} hasChildren={selectedNodeHasChildren} update={(operationType) => handleUpdate(operationType)} />
                    <EditNodeComponent
                        open={openEditDialog}
                        setOpen={setOpenEditDialog}
                        nodeId={selectedNodeID}
                        parentName={parentName}
                        currentName={selectedName}
                        parentID={parentId}
                        update={(operationType) => handleUpdate(operationType)}
                    />
                </div>
                <div className={classes.treeViewContainer}>
                    <TreeView
                        defaultCollapseIcon={<MinusSquareIcon />}
                        defaultExpandIcon={<PlusSquareIcon />}
                        defaultEndIcon={<CloseSquareIcon />}
                        expanded={expandedNodes}
                        onNodeSelect={handleNodeSelect}
                    >
                        {renderTreeNodes(treeNodes)}
                    </TreeView>
                </div>
            </Fragment>
        </div>
    );
}

