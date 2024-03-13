using System.ComponentModel.DataAnnotations;

namespace TreeView.Server.Models
{
    /* Represents a node in the tree view. */
    public class Node
    {
        /* Unique identifier for the node. */
        [Key]
        public int ID { get; set; }

        /* Name of the node. */
        [Required]
        public string Name { get; set; } = string.Empty;

        /* ID of the parent node. */
        [Required]
        public int parentID { get; set; }
    }
}
