import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform =  this.rc.group({
    acno:["",[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:["",[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(10)]],

  })



  constructor(private rc:FormBuilder, private service:ServiceService,private route :Router) { }

  ngOnInit(): void {
  }

  logincheck(){
    var acno=this.loginform.value.acno
    var pswd=this.loginform.value.pswd

    if(this.loginform.valid){
      this.service.login(acno,pswd)
      .subscribe((result:any)=>{
        if(result){
          console.log(result)
          localStorage.setItem('token',JSON.stringify(result.token))
          localStorage.setItem('acno',JSON.stringify(result.acno))
          localStorage.setItem('username',JSON.stringify(result.username))
          localStorage.setItem('accbalance',JSON.stringify(result.accbalance))
          localStorage.setItem('credbalance',JSON.stringify(result.creditbalance))
          alert("login successfull")
          this.route.navigateByUrl("dashboard")

        }else{
          alert("login failed")
        }

      },(result)=>{
        console.log("test",result.error.message)     //resultil statuscode ,status, message ithokke verum and ivde Ifil allathad konnd null value aayrkum verale so null valuente msg "already registered ayrkum" ath kittan vendiyanne error.msg kodkunand 
        alert(result.error.message);})


    }else{
      alert("Not in valid form")
    }




  }

}
