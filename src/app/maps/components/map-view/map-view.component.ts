import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(
    private placesService:PlacesService,
    private mapService:MapService ) { }

  ngAfterViewInit(): void {

    if(!this.placesService.useLocation) throw Error('No hay placesService.useLocation ');

    // console.log(this.placesService.useLocation);
    const map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 14 // starting zoom
      });

    const pop = new mapboxgl.Popup()
    .setHTML(`
      <h6>Aqui estoy</h6>
      <span>Estoy en este lugar del mundo</span>
    `);

    new mapboxgl.Marker({color: 'red'})
      .setLngLat(this.placesService.useLocation)
      .setPopup(pop)
      .addTo(map)

    this.mapService.setMap( map );
  }




}
