import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginData={
    username: '',
    password: '',
  };

  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("login btn clicked")

    if(this.loginData.username.trim() =='' || this.loginData.username == null){

      Swal.fire('Worning !', 'Username is requierd', 'warning');
      return;
    }
    if(this.loginData.password.trim() =='' || this.loginData.password == null){
      Swal.fire('Worning !', 'password is requierd', 'warning');
      return;
    }
    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);

        //login...
        this.login.loginUser(data.token);
        
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            //redirect ...ADMIN: admin-dashboard
            //redirect ...NORMAL: normal-dashboard
            if(this.login.getUserRole() == 'ADMIN'){
              //admin dashboard
              //window.location.href = '/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            } else if(this.login.getUserRole() == 'NORMAL') {
              //normal user dashboard
              //window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            } else {
              this.login.logout();
            }
          }
        );
      },
      (error)=>{
        console.log("Error !");
        console.log(error);
        Swal.fire('Invalid Details!', 'try again ', 'warning');
      }
    );
  }

}
