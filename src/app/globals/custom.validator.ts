import { AbstractControl, FormGroup } from '@angular/forms';
import { Beneficiarie } from './interfaces/beneficiarie';

export function ValidatePhoneNumber(control: AbstractControl) {
    if (!(/^[0-9]{10}$/.test(control.value))) {
        return { phoneNumber: true };
    }
    return null;
}

export function ValidateCurp(control: AbstractControl) {
    if (!(/^[a-zA-ZñÑ]{4}[\d]{6}(H|h|M|m)[a-zA-Z]{5}[a-zA-Z0-9]{2}$/.test(control.value))) {
        return { curp: true };
    }
    return null;
}

export function ValidateRfc(control: AbstractControl) {
    if (!control.value) {
        return null;
    } else if (!(/^[a-zA-Z]{4}[\d]{6}[a-zA-Z0-9]{3}$/.test(control.value))) {
        return { rfc: true };
    }
    return null;
}

export function ValidateRfcBoth(control: AbstractControl) {
    if (!control.value) {
        return null;
    } else if (!(/^[a-zA-Z]{3,4}[\d]{6}[a-zA-Z0-9]{3}$/.test(control.value))) {
        return { rfc: true };
    }
    return null;
}

export function ValidateClientNumber(control: AbstractControl) {
    if (!(/^([0-9]{8,10})$/.test(control.value))) {
        return { clientNumber: true };
    }
    return null;
}

export function ValidateNumberIne(control: AbstractControl) {
    if (!(/^([0-9]{13})$/.test(control.value))) {
        return { numberIne: true };
    }
    return null;
}

export function ValidateissueNumber(control: AbstractControl) {
    if (!(/^([0-9]{2})$/.test(control.value))) {
        return { issueNumber: true };
    }
    return null;
}

export function ValidateYear(control: AbstractControl) {
    if (!(/^([0-9]{4})$/.test(control.value))) {
        return { yearIne: true };
    }
    return null;
}

export function ValidateKeyIne(control: AbstractControl) {
    if (!control.value) {
        return null;
    } else if (!(/^[a-zA-Z]{6}[\d]{8}[H|M]{1}[a-zA-Z0-9]{3}$/.test(control.value))) {
        return { electorKey: true };
    }
    return null;
}

export function ValidateEmail(control: AbstractControl) {
    if  (control.value && !(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(control.value))) {
        return { email: true };
    }
    return null;
}

export function ValidateMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function ValidatePassword(control: AbstractControl) {
    if (/(.)\1{2,}/i.test(control.value)) { // contiene más de dos números o letras repetidas
        return { passwordRepeatLetters: true };
    } else if (/ñ/i.test(control.value)) { // contiene la letra ñ
        return { passwordContainsÑ: true };
    }  else if (control.value.includes(' ')) { // contiene espacios en blanco 
        return { passwordContainsBlanks: true };
    } else if (!(/^[a-z0-9]*$/i.test(control.value))) { // contiene caracteres especiales
        return { passwordSpecialCharacters: true };
    } else if (/012|123|234|345|456|567|678|789/.test(control.value)) { // contiene más de numeros consecutivos ascendentes
        return { passwordContainsRepeatAscNumbers: true };
    } else if (/987|876|765|654|543|432|321|210/.test(control.value)) { // contiene más de dos numeros consecutivos descendentes
        return { passwordContainsRepeatDesNumbers: true };
    } else if (/bansef|banbi/i.test(control.value)) { // contiene dos numeros consecutivos descendentes
        return { passwordContainsInstitutionName: true };
    } else if (!(/^[a-z][a-z0-9]*/i.test(control.value))) { // debe iniciar con una letra
        return { passwordStartLetter: true };
    } else if (control.value) {
         
        const array = control.value.split('');
        const len = array.length;
        const limitLen = len-3;

        for (const key in array) {
            const char = array[key].toUpperCase();
            
            if (/[a-z]/i.test(char)) {

                const keyCode = char.charCodeAt();
                const index = parseInt(key);
                
                if (index <= limitLen && 
                    (keyCode+1) === array[index+1].toUpperCase().charCodeAt() && 
                    (keyCode+2) === array[index+2].toUpperCase().charCodeAt() 
                ) {
                    return { passwordContainsRepeatAscLetters: true };
                }

            }
        }
    } 
    
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8})/.test(control.value)) { // debe contener al menos una mayuscula, una minuscula y un número
        return { password: true };
    }    

    return null;
}

export function ValidateInteger(control: AbstractControl) {
    if (!(/^[1-9]\d*$/.test(control.value))) {
        return { integer: true };
    }
    return null;
}


export function ValidateText(control: AbstractControl) {
    if (!(/^[A-Za-znÑäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\s]*$/.test(control.value))) {
        return { text: true };
    }
    return null;
}


export function ValidateAccountNumberBeneficiaries(control: AbstractControl) {
    if ((`${control.value}`).length === 11 || (`${control.value}`).length === 18) {
        return null;
    }
    return { accountNumber: true };
}
// custom validator para evistar que de alta como beneficiario una cuenta ya existente
export function ValidateAccountNumberBeneficiaryExist(controlName: string, beneficiaries: Beneficiarie[]) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        if (!control.value) { return null }
        for (var i = 0; i < (beneficiaries || []).length; i++) {
            if (beneficiaries[i].accountNumber == control.value) {
                control.setErrors({ beneficiaryAccountAlreadyRegistered: true });
            }
        }
        return null;
    }
}
// custom validator para evistar que de alta como beneficiario una cuenta propia
export function ValidateOwnAccountNumberExist(controlName: string, beneficiaries: Beneficiarie[]) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        if (!control.value) { return null; }

        let value = control.value;
        // 166 es Banco del Bienestar
        if (value.length == 18 && value.substring(0, 3) == "166") { 
            value = value.substring(6).substring(0, value.substring(6).length - 1);
        }

        for (let i = 0; i < (beneficiaries || []).length; i++) {
            if (beneficiaries[i].accountNumber == value) {
                control.setErrors({ ownAccountAlreadyRegistered: true });
            }
        }
        return null;
    };
}



export function ValidateBeneficiarieName(control: AbstractControl) {
    // TODO borrar el de parametro 9 porque las cuentas del banco siempre van a ser de 11, se dejo asi para las pruebas en un comienzo
    if ((`${control.value}`).length === 9 || (`${control.value}`).length === 11 || (`${control.value}`).length === 16 || (`${control.value}`).length === 18) {
        return null;
    }
    return { accountNumber: true };
}

export function ValidateNameBeneficiary(controlName: string, beneficiaries: Beneficiarie[], id: number) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        if (!control.value) { return null }
        for (var i = 0; i < (beneficiaries || []).length; i++) {
            if (beneficiaries[i].name.toLowerCase() == control.value.toLowerCase() && id !== beneficiaries[i].id) {
                control.setErrors({ beneficiaryAlreadyRegistered: true });
            }
        }
        return null;
    }
}

export function ValidateTransferAmountLimit(controlName: string, transferLimit: number) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        if (!control.value) { return null }
        if (parseFloat(control.value.replace(/,/g, '')) > transferLimit)
            control.setErrors({ transferAmountLimit: { transferAmountLimit: '$'+transferLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } });
        return null;
    }
}
