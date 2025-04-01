import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";

export class CategoryService {
  private categoryRepository: Repository<Category>;
  private productRepository = AppDataSource.getRepository(Product);

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  async createCategory(name: string, description: string): Promise<Category> {
    const category = this.categoryRepository.create({ name, description });
    return await this.categoryRepository.save(category);
  }

  async listCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async searchCategory(searchTerm: string): Promise<Category | null> {
    // Busca por id
    let category = await this.categoryRepository.findOne({
      where: { id: searchTerm },
    });
    if (category) return category;
    // Busca por nome (case insensitive)
    category = await this.categoryRepository
      .createQueryBuilder("category")
      .where("LOWER(category.name) = :name", { name: searchTerm.toLowerCase() })
      .getOne();
    return category || null;
  }

  async updateCategory(
    id: string,
    newName: string,
    newDescription: string
  ): Promise<boolean> {
    const result = await this.categoryRepository.update(id, {
      name: newName,
      description: newDescription,
    });
    return result.affected !== undefined && result.affected > 0;
  }

  async removeCategory(id: string): Promise<boolean> {
    // Verifica se há produtos associados à categoria
    const products = await this.productRepository.find({
      where: { category: { id } },
    });
    if (products.length > 0) {
      throw new Error(
        "Não é possível remover a categoria, pois há produtos associados."
      );
    }
    const result = await this.categoryRepository.delete(id);
    return (
      result.affected !== null &&
      result.affected !== undefined &&
      result.affected > 0
    );
  }
}
