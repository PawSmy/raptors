import {Component, OnInit} from '@angular/core';
import {ContactInfo} from '../../model/Settings/ContactInfo';
import {InstanceInfo} from '../../model/Settings/InstanceInfo';
import {MapInfo} from '../../model/Settings/MapInfo';
import {Graph} from '../../model/Graphs/Graph';
import {SettingsService} from '../../services/settings.service';
import {StoreService} from '../../services/store.service';
import {MapService} from '../../services/map.service';
import {GraphService} from '../../services/graph.service';
import {ContactInfos} from '../../model/Settings/ContactInfos';
import {AuthService} from '../../services/auth.service';
import {RobotTask} from '../../model/Robots/RobotTask';
import {User} from '../../model/User/User';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  modalID = 'settingsTypeModal';
  modalID1 = 'settingsTypeModal1';
  modalID2 = 'settingsTypeModal2';
  mapModal = 'settingsTypeModal3';
  graphModal = 'settingsTypeModal4';

  contactInfo: ContactInfo[] = [new ContactInfo(), new ContactInfo()];
  instanceInfo: InstanceInfo = new InstanceInfo('', '', '');
  currentMap: MapInfo = new MapInfo('', '', 0, 0, 0, 0, 0, 0);
  mapsData: MapInfo[];
  graphs: Graph[];

  constructor(private settingsService: SettingsService,
              private mapService: MapService,
              private graphService: GraphService,
              private storeService: StoreService,
              public authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.settingsService.getInstanceInfo().subscribe(data =>
        this.instanceInfo = data,
      error => {
        console.log(error);
      }
    );

    this.settingsService.getContactInfo().subscribe(data =>
        this.contactInfo = data,
      error => {
        console.log(error);
      }
    );

    this.settingsService.getCurrentMap().subscribe(data => {
        this.currentMap = data;
        console.log(this.currentMap.mapId);
        this.graphService.getAllByMapId(this.currentMap.mapId).subscribe(data =>{
            this.graphs = data;
            console.log(this.graphs);
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );

    this.mapService.getMapsInfo().subscribe(data =>
        this.mapsData = data,
      error => {
        console.log(error);
      }
    );
  }

  updateMapInfo() {

    this.graphService.getAllByMapId(this.currentMap.mapId).subscribe(data =>
        this.graphs = data,
      error => {
        console.log(error);
      }
    );

    this.currentMap.graphId = null;
    this.settingsService.updateCurrentMap(this.currentMap.mapId).subscribe(
      result => {
        this.toastr.success('Edytowano pomyślnie');
        this.storeService.currentMapId = this.currentMap.mapId;
      },
      error => {
        console.log(error);
        this.toastr.error('Wystąpił bład podczas dodawania lub edycji');
      }
    );
  }

  updateGraphInfo() {
    this.settingsService.updateCurrentGraph(this.currentMap.graphId).subscribe(
      result => {
        this.toastr.success('Edytowano pomyślnie');
        // this.storeService.currentMapId = this.currentMap.mapId;
      },
      error => {
        console.log(error);
        this.toastr.error('Wystąpił bład podczas dodawania lub edycji');
      }
    );
  }

  updateInstanceInfo() {
    this.settingsService.updateInstanceInfo(this.instanceInfo).subscribe(
      result => {
        this.toastr.success('Edytowano pomyślnie');
      },
      error => {
        console.log(error);
        this.toastr.error('Wystąpił bład podczas dodawania lub edycji');
      }
    );
  }

  updateContactInfo() {
    this.settingsService.updateContactInfo(this.contactInfo).subscribe(
      result => {
        this.toastr.success('Edytowano pomyślnie');
      },
      error => {
        console.log(error);
        this.toastr.error('Wystąpił bład podczas dodawania lub edycji');
      }
    );
  }

  reset() {
    console.log('reset');
  }

  editInstanceInfo(instanceInfo: InstanceInfo) {
    Object.assign(this.instanceInfo, instanceInfo);
  }

  editMapInfo(currentMap: MapInfo) {
    Object.assign(this.currentMap, currentMap);
  }

  editGraphInfo(currentMap: MapInfo) {
    Object.assign(this.currentMap.graphId, currentMap.graphId);
  }

  editContactInfo(contactInfoArray: ContactInfo[]) {
    console.log(contactInfoArray);
    Object.assign(this.contactInfo, contactInfoArray);
  }

}
