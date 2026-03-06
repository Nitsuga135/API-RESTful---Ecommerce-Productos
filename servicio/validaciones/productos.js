import Joi from "joi";

const validar = producto => {

    const productoSchema = Joi.object({
        nombre: Joi.string()
                    .min(3)
                    .max(20)
                    .required(),
                    
        precio: Joi.number()
                   .required(),

        stock: Joi.number()
                  .required()
    })

    const {error} = productoSchema.validate(producto)

    return error;
}

export default validar;