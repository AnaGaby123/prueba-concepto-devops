/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';

/* Models Imports */
import {IChipFile} from '@appModels/chip-file/chip-file';

@Component({
  selector: 'app-chip-file',
  templateUrl: './chip-file.component.html',
  styleUrls: ['./chip-file.component.scss'],
})
export class ChipFileComponent {
  @Output() deleteChipFile: EventEmitter<{
    chipFile: IChipFile;
    index: number;
  }> = new EventEmitter();
  @Input() chipsFiles: Array<IChipFile>;

  deleteFile(chipFile: IChipFile, index: number): void {
    this.deleteChipFile.emit({chipFile, index});
  }
}
