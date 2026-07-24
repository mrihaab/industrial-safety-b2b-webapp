export interface CategoryRow {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  tag_name: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  tag_name: string;
  subcategories: CategoryDto[];
}
