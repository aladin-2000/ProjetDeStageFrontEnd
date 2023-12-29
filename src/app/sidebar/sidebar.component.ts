import { Component, OnInit } from '@angular/core';
import { AssetService } from '../Services/asset.service';
import { CpeService } from '../Services/cpe.service';
import { Asset } from '../Model/Asset';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  longueur:number=0;
  AssetPeople : number = 0;
  AssetObject:number = 0;
  AssetHardware : number = 0;
  AssetSoftware : number = 0;
  assets : Asset[]=[];



 
  


}
