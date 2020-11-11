import { Component, OnInit, Output } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { ProductService } from '../services/product.service';
import { CategoryState } from '../states/category.state';

@Component({
    selector: 'ssm-category-list',
    template: `
    <mat-selection-list #categoryList [multiple]="false" style="padding: 3em">
        <h2>Categories</h2>
         <mat-list-option *ngFor="let category of categories" [value]="category" (click) = selectCategory(categoryList.selectedOptions.selected[0]?.value)>
         {{category}}
         <mat-divider></mat-divider>
        </mat-list-option>
        
    </mat-selection-list>
    `,
    styleUrls: []
})
export class CategoryListComponent implements OnInit{
    categories = ["ALL"];

    constructor(private readonly productService: ProductService,
        private readonly categoryState: CategoryState){

    }

    selectCategory(selectedCategory){
        this.categoryState.selectedCategorySubject.next(selectedCategory);
    }
    
    ngOnInit(): void {
        this.productService
        .getcategories().then(
            (value) => {
                value.forEach(category => {
                    this.categories.push(category["name"])
                })
            }
        );
    }
}