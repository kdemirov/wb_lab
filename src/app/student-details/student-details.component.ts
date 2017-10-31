import {Component, Input, OnInit} from '@angular/core';
import {Student} from "../model/student";
import {ActivatedRoute, ParamMap} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {StudentManagementService} from "../services/student-management.service";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @Input("student")
  public student:Student;
  constructor(private route:ActivatedRoute,private service:StudentManagementService) { }

  ngOnInit() {
   this.route.paramMap
     .switchMap((params: ParamMap)=>{
     const studentIndeks=params.get('Indeks');
     const studentPrimise=this.service.findByIndeks(studentIndeks);
     studentPrimise.catch(
       error=>
       {
         console.error(error.errorMessage);
       }
     );
     return studentPrimise;
     })
     .subscribe(student=>{
       this.student=student;
     });

  }


}
