import { Component, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from "../../../model/GenericRobotModel/Property";
import { PropertyTypeEnum } from "../../../model/GenericRobotModel/PropertyTypeEnum";

@Component({
  selector: 'app-model-table',
  templateUrl: './model-table.component.html',
  styleUrls: ['./model-table.component.css']
})
export class ModelTableComponent {

  @Input()
  root: Property;
  @Input()
  header: string;
  @Input()
  set properties(val: any){
    this._properties = val;
    if(this.prop != null){
      this.updateRoot(this.prop, false);
    }
  }
  public breadcrumbs: Array<Property> = [];
  private _properties;
  private prop: Property;
  private i: number;

  constructor(private router: Router) {
    router.events.subscribe((val) => { this.breadcrumbs = []; })
  }

  updateRoot(prop: Property, click = true): void {
    this.prop = prop;
    if (prop.isComplex() && click) {
      this.breadcrumbs.push(prop);
    }

    if (prop.type === PropertyTypeEnum.COMPLEX) {
      this.header = prop.name;
      this._properties = prop.getValue();
    }
  }

  goToRoot(): void {
    this.prop = null;
    this.breadcrumbs = [];
    this.header = this.root.name;
    this._properties = this.root.getValue();
  }

  goToSelectedItem(prop: Property, i: number): void {
    this.prop = prop;
    const length = this.breadcrumbs.length;
    this.breadcrumbs.splice(i, length);
    this.updateRoot(prop);
  }
}
