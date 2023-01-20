import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  acno: any
  username: any
  accountnumber: any
  accbalance: any
  credbalance: any
  message: any
  message1: any
  message2: any
  alert1: any
  transactions: any = []
  deletebutton: boolean = false



  depositform = this.fb.group({
    amount: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    acno: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ["", [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1), Validators.maxLength(10)]],


  })

  withdrawform = this.fb.group({
    amount: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    acno: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ["", [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1), Validators.maxLength(10)]]

  })

  creditcardform = this.fb.group({
    adharnumber: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pannumber: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ["", [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1), Validators.maxLength(10)]],


  })

  constructor(private fb: FormBuilder, private service: ServiceService, private rc: Router, private http: HttpClient) {
    if(!(localStorage.getItem("acno"))){
      alert("pls login again")
      this.rc.navigateByUrl("")
    }
    this.username = JSON.parse(localStorage.getItem('username') || '')
    this.accountnumber = JSON.parse(localStorage.getItem('acno') || '')
    this.accbalance = JSON.parse(localStorage.getItem('accbalance') || '')
    this.credbalance = JSON.parse(localStorage.getItem('credbalance') || '')


  }



  ngOnInit(): void {                                               //ngonintil kodkumbo nammakk page load aakumbo thanne work aakum
    var acno = JSON.parse(localStorage.getItem('acno') || '')
    this.http.post('http://localhost:3000/transaction', {
      "acno": acno
    })
      .subscribe((result: any) => {
        console.log(result);
        this.transactions = result.message
      })
  }



  hell() {
    window.scrollTo(0, 0)
    this.accbalance = JSON.parse(localStorage.getItem('accbalance') || '')
    this.credbalance = JSON.parse(localStorage.getItem('creditbalance') || '')

  }

  hello() {
    window.scrollTo(0, 800)
  }
  hello2() {
    window.scrollTo(0, 1600)
  }
  hello3() {
    window.scrollTo(0, 2400)

  }
  hello4() {
    window.scrollTo(0, 3200)
  }

  logout() {
    localStorage.removeItem("acno")
    this.rc.navigateByUrl("")
  }


  deletebtn() {
    console.log("clicked")
    this.deletebutton = true
  }

  yes() {
    var acno = JSON.parse(localStorage.getItem("acno") || '')
    this.http.delete(`http://localhost:3000/deleteaccount/${acno}`)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
          localStorage.removeItem("acno")
          this.rc.navigateByUrl("")
        }
      }, (result) => {
        alert(result.error.message)
      })

  }
  no() {
    this.deletebutton = false
  }



  depositcheck() {
    var amt = this.depositform.value.amount
    var acno = this.depositform.value.acno
    var pswd = this.depositform.value.pswd

    if (this.depositform.valid) {
      this.service.depositcheck(amt, acno, pswd)
        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem('accbalance', JSON.stringify(result.accbalance))
            localStorage.setItem('message', JSON.stringify(result.message))
            this.message = JSON.parse(localStorage.getItem('message') || '')
            // alert(result.message)

          }
        }, (result) => {
          // alert(result.error.message)
          localStorage.setItem('message', JSON.stringify(result.error.message))
          this.message = JSON.parse(localStorage.getItem('message') || '')
        })
    } else {

      alert("Typed in invalid format")
    }



  }

  withdrawcheck() {
    var amt = this.withdrawform.value.amount
    var acno = this.withdrawform.value.acno
    var pswd = this.withdrawform.value.pswd

    if (this.withdrawform.valid) {
      this.service.withdrawcheck(amt, acno, pswd)
        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem('message1', JSON.stringify(result.message))
            this.message1 = JSON.parse(localStorage.getItem('message1') || '')

            // alert(result.message)
          }
        }, (result) => {
          localStorage.setItem('message1', JSON.stringify(result.error.message))
          this.message1 = JSON.parse(localStorage.getItem('message1') || '')
          // alert(result.error.message)
        })

    } else {
      alert("Typed in invalid format")
    }
  }

  creditcheck() {

    var adhar = this.creditcardform.value.adharnumber
    var pan = this.creditcardform.value.pannumber
    var pswd = this.creditcardform.value.pswd
    var acno = JSON.parse(localStorage.getItem('acno') || '')
    console.log(adhar, pan, pswd, acno);



    if (this.creditcardform.valid) {
      this.service.creditcard(adhar, pan, pswd, acno)
        .subscribe((result: any) => {
          console.log(result);

          if (result) {
            localStorage.setItem('creditbalance', JSON.stringify(result.creditbalance))
            localStorage.setItem('message2', JSON.stringify(result.message))
            this.message2 = JSON.parse(localStorage.getItem('message2') || '')

            // alert(result.message)
          }

        }, (result) => {
          localStorage.setItem('message2', JSON.stringify(result.error.message))
          this.message2 = JSON.parse(localStorage.getItem('message2') || '')

          // alert(result.error.message)
        })

    }
    else {
      alert("typed in invalid format")
    }

  }

}
