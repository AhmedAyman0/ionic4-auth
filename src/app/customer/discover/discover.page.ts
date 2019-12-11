import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/Services/item.service';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {


  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  items: any[] = [];
  categs:any[]=[];

  constructor(private itemServ: ItemService,private catServ:CategoryService) {

   }

  ngOnInit() {
    this.itemServ.getAll().subscribe((resp: any) => {
      this.items = resp;
    });
    this.catServ.getCategories().subscribe((resp: any) => {
      this.categs = resp;
    });
  }


}
