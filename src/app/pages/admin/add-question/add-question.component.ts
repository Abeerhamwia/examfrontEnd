import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor: any = ClassicEditor;
 

  qId :any;
  qTitle:any;
  question={
    quiz:{
      qId:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  };

  constructor(
    private _route: ActivatedRoute, 
    private _question: QuestionService,
    private _rout:Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId
  }

  addQuestion(){
    if(this.question.content.trim() == '' || this.question.content == null){
      return;
    }
    if(this.question.option1.trim() == '' || this.question.option1 == null){
      return;
    }
    if(this.question.option2.trim() == '' || this.question.option2 == null){
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer == null){
      return;
    }

    //add question
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
      Swal.fire("Success","Question addedd to "+this.qTitle+" successfully",'success').then((e)=>{
        this._rout.navigate(['/admin/view-questions/'+this.qId+'/'+this.qTitle]);
      })
    }),
    (error:any)=>{
      Swal.fire("Faild","Question proccess faild",'error');  
    }
  }
}
