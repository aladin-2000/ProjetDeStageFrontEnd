import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetsDashBoardComponent } from './assets-dash-board/assets-dash-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AssetService } from './Services/asset.service';
import{ HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { CpeDashboardComponent } from './cpe-dashboard/cpe-dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { NgChartsModule } from 'ng2-charts';

import { NgApexchartsModule } from "ng-apexcharts";
import { ListCveComponent } from './list-cve/list-cve.component';



@NgModule({
  declarations: [
    AppComponent,
    AssetsDashBoardComponent,
    CpeDashboardComponent,
    SidebarComponent,
    ListCveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutoCompleteModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgApexchartsModule
  ],
  providers: [AssetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
