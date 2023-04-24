import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      //alert('please enter user')
      this.snack.open('User Name is required!', 'OK',{
        duration:3000,
      });
      return;
    }

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data)
        //alert('success');
        Swal.fire('Succeess Done!', 'User Name is ' + data.username, 'success');
      },
      (error)=>{
        //error
        console.log(error)
        //alert('somthing went wrong');
        //this.snack.open('somthing want wrong!','',{
         // duration:3000,
       // });
       Swal.fire('Worning !', 'User Name is already register', 'warning');
      }
    );
  }

  //this.user
}
