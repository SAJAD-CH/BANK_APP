import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options={
  headers:new HttpHeaders
}




@Injectable({
  providedIn: 'root'
})
export class ServiceService {



  constructor(private http:HttpClient) { }

  getoptions(){
    var token = JSON.parse(localStorage.getItem('token')||'')
    console.log(token);
    
    let headers = new HttpHeaders()
    if(token){
      headers=headers.append('x-access-token',token)
      options.headers=headers
    }
    return options

  }



  register(acno:any,pswd:any,uname:any){

    const data = {
      "acno":acno,
      "pswd":pswd,
      "uname":uname
    }

    return this.http.post('http://localhost:3000/register',data)

  }

  login(acno:any,pswd:any){

    const data ={
      "acno":acno,
      "pswd":pswd
    }

     return this.http.post("http://localhost:3000/login",data)



  }

  depositcheck(amt:any,acno:any,pswd:any){

    const data={
      "amt":amt,
      "acno":acno,
      "pswd":pswd
    }

    return this.http.post("http://localhost:3000/depositcheck",data,this.getoptions())


  }

  withdrawcheck(amt:any,acno:any,pswd:any){
    const data ={
      "amt":amt,
      "acno":acno,
      "pswd":pswd
    }

    return this.http.post("http://localhost:3000/withdrawcheck",data,this.getoptions())
    

  }

  creditcard(adhar:any,pan:any,pswd:any,acno:any){
    const data ={
      "adhar":adhar,
      "pan":pan,
      "pswd":pswd,
      "acno":acno
    }
     return this.http.post("http://localhost:3000/creditcard",data)
     

  }

}
