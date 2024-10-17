import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink ,UpperCasePipe , SalePipe  ,LowerCasePipe ,TitleCasePipe , SlicePipe ,CurrencyPipe ,DatePipe , JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly _ProductsService = inject(ProductsService);

  private readonly _CategoriesService = inject(CategoriesService);

  private readonly  _CartService = inject(CartService);
  private readonly  _WishlistService = inject(WishlistService);


  productList: Iproduct[] = [];

  categorylist: Icategory[] = [];


  wishlist: string[] = [] ;

  text  : string = "";

  getAllproductsub!: Subscription;

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplayTimeout:3000 ,
    autoplay:true ,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }
  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplayTimeout:3000 ,
    autoplay:true ,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categorylist = res.data;
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.getAllproductsub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err)
      }
    })

  this._WishlistService.getLoggedUserWishlis().subscribe({
    next:(res)=>{
      console.log(res.data , 'wishlist') ;

 const newData = res.data.map((item:any)=> item._id ) ;

 console.log(newData,'newdata') ;

 this.wishlist = newData ;

    },
    error:(err)=>{
      console.log(err)
    }
  })


  }
  ngOnDestroy(): void {
    //un subscrip
    this.getAllproductsub?.unsubscribe()
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
    },
    error:(err)=>{
      console.log(err)
    }
  })
   }



}



