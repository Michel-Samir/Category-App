import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';
import { MatBottomSheet } from '@angular/material';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  filterString = '';
  subscription: Subscription;

  constructor(private categoryService: CategoryService,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.categories = this.categoryService.getAllCategories();
    this.subscription = this.categoryService.allCategories.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
  }

  openCreateCategoryBottomSheet() {
    this.bottomSheet.open(CategoryCreateComponent);
  }

  categoryClicked() {
    if(this.filterString) {
      this.filterString = '';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
