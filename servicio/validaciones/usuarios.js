import Joi from "joi";

const validar = usuario => {
    const usuarioSchema = Joi.object({
        usuario: Joi.string()
            .min(2)
            .max(30)
            .required(),

        password: Joi.string()
            .min(4)
            .required(),

        admin: Joi.boolean()
            .required()
    });

    const { error } = usuarioSchema.validate(usuario);

    return error;
}

export default validar;
