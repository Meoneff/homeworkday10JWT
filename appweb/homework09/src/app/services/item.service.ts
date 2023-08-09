import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';


@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private httpClient: HttpClient) { }
  getItem(idToken: string){
    return this.httpClient.get<Item[]>("http://localhost:3000/product",{
    headers: new HttpHeaders({
      Authorization:`${idToken}`
    }),
  });
  }
  // deleteItem(id:string){
  deleteItem(id:string,idToken:string){
    return this.httpClient.delete<Item>(`http://localhost:3000/product/delete/${id}`,{
      headers: new HttpHeaders({
        Authorization:`${idToken}`
      }),
    })
    
  }
  addItem(item:Item, idToken:string){
    return this.httpClient.post<Item>(`http://localhost:3000/product/create`,item,{
      headers: new HttpHeaders({
        Authorization:`${localStorage.getItem('idToken')}`
      }),
    })
  }
  updateItem(item:Item, idToken:string){
    return this.httpClient.put<Item>(`http://localhost:3000/product/update/${item._id}`,item,{
      headers: new HttpHeaders({
        Authorization:`${localStorage.getItem('idToken')}`
      }),
    })
  }
}
