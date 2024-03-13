export interface NodeDto {
    id: number;
    name: string;
    parentId: number;
    childs?: NodeDto[];
}