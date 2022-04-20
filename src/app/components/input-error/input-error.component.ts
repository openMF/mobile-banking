import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

enum ErrorMessages {
  required = 'This field is required',
  min = 'The minimum number is {{value}}',
  max = 'The maximum number is {{value}}',
  minlength = 'The minimum length of this field is {{value}}',
  phoneNumber = 'The phone number must contain 10 digits',
  email = 'The email format is invalid',
  mustMatch = 'Passwords do not match',
  curp = 'The curp is invalid',
  accountNumber = 'The account number is invalid',
  password = 'The password must contain at least one uppercase, one lowercase, a number and a length of 8 characters',
  beneficiaryAlreadyRegistered = 'The beneficiary name is already registered. Choose another.',
  beneficiaryAccountAlreadyRegistered = 'The beneficiary account is already registered. Choose another.',
  ownAccountAlreadyRegistered = 'You cannot register your own accounts.',
  accountNotFound = 'Account not found',
  transferAmountLimit = 'Amount greather than transfer limit of {{value}}',
  transferAmountExceeded = 'Transfer amount greather than account balance',
  integer = "You must write an integer",
  text = 'You must write text',
  rfc = 'The RFC is invalid',
  issueNumber = 'There are 2 digits in front of your credential',
  electorKey = 'There are 18 digits in front of your credential',
  numberIne = 'There are 13 digits on the back of your credential',
  yearIne = 'There are 4 digits in front of your credential',
  passwordRepeatLetters = 'The password must not contain more than 2 consecutive equal numbers and/or letters',
  passwordContainsÑ = 'The password must not contain the letter Ñ',
  passwordContainsBlanks = 'The password must not contain blanks',
  passwordSpecialCharacters = 'The password must not contain special characters',
  passwordContainsRepeatAscNumbers = 'The password must not contain more than 2 ascending numbers',
  passwordContainsRepeatDesNumbers = 'The password must not contain more than 2 descending numbers',
  passwordContainsInstitutionName = 'The password should not contain the name of the institution',
  passwordContainsRepeatAscLetters = 'The password must not contain more than 2 ascending letters',
  passwordStartLetter = 'The password must start with a letter',
  clientNumber = 'The client number is invalid',
}

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent implements OnInit {

  public params: any = {};

  @Input() color: string = '#EB445A';

  @Input() colorClass: string = null;

  @Input() control: FormControl;

  constructor(protected translate: TranslateService) { }

  ngOnInit() {
    //console.log('control', this.control);
    //this.control.valueChanges.subscribe(() => console.log(this.control));
    if (this.colorClass) {
      this.color = '';
    }
  }

  get hasError(): any {
    return this.control && this.control.dirty && this.control.errors;
  }

  get messageError(): string {
    if (!this.hasError) {
      return '';
    }
    const keys: string[] = Object.keys(this.control.errors);

    switch (keys[0]) {
      case 'minlength':
        this.params['value'] = this.control.errors[keys[0]]['requiredLength'];
        break;

      default:
        this.params['value'] = this.control.errors[keys[0]][keys[0]];
        break;
    }

    if (this.translate.getDefaultLang() === 'en' && this.params.value) {
      return ErrorMessages[keys[0]].replace(`{{value}}`, this.params.value);
    }

    return ErrorMessages[keys[0]];

  }

}
