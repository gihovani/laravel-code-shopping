import {FieldsOptions} from "../../../../common/fields-options";

const categoryFieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 255
        }
    },
    active: {
        id: 'active',
        label: 'Ativo'
    }
};

export default categoryFieldsOptions;