import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";

export class ProductService {
  private productRepository: Repository<Product>;
  private categoryRepository = AppDataSource.getRepository(Category);

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async createProduct(
    name: string,
    description: string,
    price: number,
    quantity: number,
    categoryId: string
  ): Promise<Product> {
    // Verifica se a categoria existe
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new Error("Categoria não encontrada.");
    }
    const product = this.productRepository.create({
      name,
      description,
      price,
      quantity,
      category,
    });
    return await this.productRepository.save(product);
  }

  async listProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ["category"] });
  }

  async searchProduct(searchTerm: string): Promise<Product | null> {
    // Busca por id
    let product = await this.productRepository.findOne({
      where: { id: searchTerm },
      relations: ["category"],
    });
    if (product) return product;
    // Busca por nome (case insensitive)
    product = await this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .where("LOWER(product.name) = :name", { name: searchTerm.toLowerCase() })
      .getOne();
    if (product) return product;
    // Busca por id da categoria
    product = await this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .where("category.id = :categoryId", { categoryId: searchTerm })
      .getOne();
    return product || null;
  }

  async updateProduct(
    id: string,
    newName: string,
    newDescription: string,
    newPrice: number,
    newQuantity: number
  ): Promise<Product | null> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    if (product) {
      product.name = newName;
      product.description = newDescription;
      product.price = newPrice;
      product.quantity = newQuantity;
      return await this.productRepository.save(product);
    }
    return null;
  }

  async removeProduct(id: string): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return (
      result.affected !== null &&
      result.affected !== undefined &&
      result.affected > 0
    );
  }
}
