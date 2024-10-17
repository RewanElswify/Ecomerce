import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { UpperCasePipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [UpperCasePipe ,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent  implements OnInit{

  productList: Iproduct[] = [];

  wishlist: string[] = [] ;
 private readonly _WishlistService = inject(WishlistService);

 private readonly _CartService = inject(CartService);

  ngOnInit(): void {
    this._WishlistService.getLoggedUserWishlis().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;

        const newData = res.data.map((item: any) => item._id);

        console.log(newData, 'newdata');

        this.wishlist = newData;

      },
      error: (err) => {
        console.log(err)
      }

    })
  }


  addcart(id :string): void {
    this._CartService.addProductToCart(id).subscribe( {
      next:(res)=>{
        console.log(res) ;
  //  this.ToastrService.success(res.message , 'freshCart')
    this._CartService.cartNumber.next( res.numOfCartItems );

     console.log(this._CartService.cartNumber) ;
      },

      error:(err)=>{
        console.log(err)
      }
    })
   }


   addToWishlist( id:string):void {
    this._WishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res) ;
          this.wishlist = res.data ;
      },
      error:(err)=>{
        console.log(err)
      }
    })
     }

   removeFromWishlist(id:string):void {
    this._WishlistService.removeProductFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res) ;
        this.wishlist = res.data ;

 this._WishlistService.getLoggedUserWishlis().subscribe({
  next:(res)=>{
    console.log(res) ;
    this.productList = res.data;

  },
  error:(err)=>{
    console.log(err)
  }
 })

      },
      error:(err)=>{
        console.log(err)
      }
    })
     }
}
