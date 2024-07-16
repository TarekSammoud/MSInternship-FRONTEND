import { Component } from '@angular/core';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showCarousel = true;
  images = ['hero_1.jpg', 'hero_2.jpg', 'hero_3.jpg'];

  constructor(public accountService:AccountService){

  }
}
