import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ConfigModel} from '../models/config.model';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  shopDetails: BehaviorSubject<ConfigModel> = new BehaviorSubject<ConfigModel>({applicationId: '', projectId: '', masterKey: ''});

  constructor() {
  }
}
