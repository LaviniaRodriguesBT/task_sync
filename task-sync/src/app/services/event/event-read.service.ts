import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Products } from '../../views/app/product/product-list/product-list.component';

@Injectable({
  providedIn: 'root'
})
export class EventReadService {

  constructor(private http: HttpClient) { }

  // CRUD - creat delete update

  findById(id: string): Promise<Products>{
    return firstValueFrom(this.http.get<Products>(`http://localhost:3000/product/${id}`));
  }

  findByName(name: string): Promise<Products[]> {
    return firstValueFrom(this.http.get<Products[]>(`http://localhost:3000/product?name=${name}`));
  }

  findAll(): Promise<Products[]>{
    return firstValueFrom(this.http.get<Products[]>('http://localhost:3000/product'));
  }
};