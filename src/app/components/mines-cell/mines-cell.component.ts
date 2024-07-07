import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class MinesCellComponent {
  readonly NotificationType = NotificationType;
  readonly CellState = CellState;
  readonly CellType = CellType;

  @Input() cell: BoardCell;
  @Input() theme?: string;
  @Output() notify = new EventEmitter<Notification>();

  click = (cell: BoardCell, notificationType: NotificationType): void => {
    if (![CellState.Discovered, CellState.Marked].includes(cell.state)) {
      this.notify.emit({ type: notificationType, data: this.cell });
    }
  }

  rightClick = (cell: BoardCell, notificationType: NotificationType): boolean => {
    if (cell.state !== CellState.Discovered) {
      this.notify.emit({ type: notificationType, data: this.cell });
    }
    
    return false;
  }

}
