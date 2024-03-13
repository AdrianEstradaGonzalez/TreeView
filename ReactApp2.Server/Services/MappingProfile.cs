using AutoMapper;
using ReactApp2.Server.Dto;
using TreeView.Server.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Node, NodeDto>(); // Mapeo de Node a NodeDto
        CreateMap<NodeDto, Node>(); // Mapeo inverso de NodeDto a Node
    }
}