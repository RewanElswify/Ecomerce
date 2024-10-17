
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { error } from 'console';
import { Iproduct } from '../../core/interfaces/iproduct';

import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent  implements  OnInit{
private  readonly _ActivatedRoute = inject(ActivatedRoute);
private  readonly _ProductsService = inject(ProductsService);


 detailsProduct: Iproduct | null = null ;
//  detailsCategorise : Icategory | null= null ;

  ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe(
    {
      next:(p)=>{
        let idProduct = p.get('id' );
        // call Api ///  getSpecificProducts     getSpecificCategory
        this._ProductsService.getSpecificProducts( idProduct).subscribe({
          next :(res)=>{
            console.log(res.data);
            this.detailsProduct = res.data ;
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }
    }
  )
  };








}
