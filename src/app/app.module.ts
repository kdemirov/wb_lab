import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import {StudentManagementService} from "./services/student-management.service";
import { StudentEditComponent } from './student-edit/student-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RootingModule} from "./rooting/rooting.module";

@NgModule({
  declarations: [
    AppComponent,
    StudentDetailsComponent,
    StudentEditComponent,

  ],
  imports: [
    BrowserModule,
    RootingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StudentManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
