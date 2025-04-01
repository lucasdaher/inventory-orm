import "reflect-metadata";
import * as readlineSync from "readline-sync";
import { AppDataSource } from "./data-source";
import { CategoryService } from "./services/CategoryService";
import { ProductService } from "./services/ProductService";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados MySQL estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    return;
  }

  const categoryService = new CategoryService();
  const productService = new ProductService();

  async function mainMenu(): Promise<string> {
    console.log("\n=== Inventory Management CLI (TypeORM - MySQL) ===");
    console.log("1 - Gerenciar Categorias");
    console.log("2 - Gerenciar Produtos");
    console.log("0 - Sair");
    return readlineSync.question("Escolha uma opção: ");
  }

  async function categoryMenu(): Promise<string> {
    console.log("\n=== Gerenciamento de Categorias ===");
    console.log("1 - Criar Categoria");
    console.log("2 - Listar Categorias");
    console.log("3 - Buscar Categoria");
    console.log("4 - Atualizar Categoria");
    console.log("5 - Remover Categoria");
    console.log("0 - Voltar");
    return readlineSync.question("Escolha uma opção: ");
  }

  async function productMenu(): Promise<string> {
    console.log("\n=== Gerenciamento de Produtos ===");
    console.log("1 - Criar Produto");
    console.log("2 - Listar Produtos");
    console.log("3 - Buscar Produto");
    console.log("4 - Atualizar Produto");
    console.log("5 - Remover Produto");
    console.log("0 - Voltar");
    return readlineSync.question("Escolha uma opção: ");
  }

  async function manageCategories(): Promise<void> {
    let back = false;
    while (!back) {
      const option = await categoryMenu();
      switch (option) {
        case "1": {
          const name = readlineSync.question("Nome da categoria: ");
          const description = readlineSync.question("Descrição: ");
          try {
            const newCat = await categoryService.createCategory(
              name,
              description
            );
            console.log("Categoria criada com sucesso:", newCat);
          } catch (error: any) {
            console.log("Erro ao criar categoria:", error.message);
          }
          break;
        }
        case "2": {
          const categories = await categoryService.listCategories();
          if (categories.length === 0) {
            console.log("Nenhuma categoria cadastrada.");
          } else {
            console.table(categories);
          }
          break;
        }
        case "3": {
          const searchTerm = readlineSync.question(
            "Digite o id ou nome da categoria: "
          );
          const found = await categoryService.searchCategory(searchTerm);
          if (found) {
            console.table(found);
          } else {
            console.log("Categoria não encontrada.");
          }
          break;
        }
        case "4": {
          const updateId = readlineSync.question(
            "Digite o id da categoria a atualizar: "
          );
          const newName = readlineSync.question("Novo nome: ");
          const newDescription = readlineSync.question("Nova descrição: ");
          const updated = await categoryService.updateCategory(
            updateId,
            newName,
            newDescription
          );
          console.log(
            updated
              ? "Categoria atualizada com sucesso."
              : "Categoria não encontrada."
          );
          break;
        }
        case "5": {
          const removeId = readlineSync.question(
            "Digite o id da categoria a remover: "
          );
          try {
            const removed = await categoryService.removeCategory(removeId);
            console.log(
              removed
                ? "Categoria removida com sucesso."
                : "Categoria não encontrada."
            );
          } catch (error: any) {
            console.log("Erro:", error.message);
          }
          break;
        }
        case "0":
          back = true;
          break;
        default:
          console.log("Opção inválida.");
      }
    }
  }

  async function manageProducts(): Promise<void> {
    let back = false;
    while (!back) {
      const option = await productMenu();
      switch (option) {
        case "1": {
          const prodName = readlineSync.question("Nome do produto: ");
          const prodDescription = readlineSync.question("Descrição: ");
          const prodPriceStr = readlineSync.question("Preço: ");
          const prodPrice = parseFloat(prodPriceStr);
          const prodQuantityStr = readlineSync.question("Quantidade: ");
          const prodQuantity = parseInt(prodQuantityStr);
          const categoryId = readlineSync.question("ID da categoria: ");
          try {
            const newProd = await productService.createProduct(
              prodName,
              prodDescription,
              prodPrice,
              prodQuantity,
              categoryId
            );
            console.log("Produto criado com sucesso:", newProd);
          } catch (error: any) {
            console.log("Erro ao criar produto:", error.message);
          }
          break;
        }
        case "2": {
          const products = await productService.listProducts();
          if (products.length === 0) {
            console.log("Nenhum produto cadastrado.");
          } else {
            console.table(products);
          }
          break;
        }
        case "3": {
          const prodSearch = readlineSync.question(
            "Digite o id, nome ou id da categoria do produto: "
          );
          const prodFound = await productService.searchProduct(prodSearch);
          if (prodFound) {
            console.table(prodFound);
          } else {
            console.log("Produto não encontrado.");
          }
          break;
        }
        case "4": {
          const updateProdId = readlineSync.question(
            "Digite o id do produto a atualizar: "
          );
          const newProdName = readlineSync.question("Novo nome: ");
          const newProdDescription = readlineSync.question("Nova descrição: ");
          const newProdPriceStr = readlineSync.question("Novo preço: ");
          const newProdPrice = parseFloat(newProdPriceStr);
          const newProdQuantityStr = readlineSync.question("Nova quantidade: ");
          const newProdQuantity = parseInt(newProdQuantityStr);
          const updatedProd = await productService.updateProduct(
            updateProdId,
            newProdName,
            newProdDescription,
            newProdPrice,
            newProdQuantity
          );
          console.log(
            updatedProd
              ? "Produto atualizado com sucesso."
              : "Produto não encontrado."
          );
          break;
        }
        case "5": {
          const removeProdId = readlineSync.question(
            "Digite o id do produto a remover: "
          );
          const removed = await productService.removeProduct(removeProdId);
          console.log(
            removed
              ? "Produto removido com sucesso."
              : "Produto não encontrado."
          );
          break;
        }
        case "0":
          back = true;
          break;
        default:
          console.log("Opção inválida.");
      }
    }
  }

  let exit = false;
  while (!exit) {
    const option = await mainMenu();
    switch (option) {
      case "1":
        await manageCategories();
        break;
      case "2":
        await manageProducts();
        break;
      case "0":
        exit = true;
        console.log("Encerrando o programa...");
        break;
      default:
        console.log("Opção inválida.");
    }
  }

  await AppDataSource.destroy();
}

main();
