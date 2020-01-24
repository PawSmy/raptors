import { Component, OnInit } from '@angular/core';
import {MapService} from "../../../services/map.service";
import * as L from 'leaflet';
import '../../../../../node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.js'
import '../../../../lib/leaflet-easybutton/src/easy-button';
import '../../../../lib/leaflet-easybutton/src/easy-button.css';
import {Polygon} from "../../../model/MapAreas/Polygons/Polygon";
import {UniversalPoint} from "../../../model/MapAreas/UniversalPoint";
import {AreaType} from "../../../model/type/AreaType";
import {PolygonService} from "../../../services/polygon.service";
import {Marker} from "leaflet/src/layer/marker/Marker";
import {StoreService} from "../../../services/store.service";

@Component({
  selector: 'app-polygons',
  templateUrl: './polygons.component.html',
  styleUrls: ['./polygons.component.css']
})
export class PolygonsComponent implements OnInit {
  dataLoaded = false;
  private drawPolygon = false;
  private imageResolution;
  private mapResolution = 0.01;//TODO()
  private map;
  private imageURL = '';
  private polygonPoints = [];
  private convertedPoints = [];
  private polygonsList = [[]];
  private vertices: Marker[] = [];
  private polygon = L.polygon;
  constructor(private mapService: MapService,
              private polygonService: PolygonService,
              private store: StoreService) {
  }

  ngOnInit() {
    this.loadMap();
  }

  private loadMap() {
    if (localStorage.getItem(this.store.mapID) !== null) {
      this.afterMapLoaded(localStorage.getItem(this.store.mapID))
    } else {
      this.mapService.getMap(this.store.mapID).subscribe(
        data => {
          this.afterMapLoaded(data);
          localStorage.setItem(this.store.mapID, data)
        }
      );
    }
  }

  private afterMapLoaded(data: String) {
    this.dataLoaded = true;
    this.imageURL = 'data:image/jpg;base64,' + data;
    this.initMap();

    const img = new Image;
    img.src = this.imageURL;
    img.onload = () => {
      this.imageResolution = img.width;
      //
    }
  }

  private initMap(): void {
    const imageBounds = [[0, 0], [800, 800]];
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      contextmenu: true,
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    L.easyButton( 'fa-crosshairs', function(btn, map){
      map.setView([400,400],0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);

    this.drawPoly();

  }

  private drawPoly(){
    this.map.on('click', e => {
      // dodaj wierzcholki do listy
      if(!this.drawPolygon) {
        console.log("Markec created")
        const markerIcon = L.icon({
          iconUrl: '/assets/icons/position.png',
          iconSize: [36, 36],
          iconAnchor: [36 / 2, 36 / 2]
        });
        let marker = new L.marker(e.latlng, {
          draggable: true,
          icon: markerIcon,
          contextmenu: true,
          contextmenuItems: [
            {
              text: 'Usuń punkt trasy',
              callback: this.deleteMarker,
              context: this
            }
          ]
        });

        //this.markerIDs.push(marker.markerIDs);
        //this.polygonPoints.push(e.latlng);
        //this.polygonPoints.push(e.latlng);
        //this.vertices.push(marker);

        marker.addTo(this.map);
        console.log(marker._leaflet_id);
        //console.log("Nierealna wartość: " + e.latlng.lat());
        this.vertices.push(marker);

        //przemieszczanie vertexów
        marker.on('move', e => {
          this.updatePoly(e)
        });
        console.log(marker._latlng);
        //this.vertices.push(marker);
      }
    });

  }


  //przemieszczanie vertexów
  private updatePoly(e) {
    let markerPos = this.vertices.filter(marker => marker._leaflet_id === e.target._leaflet_id)[0];
    let newEdges = [];
    console.log("ID kilkniętego markera: " + e.target._leaflet_id);
    console.log("Pozycja kilkniętego markera: " + e.target._latlng);
    newEdges = this.vertices;
    //console.log("DRUKUJ:" + markerPos._latlng);
    newEdges.forEach(vertice=>{
      if(vertice._leaflet_id===markerPos._leaflet_id){
        vertice._latlng = markerPos._latlng;
        //console.log("Wykryto id: " + vertice._leaflet_id);
      }
      //newEdges = this.vertices;
    });
    this.polygonPoints = [];
    this.vertices = [];
    this.vertices = newEdges;
    this.createPoly();
    newEdges = [];
  }

/*  private updatePolygons(e){
    let markerPos = this.polygonPoints.filter(marker => marker._leaflet_id === e.target._leaflet_id)[0];
  }*/

  private createPoly(){
    console.log("Vertices: " + this.vertices);
    console.log("polygonPoints: " + this.polygonPoints);
    this.polygonPoints = [];
    console.log("polygonPoints clear: " + this.polygonPoints);
    console.log("Vertices: " + this.vertices);

    this.vertices.forEach(marker=>{
      this.polygonPoints.push(marker._latlng);
    });
    console.log("Wierzchołki: "+this.polygonPoints);
    if(this.polygonPoints.length<=3){
      alert("Zbyt mała liczba wierzchołków: " + this.polygonPoints.length);
    }
    else{
      this.map.removeLayer(this.polygon);
      this.polygonsList.push(this.polygonPoints);
      this.polygon = L.polygon(this.polygonPoints, {color: 'red'}).addTo(this.map);
      this.map.fitBounds(this.polygon.getBounds());
    }
  }

  private getRealCoordinates(value) {
    return (value * this.mapResolution * (this.imageResolution / 800) - ((this.imageResolution * this.mapResolution) / 2))
  }

  private clearVertexList(vertexList: any[]){
    while (vertexList.length) {
      vertexList.pop();
    }
  }

  private savePoly(){
    // konwersja latlng na punkty z mapy
    let polygonPointz: UniversalPoint[] = [];
    this.polygonPoints.forEach(polygonP => {
      let coords: L.latLng = new L.latLng([
        this.getRealCoordinates(polygonP.lat),
        this.getRealCoordinates(polygonP.lng)]);
      this.convertedPoints.push(coords)
    });

    // tworzenie obiektu polygon, przygotowanie do wysłania na bazę
    this.convertedPoints.forEach(polygonP => {
      let universalPoint: UniversalPoint = new UniversalPoint(
        polygonP.lat,
        polygonP.lng,
       0
      );
      polygonPointz.push(universalPoint)
    });
    let type: AreaType = new AreaType('Polgon');
    let polygon = new Polygon('polygon',type, polygonPointz);
    console.log(polygon);
    this.polygonService.save(polygon).subscribe(result => console.log(result));
    this.polygonPoints = [];
    this.vertices = [];
  }

  private deleteMarker(e) {
    this.vertices = this.vertices.filter(marker => marker !== e.relatedTarget);
    this.map.removeLayer(e.relatedTarget);
  }
 /* private getPoly(){
    this.polygonService.getPolygon().subscribe(
      polygon => {
        this.createPoly();

      }
    );
  }*/

  }
