namespace ReactApp2.Server.Dto;

/* Represents a Data Transfer Object (DTO) for a node in the tree structure. */
public class NodeDto
{
    /* Gets or sets the unique identifier of the node. */
    public int Id { get; set; }

    /* Gets or sets the name of the node. */
    public string? Name { get; set; }

    /* Gets or sets the identifier of the parent node. */
    public int ParentId { get; set; }

    /* Gets or sets the list of child nodes belonging to this node. */
    public List<NodeDto>? Childs { get; set; }
}
