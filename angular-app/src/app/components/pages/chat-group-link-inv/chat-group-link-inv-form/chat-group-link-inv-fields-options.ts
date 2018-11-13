import {FieldsOptions} from "../../../../common/fields-options";

const chatGroupLinkInvFieldsOptions: FieldsOptions = {
    total: {
        id: 'total',
        label: 'Total de Convites',
        validationMessage: {
            min: 1
        }
    },
    remaining: {
        id: 'remaining',
        label: 'Quantidade Disponível'
    },
    expires_at: {
        id: 'expires_at',
        label: 'Data de Expiração'
    }
};

export default chatGroupLinkInvFieldsOptions;