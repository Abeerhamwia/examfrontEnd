import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  //get all question
  public getQestuinsQuiz(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //get all question for test
  public getQestuinsQuizForTest(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //add question
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  //Delete Question
  public deleteQuesion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //update Question
  public updateQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //evaluation
  public evalQuiz(question: any) {
    return this._http.post(`${baseUrl}/question/evaluation-quiz`, question);
  }

}
