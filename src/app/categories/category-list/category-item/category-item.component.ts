import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  @Input() category: Category;
  @Input('categoryId') id: number;

  @Output() clicked = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }

  onCategoryClicked() {
    this.clicked.emit();
  }

}
