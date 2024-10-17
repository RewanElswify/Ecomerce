import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

 counter : WritableSignal<number> =  signal(0);

 userName: WritableSignal<string>  = signal (" ")

 changeName(): void {
  this.userName.set(' Mohamed')
 }


 changeCounter() : void {

  this.counter.update( (value)=>  value +1 ) ;
 }

}
