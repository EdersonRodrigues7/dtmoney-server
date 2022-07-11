import { CategoryData, CategoryModel } from '../Models/Category';

export class CategoryController {
  constructor(private category: CategoryModel) {}
  async addCategory(name: string): Promise<void> {
    await this.category.create({
      name
    });
  }
  async getCategories(): Promise<CategoryData[]> {
    const allCategories = await this.category.getAll();
    return allCategories;
  }
}
