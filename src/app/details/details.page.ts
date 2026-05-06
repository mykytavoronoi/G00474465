import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IonHeader, IonTitle } from '@ionic/angular/standalone';
import { Movie } from '../services/movie';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [IonHeader, IonTitle, CommonModule]
})
export class DetailsPage {
  
}