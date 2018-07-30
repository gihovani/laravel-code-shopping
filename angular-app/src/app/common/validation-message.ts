const messages = {
    required: ':name é obrigatório',
    minlength: ':name precisa ter no mínimo :min caracteres',
    maxlength: ':name não pode ter mais de :min caracteres',
    email: ':name não é um e-mail válido'
};

export class ValidationMessage {
    static getMessage(error: string, replaceTokens: Array<any>) {
        let message = messages[error];
        if (!message) return error;
        
        const tokens = message.match(/\:[a-z]+/g);
        tokens.forEach((token, index) => {
            message = message.replace(token, replaceTokens[index]);
        });
        return message;
    }
}