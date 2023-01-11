import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { defaultStoreProvider } from '@state-adapt/angular';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreateStoreComponent } from './pages/create-store/create-store.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateEntityComponent } from './pages/create-entity/create-entity.component';
import { RowComponent } from './components/row/row.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateStoreComponent,
    CreateEntityComponent,
    RowComponent,
  ],
  bootstrap: [AppComponent],
  providers: [defaultStoreProvider],
})
export class AppModule {}
