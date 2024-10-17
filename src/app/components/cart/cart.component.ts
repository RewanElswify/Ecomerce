import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService);

  cartDetails: Icart = {} as Icart;

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        console.log(res.data)
        this.cartDetails = res.data

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  removeItem(id: string): void {
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data ;
        this._CartService.cartNumber.next(res.numOfCartItems);

      },
      error: (err) => {
        console.log(err)
      }
    })

  }
  updateCount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateProductQuantaty(id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.cartDetails = res.data ;
        },
        error: (err) => {
          console.log(err)
        }

      })
    }
  }

  clearItems(): void {
    this._CartService.clearcCart().subscribe({
      next: (res) => {
        console.log(res);

        if (res.message == 'success') {
          this.cartDetails = {} as Icart;
          this._CartService.cartNumber.next(0)

        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}

