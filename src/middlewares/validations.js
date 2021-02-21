var {check}= require ("express-validator")

module.exports = [
    check("brands").isInt().withMessage("Elejir una Marca es obligatorio!"),
    check("category").isInt().withMessage("Elejir una Categoría es obligatorio!"),
    check("title").isLength({min:3,max:100}).withMessage("El titulo tiene que ser entre 3 y 100 Caracteres!"),
    check("description").isLength({max:1000}).withMessage("El titulo tiene que ser entre 3 y 100 Caracteres!"),               
    check("price").isInt({min:0}).withMessage("El precio debe ser => 0!!"),
]