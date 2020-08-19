export class ItemDto {
  id: string;
  title: string;
  picture: string;
  glutenfree: boolean;
  sugarfree: boolean;
  ingredients?: string[];
  allergens?: string[];
}
