import { Component, OnInit } from '@angular/core';
import { AssetService } from '../Services/asset.service';
import { CpeService } from '../Services/cpe.service';
import { Asset } from '../Model/Asset';
import { forkJoin } from 'rxjs';

declare var Chart: any; // Import Chart.js library

@Component({
  selector: 'app-cpe-dashboard',
  templateUrl: './cpe-dashboard.component.html',
  styleUrls: ['./cpe-dashboard.component.css']
})
export class CpeDashboardComponent implements OnInit {

  longueur:number=0;
  AssetPeople : string=""
  AssetObject: string=""
  AssetHardware : string=""
  AssetSoftware : string=""
  assets : Asset[]=[];



  constructor(private assetService:AssetService,private cpeService:CpeService) {


  }
  ngOnInit(): void {
    this.loadAssets();
    this.f();

    
  }


loadAssets(){
  ( this.assetService.GetAssets()).subscribe(Response=>{
    this.assets=Response
  })
    
  }

  f() {
    const hardware$ = this.assetService.ReturnNumberOfHardwareAsset();
    const object$ = this.assetService.ReturnNumberOfObjectAsset();
    const people$ = this.assetService.ReturnNumberOfPeopleAsset();
    const software$ = this.assetService.ReturnNumberOfSoftwareAsset();
  
    forkJoin([hardware$, object$, people$, software$]).subscribe(([hardware, object, people, software]) => {
      this.longueur=hardware+object+people+software;
      var AssetHardware = hardware/this.longueur;
      this.AssetHardware=AssetHardware.toFixed(3)

      var AssetObject = object/this.longueur;
      this.AssetObject=AssetObject.toFixed(3)


      var AssetPeople = people/this.longueur;
      this.AssetPeople=AssetPeople.toFixed(3)


      var AssetSoftware = software/this.longueur
      this.AssetSoftware=AssetSoftware.toFixed(3)



      const xValues = ["AssetHardware", "AssetObject", "AssetPeople", "AssetSoftware"];
      const yValues = [AssetHardware*100,AssetObject*100, AssetPeople*100 ,AssetSoftware*100 ];
      console.log(this.AssetHardware)
      const barColors = [
        "#ff3366", "#6571ff",  "#66d1d1", "#05a34a"
      ];
  
      new Chart("myChart", {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "World Wide Wine Production 2018"
          }
        }
      });


      
  
    });
  }


asset:Asset={
    id:0,
    type: "",
    name: "",
    vendor: "",
    product : "",
    version : "",
    cpeName : "",
    date:"jj/mm/aaaa"

  }


cves: string[][] = [];
cve:string[]=[]
Name=""
VendorProductVersion="";


   SearchAssetByName(Name: string){
      this.VendorProductVersion=this.Name;
       this.cpeService.GetCves(this.VendorProductVersion).subscribe(Response=>{
        this.cves=Response;
        this.fonctionCve(this.cves)
        console.log(this.cves)
      })
  }

  fonctionCve(cves:string[][]){
    for(var j=0;j<cves.length;j++){

      for(var i=0;i<7;i++){
        if (cves[j][i]==null){
          cves[j][i]="Not specified";
  
        }
      }

    }
    

  }

ConstruireVendorProductVersion(asset:Asset){
  this.Name=asset.vendor+":"+asset.product+":"+asset.version;
  console.log(asset.product)
  console.log(this.Name)
}



}
