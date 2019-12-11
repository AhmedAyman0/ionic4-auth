import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from 'src/app/components/item/item.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports:[ItemComponent]
})
export class SharedItemModule { }
