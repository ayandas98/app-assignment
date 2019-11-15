import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-assignment';
  username: ' ';
  data: any;
  datalocal: any;
  showspinner = false;
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  search() {
    if (this.username) {
      this.showspinner = true;
      this.datalocal = localStorage.getItem(this.username);
      if (!this.datalocal) {
        this.showspinner = true;
        console.log(this.username);
        this.http.get('https://api.github.com/users/' + this.username).subscribe(Response => {
          this.data = Response;
          console.log(this.data);
          this.showspinner = false;
          localStorage.setItem(this.username, JSON.stringify(this.data));
        }, err => {
          this.showspinner = false;
          this.data = '';
          this.openSnackBar('bad user credentials', 'ok');
        });
      } else {
        this.data = JSON.parse(this.datalocal);
        this.showspinner = false;
        console.log(this.data);
      }
    } else {
      this.data = '';
      this.openSnackBar('provide username', 'ok');
    }
  }
  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
