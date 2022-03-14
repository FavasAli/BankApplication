import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myName = '';

  user=""
  acno:any
  ldata:any

  //deposite group model Creation
  depositeForm=this.fb.group(
    {
        //form array creation
      acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pass:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
      amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

    }
  )

  //withdraw group model Creation

  withdrawForm=this.fb.group(
    {
      //form array creation
      acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pass1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
      amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]

    }
  )

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) { 
    this.user=this.ds.currentUser

    this.ldata= new Date()
  }



  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno"))
    {
      alert("Please Login In")
      this.router.navigateByUrl("")
    }

    this.getName();

  }

  getName () {
    this.ds.getMayName().subscribe((resp) => {
      this.myName = resp;
    });
  }




  deposite()
  {
    var acno=this.depositeForm.value.acno
    var pass=this.depositeForm.value.pass
    var amt=this.depositeForm.value.amount

    const result=this.ds.deposit(acno,pass,amt)

    if(this.depositeForm.valid)
    {
      if(result)
      {
        alert(amt+"Successfully Deposited...Current Balance is.."+result)
      }
    }
    else
    {
      alert("Invalid Form")
    }
   
  }

  withdraw()
  {
    
    var acno=this.withdrawForm.value.acno1
    var pass=this.withdrawForm.value.pass1
    var amt=this.withdrawForm.value.amount1

    const result=this.ds.withdraw(acno,pass,amt)

    if(this.withdrawForm.valid)
    {
      if(result)
      {
        alert(amt+"Successfully withdrawn...Current Balance is.."+result)
      }
    }
    else
    {
      alert("Invalid Form")
    }

  }

  logout()
  {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUser")
    this.router.navigateByUrl("")
  }

  deleteAccount(){
    this.acno=JSON.parse(localStorage.getItem("currentAcno") ||'')
  }

  cancel()
  {
    this.acno=''
  }

  delete(event:any)
  {
    alert("Deleted Current"+event+"Account")
    this.router.navigateByUrl("")
  }
}
