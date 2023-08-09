import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/models/item.model';
import { ItemState } from 'src/app/ngrx/states/item.state';
import* as ItemAction from 'src/app/ngrx/actions/item.actions'
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss']
})
export class DialogDetailComponent implements OnInit {
  idToken$: Observable<string> = this.store.select('idToken','idToken');
  constructor(@Inject(MAT_DIALOG_DATA) public item: Item, private store: Store<{ item: ItemState,idToken: AuthState  }>,  public dialogRef: MatDialogRef<DialogDetailComponent>) {
    console.log(this.item)
  }
  additemForm!: FormGroup;
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
  updateItem(item: Item){
    item._id = this.item._id
    if(!item.description){
      item.description = this.item.description
    }
    if(!item.imgSrc){
      item.imgSrc = this.item.imgSrc
    }
    if(!item.price){
      item.price = this.item.price
    }
    if(!item.name)
    {
      item.name = this.item.name
    }
    console.log(item.price)
    this.idToken$.subscribe(value =>{
      if(value){
        this.store.dispatch(ItemAction.updateItem({item,idToken:value}));
      }
    })
    this.dialogRef.close('close')
  }

}
