import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { };


 cartNumber : BehaviorSubject<number> =  new  BehaviorSubject(0)


  myHedares: any = { token: localStorage.getItem('userToken') };

  addProductToCart(id: string): Observable<any> {

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      },
      {
        headers: this.myHedares
      }
    )
  }

  getProductsCart(): Observable<any> {

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
      {
        headers: this.myHedares
      }
    )
  }

  deleteSpecificCartItem(id: string): Observable<any> {

    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        headers: this.myHedares
      }
    )
  }

  updateProductQuantaty(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
      },
      {
        headers: this.myHedares
      }
    )
  }

  clearcCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      {
        headers: this.myHedares
      }
    )
  }


}
