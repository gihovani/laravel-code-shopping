import {FieldsOptions} from "../../../../common/fields-options";

const productFieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 255
        }
    },
    price: {
        id: 'price',
        label: 'Valor',
        validationMessage: {
            min: 0.1
        }
    },
    description: {
        id: 'description',
        label: 'Decrição'
    },
    active: {
        id: 'active',
        label: 'Ativo'
    }
};

export default productFieldsOptions;
