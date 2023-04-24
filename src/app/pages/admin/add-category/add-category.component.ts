import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public category = {
    title: '',
    description: '',
  };

  constructor(private _categoty: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title Requierd !', '', {
        duration: 3000,
      });
      return;
    }

    //all done

    this._categoty.addCategory(this.category).subscribe(
      (date: any) => {
        this.category.title ='';
        this.category.description ='';
        Swal.fire('Succes !', 'Category is added succesfuly', 'success');
      },

      (error) => {
        console.log(error)
        Swal.fire('Error !', 'Server error', 'error');
      });
  }
}
