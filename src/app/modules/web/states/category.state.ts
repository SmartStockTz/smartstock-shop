import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryState{
    selectedCategorySubject: BehaviorSubject<string> = new BehaviorSubject("ALL")

}