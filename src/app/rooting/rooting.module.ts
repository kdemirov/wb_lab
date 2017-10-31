import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "../app.component";
import {StudentEditComponent} from "../student-edit/student-edit.component";
import {StudentDetailsComponent} from "../student-details/student-details.component";

const appRoutes: Routes=[
  {path:'',redirectTo:'/list',pathMatch:'full'},
  {path:'new',component:StudentEditComponent},
  {path:'list',component:AppComponent},
  {path:'edit/:Indeks',component:StudentEditComponent},
  {path:'details/:Indeks',component:StudentDetailsComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:
  [
    RouterModule
  ],
  declarations: []
})
export class RootingModule { }
