import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Marker} from 'leaflet/src/layer/marker/Marker.js';
import {StoreService} from "../../../../services/store.service";
import { SettingsService } from '../../../../services/settings.service';
import * as L from 'leaflet';
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";

@Component({
  selector: 'app-vertex-list',
  templateUrl: './vertex-list.component.html',
  styleUrls: ['./vertex-list.component.css']
})
export class VertexListComponent implements OnInit, OnChanges {

  @Input() markers: Marker[];
  @Output() markersEmitter = new EventEmitter<Marker[]>();
  @Output() deleteMarkerEmitter = new EventEmitter<any>();

  private mapResolution;
  private mapOriginX;
  private mapOriginY;
  private imageResolution;
  private mapContainerSize = 800;

  constructor(private store: StoreService,
              private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.loadMap();
  }

  private loadMap() {
    this.settingsService.getCurrentMap().subscribe(
      mapData => {
        this.mapResolution = mapData.mapResolutionX;
        this.mapOriginX = mapData.mapOriginX;
        this.mapOriginY = mapData.mapOriginY;
        this.imageResolution = mapData.imageResolutionX;
      }
    );
  }

  updateMarker(id) {
    const x = Number(document.getElementById(id + "x").innerText);
    const y = Number(document.getElementById(id + "y").innerText);
    this.markers[id].setLatLng([this.getMapCoordinates(y, this.mapOriginY), this.getMapCoordinates(x, this.mapOriginX)]);
    this.markersEmitter.emit(this.markers);
  }

  deleteMarker(marker: Marker) {
    let e: any = {relatedTarget: null};
    e.relatedTarget = marker;
    this.deleteMarkerEmitter.emit(e);
  }


  getMarkerPos(marker: Marker) {
    return {
      x: this.getRealCoordinates(marker.getLatLng().lng, this.mapOriginX),
      y: this.getRealCoordinates(marker.getLatLng().lat, this.mapOriginY)
    }
  }

  getRealCoordinates(value: number, origin : number) {
    return (value * this.mapResolution * (this.imageResolution /  this.mapContainerSize) + origin)
  }

  private getMapCoordinates(value, origin) {
    return (value - origin) * (1 / this.mapResolution) * ( this.mapContainerSize / this.imageResolution)
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
