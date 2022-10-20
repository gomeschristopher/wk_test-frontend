import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ClientFormModalComponent } from './shared/components/client-form-modal/client-form-modal.component';
import { ProductFormModalComponent } from './shared/components/product-form-modal/product-form-modal.component';
import { OrderFormModalComponent } from './shared/components/order-form-modal/order.form-modal.component';
import { OrderItemFormModalComponent } from './shared/components/order-item-form-modal/order-item-form-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    OrderComponent,
    ProductComponent,
    ClientFormModalComponent,
    ProductFormModalComponent,
    OrderFormModalComponent,
    OrderItemFormModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
