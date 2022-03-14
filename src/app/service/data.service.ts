import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http'
import { Observable ,of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  database: any = {
    1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
    1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }
  }

  currentAcno: any
  currentUser: any

  constructor() {
    this.getData()
  }



  getMayName(): Observable<string>{
    return of('favas')
  }


  register(acno: any, password: any, uname: any) {
    let database = this.database
    if (acno in database) {
      return false
    }
    else {
      database[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction: []
      }
      console.log(database);
      this.storeData()

      return true
    }
  }

  //login
  login(acno: any, password: any) {
    let database = this.database
    if (acno in this.database) {
      if (password == this.database[acno]["password"]) {
        this.currentAcno = acno
        this.currentUser = database[acno]["uname"]
        this.storeData()
        return true
      }
      else {
        alert("Invalid Password")
        return false
      }
    }
    else {
      alert("Invaid User")
      return false
    }
  }


  //to store data in localStarage
  storeData() {
    localStorage.setItem("database", JSON.stringify(this.database))
    if (this.currentAcno) {
      localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
    }
    if (this.currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
    }
  }

  //to get data in localStarage
  getData() {
    if (localStorage.getItem("database")) {
      this.database = JSON.parse(localStorage.getItem("database") || '')
    }
    if (localStorage.getItem("currentAcno")) {
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
    }
    if (localStorage.getItem("currentUser")) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser") || '')
    }
  }


  //deposit
  deposit(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    var database = this.database
    if (acno in database) {
      if (password == database[acno]["password"]) {
        database[acno]["balance"] += amount
        database[acno]["transaction"].push({
          amount: amount,
          type: "CREDIT"
        })
        this.storeData()

        return database[acno]["balance"]
      }
      else {
        alert("Incorrect Password..!")
        return false
      }
    }
    else {
      alert("User Doesn't Exist...!!")
      return false
    }
  }




  //withdraw
  withdraw(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    var database = this.database
    if (acno in database) {
      if (password == database[acno]["password"]) {

        if (database[acno]["balance"] > amount) {
          database[acno]["balance"] -= amount
          database[acno]["transaction"].push({
            amount: amount,
            type: "DEBIT"
          })
          this.storeData()

          return database[acno]["balance"]
        }
        else {
          alert("Insufficient Balance..!")
          return false
        }
      }
      else {
        alert("Incorrect Password..!")
        return false
      }
    }
    else {
      alert("User Doesn't Exist...!!")
      return false
    }
  }

  getTransaction(acno: any) {
    return this.database[acno]["transaction"]
  }

}






