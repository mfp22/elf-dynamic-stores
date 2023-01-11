import { Component } from '@angular/core';
import { StoreManagementRepository } from 'src/app/state/stores-management.repository';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  stores$ = this.storeManagementRepository.stores$;

  constructor(private storeManagementRepository: StoreManagementRepository) {}
}
