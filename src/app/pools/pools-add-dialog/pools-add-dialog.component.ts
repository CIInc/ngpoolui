import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pools-add-dialog',
  templateUrl: './pools-add-dialog.component.html',
  styleUrls: ['./pools-add-dialog.component.css']
})
export class PoolsAddDialogComponent implements OnInit {

  poolName = new FormControl('', [Validators.required]);
  poolWebUrl = new FormControl('');
  poolApiUrl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<PoolsAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.poolApiUrl.hasError('required') ? 'You must enter a value' :
        // this.poolName.hasError('email') ? 'Not a valid email' :
            '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
