import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Score} from '../game.component';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent implements OnInit {
  public messageTitle: string = '';

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: Score,
  ) {
  }

  ngOnInit(): void {
    this.messageTitle = this.data.player > this.data.computer ? 'You win!' : 'You lose!';
  }

}
