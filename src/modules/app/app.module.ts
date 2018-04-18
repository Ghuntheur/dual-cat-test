import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './components/app/app.component';
import { APP_COMPONENTS } from './app.constants';
import { Routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
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
