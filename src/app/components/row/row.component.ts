import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreManagementRepository } from '../../state/stores-management.repository';

type InObservable<T> = T extends Observable<infer U> ? U : never;

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  @Input() store: InObservable<StoreManagementRepository['stores$']>[0] | null = null;
  entities$: InObservable<StoreManagementRepository['stores$']>[0]['store']['all$'] | null = null;

  ngOnInit() {
    this.entities$ = this.store?.store.all$;
  }
}
