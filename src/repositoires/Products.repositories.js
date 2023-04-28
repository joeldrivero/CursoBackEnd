const ProductDTO = require("../dao/DTOs/product.dto")

class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }
    async getAll(limit = 10, page = 1, category, sort) {
        const result = await this.dao.getAll(limit = 10, page = 1, category, sort);   
        return result;
    }

    async createProduct(product) {
        try {
            const result = await this.dao.createProduct(product);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, updateData) {
        try {
            const result = await this.dao.updateProduct({ _id: id }, updateData);
            return result;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error}`);
        }
    }

    async getProductById(idProduct) {
        try {
            const product = await this.dao.getProductById({ _id: idProduct });
            return product;
        } catch (error) {
            throw new Error(`Error al obtener el producto: ${error}`);
        }
    }
    async deleteProduct(idProduct) {
        try {
            const product = await this.dao.deleteProduct({ _id: idProduct });
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

}


function buildNextLink(category, sort, limit, page) {
    let nextLink = `http://localhost:8080/api/products?`;
    if (category) {
        nextLink += `category=${category}&`;
    }
    if (sort) {
        nextLink += `sort=${sort}&`;
    }
    nextLink += `limit=${limit}&page=${page}`;
    return nextLink;
}

function buildPrevLink(category, sort, limit, page) {
    let prevLink = `http://localhost:8080/api/products?`;
    if (category) {
        prevLink += `category=${category}&`;
    }
    if (sort) {
        prevLink += `sort=${sort}&`;
    }
    prevLink += `limit=${limit}&page=${page}`;
    return prevLink;
}

module.exports = ProductRepository