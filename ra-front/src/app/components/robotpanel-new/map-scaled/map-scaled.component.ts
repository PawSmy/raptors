import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { MapService } from '../../../services/map.service';
import '../../../../../node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.js'
import '../../../../../node_modules/leaflet-path-transform/dist/L.Path.Transform.js'
import '../../../../lib/leaflet-circle-to-polygon/leaflet.circle.topolygon-src.js'
import '../../../../lib/leaflet-easybutton/src/easy-button';
import '../../../../lib/leaflet-easybutton/src/easy-button.css';

import 'leaflet-path-transform';
import { StoreService } from "../../../services/store.service";
import { SettingsService } from '../../../services/settings.service';
import { Robot } from "../../../model/Robots/Robot";
import { ROBOTICON } from "../../map/map.component";

declare var L: any;

@Component({
  selector: 'app-map-scaled',
  templateUrl: './map-scaled.component.html',
  styleUrls: ['./map-scaled.component.css']
})
export class MapScaledComponent implements OnInit, OnChanges {


  @Input()
  mapContainerSize: number = 800;
  @Input()
  robot: Robot;

  public dataLoaded = false;
  public mapLoaded = false;

  //Map related variables
  private map;
  private imageURL = '';
  private mapId;
  private mapResolution;
  private mapOriginX;
  private mapOriginY;
  private imageResolution;
  private marker;

  


  constructor(private mapService: MapService,
              private settingsService: SettingsService,
              private storeService: StoreService) {
  }

  ngOnInit() {
    this.loadMap();
  }

  ngOnChanges(changes: { robot: SimpleChange }) {
    // Extract changes to the input property by its name
    if (this.mapLoaded) {
      if (changes.robot.currentValue) {
        const newRobot: Robot = changes.robot.currentValue;
        this.drawRobot(newRobot)
      }
    }
  }

  private loadMap() {
    this.settingsService.getCurrentMap().subscribe(
      mapData => {
        this.mapId = mapData.mapId;
        this.mapResolution = mapData.mapResolutionX;
        this.mapOriginX = mapData.mapOriginX;
        this.mapOriginY = mapData.mapOriginY;
        if(this.mapId != this.storeService.loadedMapId){
          this.storeService.loadedMapId = this.mapId;
          this.storeService.currentMapId = this.mapId;
          this.mapService.getMap(this.mapId).subscribe(
            data => {
              this.storeService.mapURL = data;
              this.afterMapLoaded(data);
            }
          );
        }
        else {
          this.afterMapLoaded(this.storeService.mapURL);
        }
      }
    );
  }

  private afterMapLoaded(data: String) {
    this.dataLoaded = true;
    this.imageURL = 'data:image/jpg;base64,' + data;
    this.initMap();

    const img = new Image;
    img.src = this.imageURL;
    img.onload = () => {
      this.imageResolution = img.width;
    }
  }

  private initMap(): void {
    const imageBounds = [[0, 0], [this.mapContainerSize, this.mapContainerSize]];
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      contextmenu: true,
      minZoom: 0,
      maxZoom: 10
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    L.easyButton('fa-crosshairs', function (btn, map) {
      map.setView([this.mapContainerSize / 2, this.mapContainerSize / 2], 0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);
    this.mapLoaded = true;
  }


  private drawRobot(robot: Robot) {
    if (this.marker) {
      this.map.removeLayer(this.marker)
    }
    const position = [
      this.getMapCoordinates(Number(robot.pose.position.y), this.mapOriginY),
      this.getMapCoordinates(Number(robot.pose.position.x), this.mapOriginX)
    ];
    this.marker = L.marker(position, { icon: ROBOTICON });
    this.marker.addTo(this.map);
    this.marker.bindPopup(
      "Robot Details<br />Position x: "
      + this.getRealCoordinates(this.marker.getLatLng().lng, this.mapOriginX)
      + "<br />Position y: " +
      +this.getRealCoordinates(this.marker.getLatLng().lat, this.mapOriginY));
  }

  getRealCoordinates(value: number, origin : number) {
    return (value * this.mapResolution * (this.imageResolution /  this.mapContainerSize) + origin)
  }

  getMapCoordinates(value, origin) {
    return (value - origin) * (1 / this.mapResolution) * ( this.mapContainerSize / this.imageResolution)
  }

  getRounded(value) {
    if (value) return value.toFixed(4);
  }
}
