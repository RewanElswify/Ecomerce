import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  myHedares: any = { token: localStorage.getItem('userToken') };

  constructor( private _HttpClient :HttpClient) { }

  addProductToWishlist( id:string) :Observable<any>{

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,

      {
        productId: id
    },
    {
      headers: this.myHedares
    }
    )
  }



  getLoggedUserWishlis( ):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,
    {
      headers: this.myHedares
    }
    )
  }




removeProductFromWishlist(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,
    {
      headers: this.myHedares
    }
    )
  }


}



