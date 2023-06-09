import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { startWith } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid :any;
  questions: any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmite = false;

  timer: any;

  constructor(
    private locationSt: LocationStrategy, 
    private _route: ActivatedRoute, 
    private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions()
  }

  loadQuestions() {
    this._question.getQestuinsQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        /*this.questions.forEach((q:any) => {
          q['giveAnswer'] = '';
        });*/
        //console.log(data);
        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questoins of quiz', 'error');
      });
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });

  }

  submitQuiz() {
    Swal.fire({
      title:'Do tou want to submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        //calculation
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if(this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    //call to server to check question
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted; 
        this.isSubmite = true;
      },
      (error) => {
        console.log(error);
      }
    );


    /*this.isSubmite = true;
    this.questions.forEach((q: any) => {
      if (q.giveAnswer == q.answer){
        this.correctAnswers++;
        let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
      }
      if(q.giveAnswer.trim() != ''){
        this.attempted++;
      }
    });
    console.log('Correct Answers :' + this.correctAnswers);
    console.log('Marks Got ' + this.marksGot);
    console.log('attempted' + this.attempted);
    console.log(this.questions);*/
  }

  printPage() {
    window.print();
  }
}
