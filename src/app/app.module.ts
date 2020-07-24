import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductFieldsComponent } from './product-designer/product-fields/product-fields.component';
import { ProductPreviewComponent } from './product-designer/product-preview/product-preview.component';
import { NavbarComponent } from './product-designer/navbar/navbar.component';
import { FooterComponent } from './product-designer/footer/footer.component';
import { SectionLabelComponent } from './product-designer/section-label/section-label.component';
import { FeedThroughService } from './services/feedthrough.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductFieldsComponent,
    ProductPreviewComponent,
    NavbarComponent,
    FooterComponent,
    SectionLabelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [FeedThroughService],
  bootstrap: [AppComponent]
})
export class AppModule { }
