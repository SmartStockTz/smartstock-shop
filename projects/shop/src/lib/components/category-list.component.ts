import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {CategoryState} from '../states/category.state';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'ssm-category-list',
  template: `
    <mat-form-field appearance="fill" style="margin-right: 5px">
      <mat-label>Name</mat-label>
      <input placeholder="Type here..." matInput type="text">
    </mat-form-field>
    <mat-form-field appearance="fill" style="margin-right: 5px">
      <mat-label>Choose Category</mat-label>
      <mat-select [multiple]="false" [value]="'All Product'" (selectionChange)="selectCategory($event)">
        <mat-option *ngFor="let category of categories" [value]="category">
          {{category}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: []
})
export class CategoryListComponent implements OnInit {
  categories = ['All Products'];

  constructor(private readonly productService: ProductService,
              private readonly categoryState: CategoryState) {

  }

  selectCategory(selectedCategory: MatSelectChange): void {
    this.categoryState.selectedCategorySubject.next(selectedCategory.value);
  }

  ngOnInit(): void {
    this.productService.getCategories().then((value) => {
        value.forEach(category => {
          this.categories.push(category.name);
        });
      }
    );
  }
}
