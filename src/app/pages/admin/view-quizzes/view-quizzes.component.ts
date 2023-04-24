import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any;


  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error loading Data !', 'error');
      }
    );
  }

  //Deleting
  deleteQuize(qId: any) {
    Swal.fire({
      title: 'Are you sure?',
      confirmButtonText: 'DELETE',
      showCancelButton: true,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
            Swal.fire("Success !", "Quiz deleted successfully", 'success');
          },
          (error: any) => {
            console.log(error);
            Swal.fire("Error !", "Quiz Delition operation faild", 'error');
          }
        );
      }
    });
  }
}
