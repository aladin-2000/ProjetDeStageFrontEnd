import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../Model/Asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {


  private BaseURL="http://localhost:5081/api"

  constructor(private http:HttpClient) { }

  GetAssets():Observable<Asset[]>
  {
    return this.http.get<Asset[]>(this.BaseURL);
  }

  PostAssets(asset:Asset):Observable<Asset>
  {
    const currentDate=new Date();
     const stringDate=currentDate.toString();
    asset.date=stringDate;
    return this.http.post<Asset>(this.BaseURL,asset);
    
  }

  DeleteOneAsset(id:number){
    let x: string = id.toString(); 
    return this.http.delete<Asset>(this.BaseURL+"/"+id.toString())
  }

  UpdateOneAsset(id:number,asset:Asset):Observable<Asset>{
    return this.http.put<Asset>(this.BaseURL+"/"+id.toString(),asset);
  }
  GetOneAsset(id:number){
    return this.http.get<Asset>(this.BaseURL+"/"+id.toString())
  }

  search(query: string): Observable<any> {

    return this.http.get(this.BaseURL+"/search/"+`${query}`);

  }
  ReturnDict(): Observable<Record<string, string>>{
    return this.http.get<Record<string, string>>("http://localhost:5081/recuperer/ficherXML");
  }


  ReturnNumberOfPeopleAsset(){
    return this.http.get<number>("http://localhost:5081/api/people")
  }

  ReturnNumberOfSoftwareAsset(){
    return this.http.get<number>("http://localhost:5081/api/software")
  }


  ReturnNumberOfHardwareAsset(){
    return this.http.get<number>("http://localhost:5081/api/hardware")
  }


  ReturnNumberOfObjectAsset(){
    return this.http.get<number>("http://localhost:5081/api/object")
  }

  SearchAssetByName(Name:string):Observable<Asset>
  {
    return this.http.get<Asset>(this.BaseURL+"/Search/By/Name/"+Name);

  }



  //GetAllVendors():Observable<List<string>>
  //{
   // return this.http.get<List<string>>("http://localhost:5081/vendor/avance");
  //}



}
