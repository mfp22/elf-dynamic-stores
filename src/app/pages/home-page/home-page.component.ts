import { Component, OnInit } from '@angular/core';
import { Store } from '@ngneat/elf';
import { Observable } from 'rxjs';
import { StoreManagementRepository } from 'src/app/state/stores-management.repository';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  stores$: Observable<string[]>;

  constructor(private storeManagementRepository: StoreManagementRepository) {}

  ngOnInit() {
    this.stores$ = this.storeManagementRepository.registry$;
  }
}
