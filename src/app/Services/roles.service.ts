import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private _roles = {Customer : 'customer' , Admin: 'admin' , ShopOwner :'shop owner'};
  constructor() {
  }
  get Roles() {
    return this._roles;
  }
}

