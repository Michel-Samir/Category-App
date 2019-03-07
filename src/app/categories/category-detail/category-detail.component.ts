import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  id: number;
  category: Category;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['categoryid'];
        this.category = this.categoryService.getCategory(this.id);
      }
    );
  }

  addSubCategories() {
    this.router.navigate(['create-subcategories'], {relativeTo: this.route});
  }

  productPage(nestedCategoryId: number) {
    this.router.navigate([nestedCategoryId], {relativeTo: this.route});
  }

}
