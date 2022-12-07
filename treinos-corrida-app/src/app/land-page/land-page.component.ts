import { CorridaService } from './../services/corrida.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})
export class LandPageComponent implements OnInit {
  imageURL: string = 'assets/resources/images/corrida.jpg';
  subscription!: Subscription;
  constructor(private router: Router, private corridaService: CorridaService) {
      console.log('observer - land-page');
    
   }

  ngOnInit(): void {
  }

  getBackgroundImage() {
    return {
      'background-image':
        'linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(' +
        this.imageURL +
        ')',
    };
  }

}
