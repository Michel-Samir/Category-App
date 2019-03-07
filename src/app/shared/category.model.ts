import { NestedCategory } from './nested-category.model';

export class Category {
    constructor(private categoryName: string,
                private nestedCategories: NestedCategory[]) {}

    getAllNestedCategories() {
        return this.nestedCategories;
    }
}