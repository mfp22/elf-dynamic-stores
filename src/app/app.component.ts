import { Component } from '@angular/core';
import { StoreManagementRepository } from './state/stores-management.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private storeManagementRepository: StoreManagementRepository) {}
}
