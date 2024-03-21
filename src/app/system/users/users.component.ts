import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatTableDataSource } from '@angular/material';
import { UsersService } from 'src/app/api/system/users.service';

export interface PeriodicElement {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  actions: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'role', 'actions'];
  dataSource: any;
  show_UserList: boolean = true
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userInfo: any = {}
  isUpdate: Boolean = false;
  constructor(
    private _snackBar: MatSnackBar,
    public userSrvc: UsersService,

  ) {

  }

  ngOnInit() {
    this.show_UserList = true;
    this.getUsers()
  }

  getUsers() {
    this.userSrvc.get().subscribe(res => {
      console.log(res)
      let data
      data = res
      this.dataSource = new MatTableDataSource(data)
    })
  }

  save(data: NgForm) {
    // console.log(data.form.value)
    let info
    info = data.form.value

    if (this.checkPassword(info)) {
      this.userSrvc.create(info).subscribe(async res => {
        if (res != undefined) {
          await this.getUsers()
          this.show_UserList = true
          this.openSnackBar('New User created')
        } else {
          this.openSnackBar('User not created')
        }
      }), error => {
        // console.log(error)
      }
    } else {
      this.openSnackBar('Passwords not match')
    }
  }

  update(data: NgForm) {
    // console.log(data.form.value);
    let info
    info = data.form.value
    info.id = this.userInfo.id

    if (this.checkPassword(info)) {
      this.userSrvc.update(info).subscribe(async res => {
        if (res != undefined) {
          await this.getUsers()
          this.show_UserList = true
          this.userInfo = {}
          this.openSnackBar('User updated')
        } else {
          this.openSnackBar('User not updated')
        }
      }), error => {
        // console.log(error)
      }
    } else {
      this.openSnackBar('Passwords not match')
    }
  }

  remove(data) {
    // console.log(data);
    this.userSrvc.delete(data).subscribe(async res => {
      await this.getUsers()
      this.show_UserList = true
      this.openSnackBar('User deleted')
    }), error => {
      console.log(error)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkPassword(info) {
    if (info.Password == info.CPassword) {
      return true
    }
    return false
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}