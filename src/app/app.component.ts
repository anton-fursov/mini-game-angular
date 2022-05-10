import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isStarted = false;
  public timeOutValue = 0;

  constructor() {
  }

  public start(time: number) {
    this.timeOutValue = time;
    this.isStarted = true;
  }

  public restart() {
    this.isStarted = false;
    this.timeOutValue = 0;
  }
}
