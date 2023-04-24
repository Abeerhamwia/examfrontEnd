import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any;

  quizDate = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };

  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService) { }

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data: any) => {
        //categories load
        this.categories = data;
        //console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'error loading data from server', 'error')
      });
  }
  //
  addQuiz() {
    if (this.quizDate.title.trim() == '' || this.quizDate.title == null) {
      this._snack.open('Title Requierd !!', '', {
        duration: 3000
      });
      return;
    }
    if (this.quizDate.category.cid == '' || this.quizDate.category.cid == null) {
      this._snack.open('Category Requierd !!', '', {
        duration: 3000
      });
      return;
    }

    //validation...

    //call server
    this._quiz.addQuiz(this.quizDate).subscribe((data: any) => {
      Swal.fire('Succes !', 'Category is added succesfuly', 'success');
      this.quizDate = {
        title: '',
        description: '',
        maxMarks: '',
        numberOfQuestions: '',
        active: true,
        category: {
          cid: '',
        },
      };
    },
      (error) => {
        Swal.fire('Error !', 'Server error', 'error');
        console.log(error);
      });
  }
}
