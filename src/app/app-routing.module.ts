import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreateStoreComponent } from './pages/create-store/create-store.component';
import { CreateEntityComponent } from './pages/create-entity/create-entity.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'create-store', component: CreateStoreComponent },
  { path: 'create-entity', component: CreateEntityComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
