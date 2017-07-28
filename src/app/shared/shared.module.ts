import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdAutocompleteModule, MdInputModule, MdDialogModule } from '@angular/material';

import { SwitchViewComponent } from '../views/switch-view/switch-view.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SwitchViewComponent],
  exports: [
    SwitchViewComponent,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdAutocompleteModule,
    MdInputModule,
    MdDialogModule
  ]
})
export class SharedModule {
}
