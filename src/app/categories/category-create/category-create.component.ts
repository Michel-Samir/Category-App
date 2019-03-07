import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { NestedCategory } from 'src/app/shared/nested-category.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  @ViewChild('f') addCategoryForm: NgForm;

  constructor(private bottomSheetRef: MatBottomSheetRef<CategoryCreateComponent>,
              private categoryService: CategoryService) { }

  ngOnInit() {
  }

  onSubmit() {
    const value = this.addCategoryForm.value;
    const category = new Category(value.category, []);
    this.categoryService.addNewCategory(category);
    this.bottomSheetRef.dismiss();
  }

  onCancel() {
    this.bottomSheetRef.dismiss();
  }

}
