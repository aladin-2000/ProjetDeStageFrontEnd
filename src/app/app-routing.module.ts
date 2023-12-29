import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsDashBoardComponent } from './assets-dash-board/assets-dash-board.component';
import { CpeDashboardComponent } from './cpe-dashboard/cpe-dashboard.component';
import { ListCveComponent } from './list-cve/list-cve.component';

const routes: Routes = [
  {path:'add-asset', component : AssetsDashBoardComponent},
  {path:'dashboard' , component : CpeDashboardComponent},
  {path : 'list-cve' , component : ListCveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
