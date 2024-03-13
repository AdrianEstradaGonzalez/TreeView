using Microsoft.EntityFrameworkCore;
using TreeView.Server.Models;

namespace ReactApp2.Server.Database
{
    /* Database context for managing elements. */
    public class ElementDBContext : DbContext
    {
        /* Constructor for ElementDBContext class. */
        /* Parameters:
         * - options: The options to be used by the ElementDBContext.
         */
        public ElementDBContext(DbContextOptions<ElementDBContext> options) : base(options)
        {
        }

        /* Represents a set of nodes in the database. */
        public DbSet<Node> Nodes { get; set; }
    }
}
