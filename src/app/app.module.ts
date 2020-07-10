import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductFieldsComponent } from './product-designer/product-fields/product-fields.component';
import { ProductPreviewComponent } from './product-designer/product-preview/product-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductFieldsComponent,
    ProductPreviewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
