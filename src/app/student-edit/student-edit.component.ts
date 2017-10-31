import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Student} from "../model/student";
import {StudentManagementService} from "../services/student-management.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit, OnChanges {
  public CREATE_ACTION = 'CREATE';
  public EDIT_ACTION = 'EDIT';
  sForm: FormGroup;


  private _editingStudent: Student;
  private action = this.CREATE_ACTION;
  public isEdit = false;
  protected student: Student;

  constructor(private studentEditMenagement: StudentManagementService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.student = new Student();
    this.createForm();


  }

  @Input("editingStudent")
  set editingStudent(editingStudent: Student) {
    this.setStudent(editingStudent);

  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const studentIndeks = params.get("Indeks");
        const StudentPromise = this.studentEditMenagement.findByIndeks(studentIndeks);
        StudentPromise.catch(
          error => {
            console.log(error.errorMessage);
          }
        );
        return StudentPromise;
      })
      .subscribe(student => {
          this.setStudent(student);
        }
      )
  }

  ngOnChanges() {
    this.sForm.setValue({
      name: this.student.Name,
      prezime: this.student.Prezime,
      index: this.student.Indeks,
      nasoka: this.student.Nasoka

    });
  }

  createForm() {
    this.sForm = this.fb.group({
      name:new FormControl('',Validators.compose([Validators.minLength(2), Validators.maxLength(30)])) ,
      prezime: new FormControl('', Validators.compose([Validators.minLength(2), Validators.maxLength(30)])),
      index: new FormControl('',Validators.compose([Validators.minLength(6), Validators.maxLength(6)])),
      nasoka:new FormControl('', Validators.required)
    });
  }

  public save(): void {
    // console.log(this.student);
    /*  this.student.Name=this.name.value;
      this.student.Indeks=this.index.value;
      this.student.Nasoka=this.nasoka.value;
      this.student.Prezime=this.prezime.value;*/
    console.log(this.student);
    this.studentEditMenagement.save(this.student)
      .then(studentFromServer => this.setStudent(studentFromServer));
    this.student = new Student();
  }

  public edit() {
    console.log(this.student,'edit');
    this.studentEditMenagement.edit(this._editingStudent, this.student)
      .then(studentFromServer => this.setStudent(studentFromServer));
  }

  public setStudent(editingStudent: Student): void {
    if (editingStudent) {
      //console.log('editingStudent');
      this.isEdit = true;
      this.action = this.EDIT_ACTION;
      this._editingStudent = editingStudent;
      this.student.Name = editingStudent.Name;
      this.student.Prezime = editingStudent.Prezime;
      this.student.Indeks = editingStudent.Indeks;

      //console.log(this.student);
    }

  }

  onSubmit() {
    this.student = this.prepareSaveStudent();
    if (this.isEdit) {
      console.log(this.student,'editing');
      this.setStudent(this.student);
      this.ngOnChanges();
    } else {
      console.log(this.student,'saving');
      this.save();
    }

  }
  get name(){return this.sForm.get('name')};
  get prezime(){return this.sForm.get('prezime')};
  get index(){return this.sForm.get('index')};
  get nasoka(){return this.sForm.get('nasoka')};
  public prepareSaveStudent(): Student {
    const formModel = this.sForm.value;

    const saveStudent: Student = {
      Name: formModel.name as string,
      Prezime: formModel.prezime as string,
      Indeks: formModel.index as string,
      Nasoka: formModel.nasoka as string
    };
    return saveStudent;
  }
}
