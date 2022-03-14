import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  

  aim="Your Perfect Banking Partner"
  accno="Account Number Please"
  acno=""
  pswd=""

  database:any={
    1000:{acno:1000,uname:"Neer",password:1000,balance:5000},
    1001:{acno:1001,uname:"Vyom",password:1001,balance:5000},
    1002:{acno:1002,uname:"Laisha",password:1002,balance:5000}
  }

  loginForm=this.fb.group(
    {
      acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
    }
  )

  constructor(private routerLogin:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
//acno change
acnoChange(event:any){
  this.acno=event.target.value
  console.log(this.acno);
}



//password
paswrdChange(event:any)
{
  this.acno=event.target.value
  console.log(this.acno); 
}

//login
  login()
  {
    var acno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd
  
    const result=this.ds.login(acno,pswd)

    if(this.loginForm.valid)
    {
      if(result)
      {
        alert("Successfully  logined")
        this.routerLogin.navigateByUrl("home")
      }
    }
    else
    {
      alert("Invalid Form")
    }
  
  }

}
