const ProductDTO = require("../dao/DTOs/product.dto")

class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }
    async getAll(limit = 10, page = 1, category, sort) {
        let filter = {};
        if (category) {
            filter.category = category.toString();
        }
        let options = { limit: limit, page: page };
        if (sort) {
            options.sort = { price: sort.toString() };
        }
        const products = await this.dao.find();
        if (products.hasNextPage) {
            products.nextLink = buildNextLink(category, sort, limit, products.nextPage);
            if (products.hasPrevPage) {
                products.prevLink = buildPrevLink(category, sort, limit, products.prevPage);
            } else {
                products.prevLink = null;
            }
        } else {
            products.nextLink = null;
            if (products.hasPrevPage) {
                products.prevLink = buildPrevLink(category, sort, limit, products.prevPage);
            } else {
                products.prevLink = null;
            }
        }
        return products;
    }

    async createProduct(product) {
        try {
            const result = await this.dao.create(product);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, updateData) {
        try {
            const result = await this.dao.updateOne({ _id: id }, updateData);
            return result;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error}`);
        }
    }

    async getProductById(idProduct) {
        try {
            const product = await this.dao.findOne({ _id: idProduct });
            return product;
        } catch (error) {
            throw new Error(`Error al obtener el producto: ${error}`);
        }
    }
    async deleteProduct(idProduct) {
        try {
            const product = await this.dao.findOneAndDelete({ _id: idProduct });
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