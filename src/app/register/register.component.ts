import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname=""
  uacno=""
  pswd=""


  registerForm=this.fb.group(
    {
      uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      uacno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
    }
  )

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  
  register()
  {
    var acno=this.registerForm.value.uacno
    var pswd=this.registerForm.value.pswd
    var uname=this.registerForm.value.uname
    const result=this.ds.register(acno,pswd,uname)
    console.log(this.ds.database);

    if(this.registerForm.valid)
    {
      if(result)
      {
        alert("Succesfully Registered")
        this.router.navigateByUrl("")
      }
      else
      {
        alert("Alredy Exist....login agin")
      }
    }
    else
    {
      alert("Invalid Form")
    }
    
   
  }

}
