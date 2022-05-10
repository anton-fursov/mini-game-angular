import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResultDialogService} from './result-dialog/result-dialog.service';

type CellState = 'notTouched' | 'active' | 'touchedByUser' | 'touchedByComputer';

export interface Score {
  player: number;
  computer: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() timeOutValue: number = 0;
  @Output() restartGameEvent = new EventEmitter<boolean>();

  public score: Score = {
    player: 0,
    computer: 0
  };
  public cells: CellState[] = [];
  private timer: number | null = null;
  private gameIsDone = false;

  constructor(private resultDialogSvc: ResultDialogService) {
    this.cells = this.generateFieldData();
  }

  ngOnInit(): void {
    this.runGameRound();
  }

  public onCellClick(index: number): void {
    const isActive = this.cellIsActive(index);
    if (isActive && this.timer) {
      this.upScore('player');
      this.cells[index] = 'touchedByUser';
      clearTimeout(this.timer);
      this.runGameRound();
    }
  }

  private runGameRound() {
    if (this.gameIsDone) {
      return;
    }

    const activeCellIndex = this.getNotTouchedCell();
    this.cells[activeCellIndex] = 'active';

    this.timer = setTimeout(() => {
      this.upScore('computer');
      this.cells[activeCellIndex] = 'touchedByComputer';
      this.timer = null;
      this.runGameRound();
    }, this.timeOutValue);
  }

  private upScore(unit: 'player' | 'computer') {
    this.score[unit]++;

    const {player, computer} = this.score;
    if (player === 10 || computer === 10) {
      this.gameIsDone = true;
      void this.showResult();
    }
  }

  private async showResult() {
    const res = await this.resultDialogSvc.show(this.score);
    if (res) {
      this.restartGameEvent.emit(true);
    }
  }

  private generateFieldData(): CellState[] {
    const sizeX = 10;
    const sizeY = 10;

    const defState: CellState = 'notTouched';
    return Array.from(Array(sizeX * sizeY).keys()).map(() => defState);
  }

  private getNotTouchedCell(): number {
    const randomCellIdx = this.randomIntFromRange(0, 99);
    const isNotTouched = this.cellIsNotTouched(randomCellIdx);

    return isNotTouched ? randomCellIdx : this.getNotTouchedCell();
  }

  private randomIntFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private cellIsNotTouched(index: number): boolean {
    return this.cells[index] === 'notTouched';
  }

  private cellIsActive(index: number): boolean {
    return this.cells[index] === 'active';
  }

}
