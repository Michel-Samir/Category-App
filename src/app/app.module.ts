import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryItemComponent } from './categories/category-list/category-item/category-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { CategoryCreateSubCategoriesComponent } from './categories/category-create-sub-categories/category-create-sub-categories.component';
import { FilterPipe } from './shared/filter.pipe';
import { CategoryProductsComponent } from './categories/category-products/category-products.component';
import { CategoryProductCreateComponent } from './categories/category-product-create/category-product-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    CategoryListComponent,
    CategoryItemComponent,
    CategoryCreateComponent,
    CategoryDetailComponent,
    CategoryCreateSubCategoriesComponent,
    FilterPipe,
    CategoryProductsComponent,
    CategoryProductCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  entryComponents: [
    CategoryCreateComponent,
    CategoryProductCreateComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
