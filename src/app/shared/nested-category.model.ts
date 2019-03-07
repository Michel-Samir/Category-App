import { Product } from './product.model';

export class NestedCategory {
    constructor(private nestedCategoryName: string,
                private products: Product[]) {}

    getAllProducts() {
        return this.products;
    }
}