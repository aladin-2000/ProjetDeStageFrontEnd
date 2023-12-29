import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThemeService } from 'ng2-charts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CpeService {
  private BaseUrl="http://localhost:5081/api/CPE"

  constructor(private http:HttpClient) { }

  GetCpeNames():Observable<string[]>
  {
    return this.http.get<string[]>(this.BaseUrl+"/recuperer");
  }
  GetCves(vendorProductVersion:string):Observable<string[][]>
  {
    return this.http.get<string[][]>("http://localhost:5081/GetCves/"+vendorProductVersion);
  }



}
