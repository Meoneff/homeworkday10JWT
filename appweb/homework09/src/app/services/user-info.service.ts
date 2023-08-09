import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrx/states/auth.state';
import { setIdToken } from '../ngrx/actions/token.actions';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  userInfo: BehaviorSubject<User | null> ;
  constructor(private auth:Auth, private http: HttpClient, private store: Store <{idToken: AuthState}>) {
    this.userInfo = new BehaviorSubject<User | null>({
      id: 'id-001',
      name: 'meomeo',
      email: 'meo@gmail.com',
      imgSrc:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    } as User);
    onAuthStateChanged(this.auth, async (user)=>{
      if(user){
        let idToken = await user!.getIdToken(true);
        this.store.dispatch(setIdToken({ idToken }));
        console.log(idToken);
        this.sendMessages(idToken);
        console.log(user);
        this.userInfo.next({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          imgSrc: user.photoURL
        } as User)
      } else{
        this.userInfo.next(null);
      }
    },
    (error)=>{
      console.log(error);
    })
   }
   
   async logout() {
    await signOut(this.auth);
  }
  sendMessages(idToken: string){
    console.log('idToken nè');
    this.http.get('http://localhost:3000',{
      headers: new HttpHeaders({
        Authorization: `${idToken}`,
      }),
    })
    // .subscribe((res) => {
    //   console.log(res);
    // });
  }
}
