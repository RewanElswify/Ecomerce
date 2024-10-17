import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {


price : WritableSignal<number> =  signal(20);
quntity : WritableSignal<number> =  signal(10);

totalPrice : Signal<number> = computed(  ()=>  this.price() * this.quntity() ) ;


changePrice() : void {
  this.price.set( 30) ;
  console.log(this.price () );

}

  counter : WritableSignal<number> =  signal(0);

  userName: WritableSignal<string>  = signal (" ahmed ")

  changeName(): void {
   this.userName.set('ali')
  }


  changeCounter() : void {

   this.counter.update( (value)=>  value +1 ) ;
  }


}
