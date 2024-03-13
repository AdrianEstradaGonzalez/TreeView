using AutoMapper;
using ReactApp2.Server.Dto;
using TreeView.Server.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Node, NodeDto>().ReverseMap(); // Mapeo de Node a NodeDto
    }
}