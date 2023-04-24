import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories :any;

  constructor(private _category: CategoryService) { }

  ngOnInit(): void {

    this._category.categories().subscribe((data:any) =>{
      //css
      this.categories = data;
      console.log(this.categories);
    },
    
    (error) => {
      //
      console.log(error);
      Swal.fire('Error!', 'Error in loading data', 'error')
    });

  }


  //Deleting
  deleteQuize(qId: any) {
    Swal.fire({
      title: 'Are you sure?',
      confirmButtonText: 'DELETE',
      showCancelButton: true,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(qId).subscribe(
          (data: any) => {
            this.categories = this.categories.filter((category: any) => category.qId != qId);
            Swal.fire("Success !", "Category deleted successfully", 'success');
            //this refresh window
            location.reload();
          },
          (error: any) => {
            console.log(error);
            Swal.fire("Error !", "Delete Quiz After Delete Category", 'error');
          }
        );
      }
    });
  }

}
