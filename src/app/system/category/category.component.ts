import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CategoryService } from 'src/app/api/system/category.service';
import { NgForm } from '@angular/forms';

export interface PeriodicElement {
  id: number;
  categoryNumber: string;
  categoryName: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'categoryNumber', 'categoryName', 'actions'];
  dataSource: any;
  show_categoryList: boolean = true
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  categoryInfo: any = {}
  isUpdate: Boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    public categorySrvc: CategoryService,

  ) {

  }

  ngOnInit() {
    this.show_categoryList = true;
    this.getCategories()
  }

  getCategories() {
    this.categorySrvc.get().subscribe(res => {
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

    this.categorySrvc.create(info).subscribe(async res => {
      if (res != undefined) {
        await this.getCategories()
        this.show_categoryList = true
        this.openSnackBar('New Category added')
      } else {
        this.openSnackBar('Category not added')
      }
    }), error => {
      // console.log(error)
    }
  }

  update(data: NgForm) {
    // console.log(data.form.value);
    let info
    info = data.form.value
    info.id = this.categoryInfo.id

    this.categorySrvc.update(info).subscribe(async res => {
      if (res != undefined) {
        await this.getCategories()
        this.show_categoryList = true
        this.categoryInfo = {}
        this.openSnackBar('Category updated')
      } else {
        this.openSnackBar('Category not updated')
      }
    }), error => {
      // console.log(error)
    }
  }

  remove(data) {
    // console.log(data);
    this.categorySrvc.delete(data).subscribe(async res => {
      await this.getCategories()
      this.show_categoryList = true
      this.openSnackBar('Category removed')
    }), error => {
      console.log(error)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
