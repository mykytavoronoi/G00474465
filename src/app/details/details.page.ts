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
//fires every time the page is navigated to/ shows the person that was selected on the movie details page
ionViewWillEnter() {
  var actor = this.movieService.selectedPerson;
  console.log('actor:', actor);

  //  reset the data every time the page is entered
  this.actorDetails = null;
  this.credits = [];

  // call the api if an actor was selected
if (actor) {
  // fetching details of the person
  this.movieService.getPersonDetails(actor.id).subscribe((data:any) => {
    this.actorDetails = data;
  });
  // fetching the other movies actor starred in
  this.movieService.getPersonMovieCredits(actor.id).subscribe((data:any) => {
    this.credits = data.cast;
  });
}
}
// Building the path to image URL, from movie.ts
getProfile(path: string): string {
    return this.movieService.getPosterLink(path);
  }
// Navigation to movie details
  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details']);
  }
// Navigation to Home page
  goHome() {
    this.router.navigate(['/home']);
  }
// navigation to favourites page
  goFav() {
    this.router.navigate(['/favourites']);
  }
}