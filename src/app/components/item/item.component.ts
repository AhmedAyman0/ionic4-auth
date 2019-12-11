import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/Services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {

  @Input() item: any;
  constructor() { }

  ngOnInit() {

  }

}
