import { Injectable } from '@angular/core';
import {Student} from "../model/student";


@Injectable()
export class StudentManagementService {
 private lista=[{Name:'Kjazim',
    Prezime:'Demirov',
    Indeks:'153081',
    Nasoka:'Primena na e-tehnologii'
  },
    {Name:'Trajko',
      Prezime:'Petkov',
      Indeks:'153023',
      Nasoka:'Primena na e-tehnologii'
    },
    {Name:'Stojan',
      Prezime:'Stojanovski',
      Indeks:'153054',
      Nasoka:'Primena na e-tehnologii'
    },
    {Name:'Asan',
      Prezime:'Asanovski',
      Indeks:'153012',
      Nasoka:'Primena na e-tehnologii'
    }];
  constructor() { }
  public loadStudents():Promise<Student[]>{
    return Promise.resolve(this.lista);
  }

  public save(student:Student):Promise<Student>
  {
    const studentFromServer=[];
    Object.assign(studentFromServer,this.lista);
    this.lista=studentFromServer;
    this.lista.push(student);
    return Promise.resolve(student);
  }
  public edit(original_student:Student,editedStudent:Student):Promise<Student>
  {
    const studentFromServer=[];
    Object.assign(studentFromServer,this.lista);
    this.lista=studentFromServer;

    return Promise.resolve(editedStudent);
  }
  findByIndeks(Indeks:string):Promise<Student>{
    const result=this.lista.filter(student=>student.Indeks===Indeks);
    if(result&&result.length>0){
      return Promise.resolve(result[0]);
    }
    else{
      return Promise.reject({
        errorMessage:'No video with the given title found',
        errorCode:404,
      });
    }
  }
}
