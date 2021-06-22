import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ProductService} from '../services/product.service';
import {ProductModel} from '../models/product.model';
import {CategoryState} from '../states/category.state';
import {SearchState} from '../states/search.state';

@Component({
  selector: 'ssm-search',
  template: `
    <form class="example-form">
      <mat-form-field appearance="outline" class="example-full-width">
        <input #searchInput
               type="text"
               placeholder="Search product"
               aria-label="Number"
               matInput
               [formControl]="myControl"
               [matAutocomplete]="auto" (keyup.enter)="onEnter(searchInput.value)"/>
        <mat-autocomplete #auto="matAutocomplete">
          <mat-option #optionSelector (click)="onEnter(optionSelector.value)"
                      *ngFor="let option of filteredOptions | async"
                      [value]="option">
            {{ option }}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </form>
  `,
  styleUrls: [],
})
export class SearchComponent implements OnInit {
  productnames = [];
  myControl = new FormControl();
  options: string[] = this.productnames;
  filteredOptions: Observable<string[]>;

  constructor(private readonly productService: ProductService,
              private readonly categoryState: CategoryState,
              private readonly searchState: SearchState) {
  }

  async ngOnInit(): Promise<any> {
    this.productService.getProducts().then((val: ProductModel[]) => {
      val.forEach((value) => {
        this.productnames.push(value.product);
      });
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  async onEnter(searchInput): Promise<any> {
    this.categoryState.selectedCategorySubject.next('Search');
    this.searchState.searchItem.next(searchInput);
    console.log(searchInput);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
