import {FieldsOptions} from "../../../common/fields-options";

const userProfileFieldsOptions: FieldsOptions = {
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
    photo: {
        id: 'photo',
        label: 'Foto'
    },
    phone_number: {
        id: 'phone_number',
        label: 'Telefone'
    },
    password: {
        id: 'password',
        label: 'Senha',
        validationMessage: {
            minLength: 4
        }
    }
};

export default userProfileFieldsOptions;
