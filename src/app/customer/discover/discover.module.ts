import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';
import { ItemComponent } from 'src/app/components/item/item.component';
import { SharedItemModule } from 'src/app/shared/shared-item/shared-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedItemModule,
    IonicModule,
    DiscoverPageRoutingModule
  ],
  declarations: [DiscoverPage]
})
export class DiscoverPageModule {}
