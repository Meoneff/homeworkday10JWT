import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { CartState } from 'src/app/ngrx/states/cart.state';
import { ItemState } from 'src/app/ngrx/states/item.state';
import *as ItemAction from 'src/app/ngrx/actions/item.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthState } from 'src/app/ngrx/states/auth.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  itemList$: Observable<Item[]> = this.store.select('item', 'itemList');
  isDelSuccess$ = this.store.select(
    'item', 'isDelSuccess'
  )
  isAddSuccess$ = this.store.select('item', 'isAddSuccess');
  isUpSuccess$ = this.store.select('item', 'isUpSuccess');
  idToken: string = ''
  idToken$ = this.store.select('idToken', 'idToken');
  additemForm!: FormGroup;
  
  constructor(private store: Store<{ item: ItemState, idToken: AuthState }>, private storeCart: Store<{ cart: CartState }>, private dialog: MatDialog) {
    console.log('admin')
    this.idToken$.subscribe(value =>{
      console.log(value);

      if(value){
        console.log('làm đúng r'+value);
        this.store.dispatch(ItemAction.get({idToken:value}));

      }
    })

    this.itemList$.forEach(item => {
      console.log(item.length)
    }),
    
      this.isDelSuccess$.subscribe((value) => {
        console.log(value)
        if (value) {
          this.idToken$.subscribe(value =>{
            console.log(value);
      
            if(value){
              console.log('làm đúng r'+value);
              this.store.dispatch(ItemAction.get({idToken:value}));
      
            }
          })
        }
      })

    this.isAddSuccess$.subscribe((value) => {
      console.log(value)
      if (value) {
        this.idToken$.subscribe(value =>{
          console.log(value);
    
          if(value){
            console.log('làm đúng r'+value);
            this.store.dispatch(ItemAction.get({idToken:value}));
    
          }
        })
      }
    });

    this.isUpSuccess$.subscribe(value => {
      console.log(value)
      if (value) {
        this.idToken$.subscribe(value =>{
          console.log(value);
    
          if(value){
            console.log('làm đúng r'+value);
            this.store.dispatch(ItemAction.get({idToken:value}));
    
          }
        })
      }
    });
  }
  ngOnInit(): void {
    this.additemForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imgSrc: new FormControl(
        '', [Validators.required]
      ),
    });
  }


  deleteItem(id: string) {
    this.idToken$.subscribe(value =>{
      if(value){
        this.idToken = value
        this.store.dispatch(ItemAction.deleteItem({ id ,idToken:value }))
      }
    })
    


  }
  addItem(item: Item) {
    if(!(item.name)||!(item.description)||!(item.price)||!(item.imgSrc)){
      alert("ngu ơi thấy thiếu gì không ! ")
    }
    else{
      this.idToken$.subscribe(value =>{
        if(value){
          this.idToken = value
          this.store.dispatch(ItemAction.additem({ item,idToken:value }))
        }
      })
    }

  }
  openDialog(item: Item): void {
    const dialogRef = this.dialog.open(DialogDetailComponent, {
      data: item,
    });
  }


}
