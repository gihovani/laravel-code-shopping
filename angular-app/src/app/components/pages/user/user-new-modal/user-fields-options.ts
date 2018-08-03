import {FieldsOptions} from "../../../../common/fields-options";

const userFieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxLength: 255
        }
    },
    email: {
        id: 'email',
        label: 'E-mail'
    },
    password: {
        id: 'password',
        label: 'Senha',
        validationMessage: {
            minLength: 4
        }
    }
};

export default userFieldsOptions;
