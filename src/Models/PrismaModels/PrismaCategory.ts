import { prisma } from '../../prisma';
import { CategoryData, CategoryModel } from '../Category';

export class PrismaCategoryModel implements CategoryModel {
  async create({ name }: CategoryData): Promise<void> {
    await prisma.category.create({
      data: {
        name
      }
    });
  }
  async getAll(): Promise<CategoryData[]> {
    const allCategories = await prisma.category.findMany({
      orderBy: [
        {
          id: 'asc'
        }
      ]
    });
    return allCategories;
  }
}
