import {Injectable} from '@angular/core';
import {ResultDialogComponent} from './result-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {take} from 'rxjs/operators';
import {Score} from '../game.component';

@Injectable({
  providedIn: 'root'
})
export class ResultDialogService {

  constructor(private dialog: MatDialog) {
  }

  public async show(data: Score): Promise<boolean> {
    return this.dialog
               .open(ResultDialogComponent, {
                 data,
                 width: '400px',
                 closeOnNavigation: true,
                 disableClose: true,
               })
               .afterClosed()
               .pipe(take(1))
               .toPromise();
  }
}
