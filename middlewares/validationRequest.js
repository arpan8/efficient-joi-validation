const { statusCodes } = require('../config/constant')

exports.validateRequest = (schemas) => {
  return (req, res, next) => {

    const validationErrors = []
    // const schemaRequest = {
    //     params: true,
    //     query: true,
    //     body: true
    // }

    for (const [target, schema] of Object.entries(schemas)) {
    // target is body/params/query
    // schema is the Joi validation schema

    //   if(schema?.params || schema?.query || schema.body){
    //     validationErrors.push({
    //       message: 'Please choose the right parameter to send the data e.g body, query or params',
    //     })
    //   }

      if (schema) {
        /** 
            For each target (e.g., body, query, params), 
            the corresponding schema validates the data in req[target].
            
            Validation is performed with abortEarly: false, 
            ensuring all validation errors are collected,
            rather than stopping at the first error.

            errors: { wrap: { label: '' } } ensuring errors are unwrapped 
            to remove redundant labels for cleaner messages.
        */
        const { error } = schema.validate(req[target], {
          abortEarly: false,
          errors: { wrap: { label: '' } }
        })
        /** 
            If validation errors occur then
            Each error is mapped into a structured object containing:
            field: The field causing the error (e.g., name, query.page).
            message: The human-readable error message.
            
            These errors are added to the validationErrors array.
        */
        if (error) {
          validationErrors.push(
            ...error.details.map((detail) => ({
              field: detail.context?.label || detail.path.join('.'),
              message: detail.message,
            }))
          )
        }
      }
    }

    if (validationErrors.length > 0) return res.status(statusCodes.BAD_REQUEST).json({msg: 'Validation Error', data: validationErrors})
        //return res.error({msg: 'Validation Error', code: statusCodes.BAD_REQUEST, data: validationErrors})

    next()
  }
}