export class Product {
    constructor(private productCode: string,
                private productName: string,
                private productPrice: number) {}

    getProductCode() {
        return this.productCode;
    }

    getProductName() {
        return this.productName;
    }

    getProductPrice() {
        return this.productPrice;
    }
}