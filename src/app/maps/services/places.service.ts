import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from '.';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places:Feature[] = [];

  get isUserLocationReady():boolean {
    return !!this.useLocation;
  }

  constructor(
    // private http:HttpClient
    private placesApi:PlacesApiClient,
    private mapService:MapService
    ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];
          // console.log(this.useLocation);
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalizacion');
          console.log(err);
          reject();
        }
      )

    });
  }

  getPlacesByQuery( query:string = '' ){
    // si es nulo
    if(query.length === 0){
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }


    if(!this.useLocation) throw Error('No hay userLocation');

    this.isLoadingPlaces = true;

    // this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=mx&proximity=-98.7326358953287%2C20.11957270588023&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoibWFxYWxoZXIiLCJhIjoiY2wwM2ludnBhMWR5NjNibWxjb2gwdGwyYSJ9.JxgD6N5vYbPHAJegJ0Z2Pg`)
    this.placesApi.get<PlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: this.useLocation.join(',')
      }
    })
      .subscribe( resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        //agregar marcadores busqueda
        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
      });

  }

  deletePlaces() {
    this.places = [];
  }

}
