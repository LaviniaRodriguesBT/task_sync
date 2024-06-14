import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../../views/app/product/product-list/product-list.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventCreateService {

  constructor(private http: HttpClient) { }

  async create(product: Products){
    return firstValueFrom(this.http.post('http://localhost:3000/product', product))
  }
}


