import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SHARED_COMPONENTS, SHARED_SERVICES } from './shared.constants';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...SHARED_COMPONENTS
  ],
  exports: [
    ...SHARED_COMPONENTS
  ],
  providers: [
    ...SHARED_SERVICES
  ]
})
export class SharedModule { }
