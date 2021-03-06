import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RepoService } from '../services/repo.service';
import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-Comments-Form',
  templateUrl: './Comments-Form.component.html',
  styleUrls: ['./Comments-Form.component.css']
})
export class CommentsFormComponent implements OnInit {
  myForm: FormGroup
  submitted = false
  success = false
  errorMessage: string
  successData: any
  comments: string
  successMeg: any

  constructor(public fb: FormBuilder, private http: HttpClient, private repo: RepoService, private json:JsonService) { }

  ngOnInit() {
    this.createForm();
    this.repo.newComments.subscribe(
      (data) => { console.log(data), this.comments = data }
    )
  }

  createForm() {
    this.myForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    comments: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    })
  }


  onSubmit() {
    this.submitted = true;
    console.log(this.myForm.value)
    // stop here if form is invalid


    if (this.myForm.invalid) {
      console.log(this.myForm)
      this.errorMessage = 'Please fill all input.'
      this.success = false;
      return
    }
    else {
      console.warn('success')
      this.success = true;
      this.repo.postComments(this.myForm.value)
      this.json.postCommetns(this.myForm.value)
    }
  }

  postJsonData(){
    this.json.postCommetns(this.myForm.value).subscribe(
      (comments)=>{console.log(comments), this.myForm.value.push(comments)},
      (err)=> {console.log(err), this.errorMessage="wrong"}
    )
  }

}
