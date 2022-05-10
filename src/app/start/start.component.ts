import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  @Output() public startEvent = new EventEmitter<number>();
  public value = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onStart() {
    this.startEvent.emit(this.value);
  }

}
