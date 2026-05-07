import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IonHeader, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Movie } from '../services/movie';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [IonHeader, IonTitle, CommonModule, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonToolbar, IonButtons, IonIcon, IonButton]
})
export class DetailsPage {
  actorDetails: any;
  credits: any[] = [];


constructor(private router: Router, private movieService: Movie) {
  addIcons ({home, heart});
}

ionViewWillEnter() {
  var actor = this.movieService.selectedPerson;
  console.log('actor:', actor);
  this.actorDetails = null;
  this.credits = [];

if (actor) {
  this.movieService.getPersonDetails(actor.id).subscribe((data:any) => {
    this.actorDetails = data;
  });
  this.movieService.getPersonMovieCredits(actor.id).subscribe((data:any) => {
    this.credits = data.cast;
  });
}
}
getProfile(path: string): string {
    return this.movieService.getPosterLink(path);
  }

  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goFav() {
    this.router.navigate(['/favourites']);
  }
}