import { regex } from './../validation/regex';
import * as zod from "zod";


export const schema = zod.object({
    email: zod.string()
        .nonempty('Email is required')
        .regex(regex.email, "enter valid email"),
    password: zod.string()
        .nonempty('Password is required')
        .regex(regex.password, "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
    })