import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Category } from './category.model';
import { NestedCategory } from './nested-category.model';
import { Product } from './product.model';


@Injectable({providedIn: 'root'})
export class CategoryService {

    allCategories = new Subject<Category[]>();
    category = new Subject<Category>();
    
    constructor() {}

    private categories: Category[] = [
        new Category("electric devices",[
            new NestedCategory("tv", [
                new Product("236a", "samsung", 5200),
                new Product("25bc9", "lg",4800)
            ]),
            new NestedCategory("refrigerator", [
                new Product("236a", "samsung", 6300),
                new Product("25bc9", "lg",5500)
            ])
        ]),
        new Category("medical instrument",[
            new NestedCategory("endoscopy", [
                new Product("236a", "gastroscope", 5200),
                new Product("25bc9", "colonoscope",4800)
            ])
        ])
    ];

    getAllCategories() {
        return this.categories.slice();
    }

    addNewCategory(category: Category) {
        this.categories.push(category);
        this.categoryCopy();
    }

    addNestedCategory(id: number, nestedCategory: NestedCategory) {
        this.categories[id].getAllNestedCategories().push(nestedCategory);
        this.categoryCopy();
    }

    getCategory(categoryId: number) {
        return this.categories[categoryId];
    }

    editProduct(categoryId: number, nestedCategoryId: number, productId: number, product: Product) {
        this.categories[categoryId].getAllNestedCategories()[nestedCategoryId].getAllProducts()[productId] = product;
        this.categoryCopy();
        this.category.next(this.categories[categoryId]);
    }

    addNewProduct(categoryId: number, nestedCategoryId: number, product: Product) {
        this.categories[categoryId].getAllNestedCategories()[nestedCategoryId].getAllProducts().push(product)
        this.categoryCopy();
        this.category.next(this.categories[categoryId]);
    }
    removeProducts(categoryId: number, nestedCategoryId: number, products: Product[]) {
        const allProducts = this.categories[categoryId].getAllNestedCategories()[nestedCategoryId].getAllProducts();
        this.categories[categoryId].getAllNestedCategories()[nestedCategoryId].getAllProducts().splice(0, allProducts.length);
        this.categories[categoryId].getAllNestedCategories()[nestedCategoryId].getAllProducts().push(...products);
        console.log(this.categories[categoryId]);
        this.categoryCopy();
        this.category.next(this.categories[categoryId]);
    }

    private categoryCopy() {
        this.allCategories.next(this.getAllCategories());
    }

}