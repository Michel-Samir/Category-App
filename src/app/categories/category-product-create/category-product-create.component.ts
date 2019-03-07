import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/product.model';
import { CategoryService } from 'src/app/shared/category.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-category-product-create',
  templateUrl: './category-product-create.component.html',
  styleUrls: ['./category-product-create.component.css']
})
export class CategoryProductCreateComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private bottomSheetRef: MatBottomSheetRef<CategoryProductCreateComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  addProductForm: FormGroup;

  ngOnInit() {
    let productCode: string;
    let ProductName: string;
    let ProductPrice: number;
    if(this.data.editMode) {
      let product: Product = this.categoryService.getCategory(this.data.categoryId).getAllNestedCategories()[this.data.nestedCategoryId].getAllProducts()[this.data.productId];
      productCode = product.getProductCode();
      ProductName = product.getProductName();
      ProductPrice = product.getProductPrice();
    }
    this.addProductForm = new FormGroup({
      'productCode': new FormControl(productCode, Validators.required),
      'ProductName': new FormControl(ProductName, Validators.required),
      'ProductPrice': new FormControl(ProductPrice, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    });

  }

  onSubmit() {
    const values = this.addProductForm.value;
    const product = new Product(values.productCode, values.ProductName, values.ProductPrice);
    if(this.data.editMode) {
      this.categoryService.editProduct(this.data.categoryId,this.data.nestedCategoryId, this.data.productId, product);
    } else {
      this.categoryService.addNewProduct(this.data.categoryId,this.data.nestedCategoryId, product);
    }
    this.bottomSheetRef.dismiss();
  }

  onCancel() {
    this.bottomSheetRef.dismiss();
  }

}
