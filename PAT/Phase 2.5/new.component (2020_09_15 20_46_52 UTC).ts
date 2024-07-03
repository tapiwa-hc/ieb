import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';
import {forbiddenNameValidator} from '../shared/username.validator';
import {PasswordValidator} from '../shared/password.validator';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  // optionsObj = [
  //   {name: 'One'},
  //   {name: 'Two'},
  //   {name: 'Three'},
  //   {name: 'Four'},
  // ];
  // options: string[] = ['One', 'Two', 'Three', 'Four'];

  // myControl = new FormControl;
  // filteredOptions: Observable<string[]>;

  // displayFn(option) {
  //   return option ? option.name : undefined;
  // }

  // registrationForm = new FormGroup({
  //   username: new FormControl('Vishwas'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });
  
  registrationForm = this.fb.group({
    username: ['Vishwas', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
    email: [''],
    subscribe: [false],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: [''],
    }),
    alternateEmails: this.fb.array([])
  }, {validator: PasswordValidator})

  get username() {
    return this.registrationForm.get('username');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }
  
  onSubmit() {
    console.log(this.registrationForm.value);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // )
    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter(option => option.toLowerCase().includes(filterValue))
  // }

  loadApiData() {
    this.registrationForm.patchValue({
      username: 'Broots',
      password: 'testicle',
      confirmPassword: 'testicle',
      // address: {
      //   city: 'City',
      //   state: 'State',
      //   postalCode: '123456'
      // }
    });
  }
}
