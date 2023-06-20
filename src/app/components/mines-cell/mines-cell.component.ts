import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CellType } from 'src/app/models/enums/board-cell-type.enum';
import { CellState } from 'src/app/models/enums/board-state-type.enum';
import { NotificationType } from 'src/app/models/enums/notification-type.enum';
import { BoardCell } from 'src/app/models/interfaces/board-cell.model';
import { Notification } from 'src/app/models/interfaces/notification.model';

@Component({
  selector: 'app-mines-cell',
  templateUrl: './mines-cell.component.html',
  styleUrls: ['./mines-cell.component.scss']
})
export class MinesCellComponent implements OnChanges {
  readonly NotificationType = NotificationType;
  readonly CellState = CellState;
  readonly CellType = CellType;

  @Input() cell: BoardCell;
  @Output() notify = new EventEmitter<Notification>();

  ngOnChanges() {

  }

  rightClick = ($event: any): boolean => {
    this.notify.emit({ type: NotificationType.ItemClicked, data: this.cell });
    return false;
  }

}
