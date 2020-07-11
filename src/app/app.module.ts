import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductFieldsComponent } from './product-designer/product-fields/product-fields.component';
import { ProductPreviewComponent } from './product-designer/product-preview/product-preview.component';
import { NavbarComponent } from './product-designer/navbar/navbar.component';
import { FooterComponent } from './product-designer/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductFieldsComponent,
    ProductPreviewComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
