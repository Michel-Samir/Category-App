import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from 'src/app/shared/category.service';
import { NestedCategory } from 'src/app/shared/nested-category.model';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-category-create-sub-categories',
  templateUrl: './category-create-sub-categories.component.html',
  styleUrls: ['./category-create-sub-categories.component.css']
})
export class CategoryCreateSubCategoriesComponent implements OnInit {

  addSubCategoryForm: FormGroup;
  categoryId: number

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = +params['categoryid'];
      }
    );

    this.addSubCategoryForm = new FormGroup({
      'nestedCategoryName': new FormControl(null, Validators.required),
      'products': new FormArray([])
    });
  }

  addNewProducts() {
    const formGroup = new FormGroup({
      'productCode': new FormControl(null, Validators.required),
      'productName': new FormControl(null, Validators.required),
      'productPrice': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
    (<FormArray>this.addSubCategoryForm.get('products')).push(formGroup);
  }

  onDeleteProduct(formGroupID: number) {
    (<FormArray>this.addSubCategoryForm.get('products')).removeAt(formGroupID);
  }

  onSubmit() {
    const values = this.addSubCategoryForm.value;
    let allProduct: Product[] = [];
    for(let product of values.products) {
      allProduct.push(new Product(product.productCode, product.productName, product.productPrice));
    }
    const nestedCategory = new NestedCategory(values.nestedCategoryName, allProduct);
    this.categoryService.addNestedCategory(this.categoryId, nestedCategory);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
