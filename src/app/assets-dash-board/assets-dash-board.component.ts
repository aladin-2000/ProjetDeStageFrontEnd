import { AssetService } from '../Services/asset.service';
import { Asset } from '../Model/Asset';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CpeService } from '../Services/cpe.service';

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';


@Component({
  selector: 'app-assets-dash-board',
  templateUrl: './assets-dash-board.component.html',
  styleUrls: ['./assets-dash-board.component.css']
})
export class AssetsDashBoardComponent implements OnInit {

  @ViewChild('remote')
  public remoteObj: AutoCompleteComponent | undefined;

  @ViewChild('remoteProduct')
  public remoteProduct: AutoCompleteComponent | undefined;

  @ViewChild('remoteVersion')
  public remoteVersion: AutoCompleteComponent | undefined;

  constructor(private assetService:AssetService,private cpeService:CpeService) {
    //this.loadCpeNames();
    this.loadVendors();
  }

  Cpenames: string[] = [];
  filteredCpeNames: string[] = [];
  searchTerm: string = ''; // La valeur saisie dans l'input

  vendor="";
  product="";
  version="";

  Vendors: Array<string> = [];

ProductListe: Array<string> = [];
VersionListe: Array<string> = [];
ListeCPES: Array<string> = [];

public suggestionCount: number = 10;


  assets:Asset[]=[];
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
  filtredVendors: string[] = [];

  public remoteWaterMark:string="Serch for a vendor"

  private searchTerms : string="";

  filtredProducts: Array<string> = [];

  filtredVersions:Array<string> =[];

  ngOnInit(): void {
    this.GetAllAssets();
  }



   GetAllAssets() {
    ( this.assetService.GetAssets()).subscribe(response => {
      this.assets=response;
    })
  }

 

  AddOneAsset() {
    this.assetService.PostAssets(this.asset).subscribe(Response=>{
      
      this.GetAllAssets();
      this.asset={
        id:0,
        type: "",
        name: "",
        vendor: "",
        product : "",
        version : "",
        cpeName : "",
        date:"jj/mm/aaaa"

      };
      this.searchTerm="";
    })
  }

  deleteAsset(ID:number) {
    this.assetService.DeleteOneAsset(ID).subscribe(response=>{
      this.GetAllAssets();
    });
  }

  updateAsset(Id:number) {
    
    this.assetService.UpdateOneAsset(Id,this.asset).subscribe(response=>{
      this.GetAllAssets();
      this.asset={
        id:0,
        type: "",
        name: "",
        vendor: "",
        product : "",
        version : "",
        cpeName : "",
        date:"jj/mm/aaaa"
      }
    })
  }


  errase(){
    this.asset={
      id:0,
      type: "",
      name: "",
      vendor: "",
      product : "",
      version : "",
      cpeName : "",
      date:"jj/mm/aaaa"

    };
    this.searchTerm="";
    this.loadVendors();
    
  }



  tempAssetId=0;

setTempAssetId(id: number) {
  this.tempAssetId = id;
}
setTempAssetIdAndFillTheBlacks(id:number){
  
  this.tempAssetId = id;
  this.assetService.GetOneAsset(this.tempAssetId).subscribe(response=>{
    this.asset=response;
    
  })

}



afficher(){
  this.cpeService.GetCpeNames().subscribe(response=>{


    console.log(response);
    this.Cpenames=response;
    for(let cpename of this.Cpenames){

      let L=cpename.split(":");

      let vendor=L[0];
      let product=L[1];
      let version=L[2];
    }
  })
}



f(){
  this.loadCpeNames()
}

loadCpeNames() {
  this.cpeService.GetCpeNames().subscribe(response => {
    this.Cpenames = response;
    this.filterCpeNames(); // Appliquer le filtre initial lorsque les données sont chargées
  });
}

loadVendors(){


  this.assetService.ReturnDict().subscribe(response=>{
  this.dict=response;
  if(this.Vendors.length==0){

    for(const key in this.dict){
      this.Vendors.push(key);
  
    }

  }
  

  console.log(this.Vendors);

  this.filterVendors();

  }) 
}




filltheBlanks2(vendor : string){
  var resultat : string = "";
  resultat=this.dict[vendor];
  this.ListeCPES=resultat.split(",");
  //console.log(this.ListeCPES);
  this.ProductListe=[];

  for (var cpe of this.ListeCPES){
    let product : string;
    console.log(cpe);
    product=cpe.split(":")[1];
    var version=cpe.split(":")[2];
    this.ProductListe.push(product);
    
   
  }
  this.ProductListe=this.removeDuplicates(this.ProductListe);
  console.log(this.ProductListe); 
  this.showSuggestionsProducts();

}



filltheBlacks3(product: string){
  this.VersionListe=[];

  for( var cpe of this.ListeCPES){
    if(cpe.split(":")[1]==product){

      let version : string;
       version=cpe.split(":")[2];
      this.VersionListe.push(version);



    }
    this.VersionListe=this.removeDuplicates(this.VersionListe);

    console.log(this.VersionListe);
    this.showSuggestionsVersions();




  }



}


filterCpeNames() {
  const searchTermLowerCase = this.searchTerm.toLowerCase();
  this.filteredCpeNames = this.Cpenames.filter(cpename =>
    cpename.toLowerCase().startsWith(searchTermLowerCase)
  );
}



filterVendors(){
  const searchTermLowerCase = this.asset.vendor.toLowerCase();
  this.filtredVendors=this.Vendors.filter(vendor =>
    vendor.toLowerCase().startsWith(searchTermLowerCase)
  );
}


filterProducts(){
  //this.filtredProducts= [];

  const searchTermLowerCase = this.asset.product.toLowerCase();
  this.filtredProducts=this.ProductListe.filter(product =>
    product.toLowerCase().startsWith(searchTermLowerCase)
  );
  console.log(this.filtredProducts);
}

filterVersions(){

  const searchTermLowerCase = this.asset.version.toLowerCase();
  this.filtredVersions=this.VersionListe.filter(version =>
    version.toLowerCase().startsWith(searchTermLowerCase)
  );
  console.log(this.filtredVersions);

}




splitSearchTerm(){
  this.vendor=this.searchTerm.split(":")[0];
  this.product=this.searchTerm.split(":")[1];
  this.version=this.searchTerm.split(":")[2];
  this.asset.vendor=this.vendor;
  this.asset.product=this.product;
  this.asset.version=this.version;

}

FormNotValidated(asset:Asset){

  if(asset.name!=""&&asset.type!=""&&asset.vendor!=""&&asset.product!=""&&asset.version!=""){
    return false;
  }
  return true;
}


gg(){
  console.log(this.asset);
}

dict :Record<string,string>={};

returnDict(){
  this.assetService.ReturnDict().subscribe(response=>{
    this.dict=response;

  })
}




show(){
  this.returnDict();
  for(const key in this.dict){
    this.Vendors.push(key);

  }

  console.log(this.dict["act"]);
}

afficherFiltredVendors(){
  console.log(this.filtredVendors);
}


showSuggestions() {
  if (this.remoteObj) {
    this.remoteObj.showPopup();
  }
  this.asset.name=this.asset.vendor
}

showSuggestionsProducts() {
  if (this.remoteProduct) {
    this.remoteProduct.showPopup();
  }
  this.asset.name=this.asset.name+":"+this.asset.product+":-"
}

showSuggestionsVersions() {
  if (this.remoteVersion) {
    this.remoteVersion.showPopup();
  }

}

removeDuplicates(strings: string[]): string[] {
  return Array.from(new Set(strings));
}


  
}
