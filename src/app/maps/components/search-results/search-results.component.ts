import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId:string = '';

  constructor( 
    private placesServices:PlacesService,
    private mapService:MapService) { }

  get isLoadingPlaces():boolean {
    return this.placesServices.isLoadingPlaces;
  }

  get places() {
    return this.placesServices.places;
  }

  flyTo(place:Feature){
    this.selectedId = place.id;

    const [lng, lat] = place.center;
    this.mapService.flyTo([lng,lat]);
  }

  getDirections(place:Feature){

    if(!this.placesServices.useLocation ) throw Error('No hay userLocation');

    this.placesServices.deletePlaces();

    const start = this.placesServices.useLocation!;
    const end = place.center as [number,number];

    this.mapService.getRouteBetweenPoints(start,end)
  }

}
 