import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerform = this.rc.group({
    acno:["",[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:["",[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(10)]],
    uname:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]]
    
  })




  constructor(private rc:FormBuilder,private service:ServiceService,private route:Router) { }

  ngOnInit(): void {
  }

  registercheck(){

    var acno=this.registerform.value.acno
    var pswd = this.registerform.value.pswd
    var uname = this.registerform.value.uname

   
    
    
    

    if(this.registerform.valid){
      this.service.register(acno,pswd,uname)
      .subscribe((result:any)=>{
        console.log(result);
        if(result){
          alert("registered successfull")
          this.route.navigateByUrl('')
        }
        
      },(result)=>{
        console.log("test",result.error.message)     //resultil statuscode ,status, message ithokke verum and ivde Ifil allathad konnd null value aayrkum verale so null valuente msg "already registered ayrkum" ath kittan vendiyanne error.msg kodkunand 
        alert(result.error.message);})
      
    }else{
      alert("Not in valid form")
    }



  }

}
