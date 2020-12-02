import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchState{
    searchItem: BehaviorSubject<string> = new BehaviorSubject("")

}