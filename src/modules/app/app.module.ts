import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { APP_COMPONENTS } from './app.constants';
import { Routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Routing
  ],
  declarations: [
    AppComponent,
    ...APP_COMPONENTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
