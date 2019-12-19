import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { InputFileComponent } from 'ngx-input-file';
import { MapService } from '../../../services/map.service';
import { Map } from '../../../model/Map';

@Component({
  selector: 'app-map-upload',
  templateUrl: './map-upload.component.html',
  styleUrls: ['./map-upload.component.css']
})
export class MapUploadComponent implements OnInit {

  mapSelected = false;
  yamlSelected = false;
  mapName: string = '';

  constructor(private mapService: MapService) {

  }

  ngOnInit() {
  }


  @ViewChild('mapInput', {static: false})
  private mapInputComponent: InputFileComponent;

  @ViewChild('yamlInput', {static: false})
  private yamlInput: InputFileComponent;

  submitFiles() {
   this.mapService.save(this.mapName, this.mapInputComponent.files[0].file,this.yamlInput.files[0].file);
  }
}
