import {Component, OnInit} from '@angular/core';
import {Student} from './model/student';
import {StudentManagementService} from "./services/student-management.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{

  title = 'Studenti na Finki';

  public Studenti:Student[];

  constructor(private studentMenagment:StudentManagementService){}
  ngOnInit(): void {
   this.studentMenagment.loadStudents()
     .then(Studenti=>this.Studenti=Studenti)
     .catch(error=>console.error(error.errorMessage));
  }




}
