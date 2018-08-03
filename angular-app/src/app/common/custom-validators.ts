import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

function isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
}

export class CustomValidators {
    static cpf(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        const value = control.value.replace(/[^\d]/g, '');

        let ret = {'cpf': true};
        let soma = 0
        let resto;

        if (value.length !== 11 || value === '00000000000') {
            return ret;
        }

        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }
        if (resto !== parseInt(value.substring(9, 10))) {
            return ret;
        }

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11)) {
            resto = 0;
        }

        if (resto !== parseInt(value.substring(10, 11))) {
            return ret;
        }
        return null;
    };
};
