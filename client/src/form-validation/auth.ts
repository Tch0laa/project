import { ObjectSchema, string, object, ref } from 'yup'
import { RegisterValues } from '../types/auth'

const registrationSchema : ObjectSchema<RegisterValues> = object({
    email: string().required('Field required').email('Invalid E-mail'),
    password: string().required('Field required').min(6,'Password must be at least 6 characters long'),
    confirmPassword: string().required('Field required').oneOf([ref('passsword')],'Passwords must match')
})

export {registrationSchema}