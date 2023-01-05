import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreManagementRepository } from '../../state/stores-management.repository';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  entities$: Observable<any>;

  private _store: string;

  @Input() get store(): string {
    return this._store;
  }
  set store(store: string) {
    this._store = store;
    this.entities$ = this.storesManagementRepository.selectAll(store);
  }

  constructor(private storesManagementRepository: StoreManagementRepository) {}

  ngOnInit() {}

  deleteEntity(id: string | number) {
    this.storesManagementRepository.deleteFromStore(this.store, id);
  }
}
