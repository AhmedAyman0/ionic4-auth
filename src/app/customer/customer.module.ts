import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerPageRoutingModule } from './customer-routing.module';

import { CustomerPage } from './customer.page';
import { ItemComponent } from '../components/item/item.component';
import { SharedItemModule } from '../shared/shared-item/shared-item.module';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedItemModule,
    IonicModule,
    CustomerPageRoutingModule
  ],
  declarations: [CustomerPage]
})
export class CustomerPageModule {}
