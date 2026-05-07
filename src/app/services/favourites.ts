import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Favourites {
  private key = 'favourites';
// returns the list of favourite movies from the localStorage
  getFavourites(): any[] {
    const data = localStorage.getItem(this.key);
  if (data) {
    var parsed = JSON.parse(data);
    var clean = [];
    // loop and keep only non null entries saved
    for (var i = 0; i < parsed.length; i++) {
      if (parsed[i] != null) {
        clean.push(parsed[i]);
  }
  }
  return clean;
} else {
  // return empty if nothing has been saved
  return [];
  }
}
// checks if already is favourite
isFavourite(movieId: any): boolean {
  const favs = this.getFavourites();
  return favs.some(fav => fav.id === movieId);
}
  
// adds to favourites and adds to localStorage
addFavourite(movie:any) {
  // guard for null or invalid movies
if (!movie || !movie.id) {
  return;
}
// add only if not yet a favourite
if (!this.isFavourite(movie.id)) {
  var favs = this.getFavourites();
  favs.push(movie);
  localStorage.setItem(this.key, JSON.stringify(favs));
}
}
// remove from the list by id
removeFavourite(movieId:any) {
  var favs = this.getFavourites();
  var newFavs = [];
  for (var i = 0; i < favs.length; i++) {
    if (favs[i].id !== movieId) {
      newFavs.push(favs[i]);
    }
  }
  // save back to localStorage
  localStorage.setItem(this.key, JSON.stringify(newFavs));
}
}