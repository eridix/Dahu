import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  showResponses: boolean = false;
  showHideButton: boolean = true;

  toggleResponse() {
    this.showResponses = !this.showResponses;
    this.showHideButton = !this.showHideButton
  }
}
