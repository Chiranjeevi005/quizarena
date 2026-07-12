export interface SearchFacetOption {
  label: string;
  value: string;
  count: number;
}

export interface SearchFacet {
  field: string;
  options: SearchFacetOption[];
}
