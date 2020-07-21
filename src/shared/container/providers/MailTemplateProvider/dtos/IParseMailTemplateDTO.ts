interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IparseMailTempleteDTO {
  file: string;
  variables: ITemplateVariables;
}
