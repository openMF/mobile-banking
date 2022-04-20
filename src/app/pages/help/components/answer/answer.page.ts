import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {

  question: string;

  answer: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    const { question = '', answer = '' } = this.activatedRoute.snapshot.queryParams;

    this.question = question;
    this.answer = answer;
    
  }

}
