import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { MatTableDataSource, MatSort, MatPaginator, MatBottomSheet } from '@angular/material';
import { Product } from 'src/app/shared/product.model';
import { CategoryProductCreateComponent } from '../category-product-create/category-product-create.component';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit, AfterViewInit, OnDestroy {

  categoryId: number;
  nestedCategoryId: number;
  category: Category;
  subscription: Subscription;

  displayedColumns = ['productCode', 'productName', 'productPrice','edit'];
  dataSource = new MatTableDataSource<Product>();

  deleteProductForm: FormGroup;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    let checkedProducts = new FormArray([]);

    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = +params['categoryid'];
        this.nestedCategoryId = +params['subcategoryid'];
        this.category = this.categoryService.getCategory(this.categoryId);
        this.dataSource.data = this.category.getAllNestedCategories()[this.nestedCategoryId].getAllProducts();
        if(this.dataSource.data) {
          for(let product of this.dataSource.data) {
            checkedProducts.push(new FormControl(false));
          }
        }
      }
    );

    this.subscription = this.categoryService.category.subscribe(
      (category: Category) => {
        this.category = category;
        this.dataSource.data = this.category.getAllNestedCategories()[this.nestedCategoryId].getAllProducts();

        // checkedProducts = new FormArray([]);
        while(checkedProducts.length !== 0) {
          checkedProducts.removeAt(0);
        }
        console.log(this.dataSource.data)
        if(this.dataSource.data) {
          for(let product of this.dataSource.data) {
            checkedProducts.push(new FormControl(false));
          }
          this.deleteProductForm = new FormGroup({
            'checkedProducts': checkedProducts
          });
        }
      }
    );

    this.deleteProductForm = new FormGroup({
      'checkedProducts': checkedProducts
    });

  }

  onSubmit() {
    // console.log(this.deleteProductForm.value);
    const values = this.deleteProductForm.value;
    let allProduct: Product[] = [];
    for(let i = 0; i < values.checkedProducts.length; i++) {
      if(!values.checkedProducts[i]) {
        allProduct.push(this.category.getAllNestedCategories()[this.nestedCategoryId].getAllProducts()[i])
      }
    }
    // console.log(allProduct);
    this.categoryService.removeProducts(this.categoryId, this.nestedCategoryId, allProduct);
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddProduct() {
    this.bottomSheet.open(CategoryProductCreateComponent, {data: {editMode: false, categoryId: this.categoryId, nestedCategoryId: this.nestedCategoryId}});
  }

  onEditProduct(productId: number) {
    this.bottomSheet.open(CategoryProductCreateComponent, {data: {editMode: true, categoryId: this.categoryId, nestedCategoryId: this.nestedCategoryId, productId: productId}});
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
