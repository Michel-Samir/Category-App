import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { CategoryCreateSubCategoriesComponent } from './categories/category-create-sub-categories/category-create-sub-categories.component';
import { CategoryProductsComponent } from './categories/category-products/category-products.component';

const routes: Routes = [
    {path: '', redirectTo: '/categories', pathMatch: 'full'},
    {path: 'categories', component: CategoriesComponent, children: [
        {path: ':categoryid', component: CategoryDetailComponent},
        {path: ':categoryid/create-subcategories', component: CategoryCreateSubCategoriesComponent},
        {path: ':categoryid/:subcategoryid', component: CategoryProductsComponent},
    ]},
    {path: '**', redirectTo: '/categories'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}