using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Database;
using ReactApp2.Server.Dto;
using TreeView.Server.Models;

namespace TreeView.Server.Controllers
{
    /* Controller for managing tree nodes. */
    [Route("api/[controller]")]
    [ApiController]
    public class TreeNodesController : ControllerBase
    {
        private readonly ElementDBContext _nodes;
        private readonly IMapper _mapper;

        public TreeNodesController(ElementDBContext nodes, IMapper mapper)
        {
            _nodes = nodes;
            _mapper = mapper;
        }

        /* Get all nodes. */
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NodeDto>>> GetNodes()
        {
            var nodes = await _nodes.Nodes.ToListAsync();
            if (nodes == null)
            {
                return NotFound();
            }

            var nodeDtos = new List<NodeDto>();

            foreach (var node in nodes)
            {
                var nodeDto = _mapper.Map<NodeDto>(node);
                nodeDto.Childs = await GetChildNodes(node.ID); 
                nodeDtos.Add(nodeDto);
            }

            return nodeDtos;
        }

        /* Add a new node. */
        /* Parameters:
         * - node: The node to add.
         */
        [HttpPost]
        public async Task<ActionResult<NodeDto>> Add(NodeDto nodeDto)
        {
            var node = _mapper.Map<Node>(nodeDto);      
            _nodes.Nodes.Add(node);
            await _nodes.SaveChangesAsync();
            var newNodeDto = _mapper.Map<NodeDto>(node);
            return CreatedAtAction(nameof(GetNodes), new { id = newNodeDto.Id }, newNodeDto);
        }

        /* Delete a node by ID. */
        /* Parameters:
         * - id: The ID of the node to delete.
         */
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<NodeDto>>> Delete(int id)
        {
            if (_nodes.Nodes == null)
            {
                return NotFound();
            }

            var node = await _nodes.Nodes.FindAsync(id);
            if (node == null)
            {
                return NotFound();
            }

            _nodes.Nodes.Remove(node);
            await _nodes.SaveChangesAsync();
            return Ok();
        }

        /* Update the name of a node by ID. */
        /* Parameters:
         * - id: The ID of the node to update.
         * - updatedNode: The updated node object.
         */
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNodeName(int id, NodeDto updatedNode)
        {
            if (id != updatedNode.Id)
            {
                return BadRequest();
            }

            var node = await _nodes.Nodes.FindAsync(id);
            if (node == null)
            {
                return NotFound();
            }

            node.Name = updatedNode.Name; // Update node name

            try
            {
                await _nodes.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) // Exception handling
            {
                if (!_nodes.Nodes.Any(e => e.ID == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }


        private async Task<List<NodeDto>> GetChildNodes(int parentId)
        {
            var childNodes = await _nodes.Nodes.Where(n => n.parentID == parentId).ToListAsync();
            var childNodeDtos = new List<NodeDto>();

            foreach (var childNode in childNodes)
            {
                var childNodeDto = _mapper.Map<NodeDto>(childNode);
                childNodeDto.Childs = await GetChildNodes(childNode.ID); 
                childNodeDtos.Add(childNodeDto);
            }

            return childNodeDtos;
        }
    }
}
