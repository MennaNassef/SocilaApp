import { regex } from './../validation/regex';
import { calculateAge } from './../helpers/date';
import * as zod from "zod";


export const schema = zod.object({
    password:zod.string()
    .nonempty('Current Password is required')
    .regex(regex.password, "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
    newPassword:zod.string()
        .nonempty('New Password is required')
        .regex(regex.password, "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
    rePassword:zod.string()
        . nonempty('Confirm password is required')
    })
    .refine((data) => data.newPassword !== data.password, {
  message: "New password must be different from current password",
  path: ["newPassword"]})
    .refine((data) => data.newPassword == data.rePassword, { message: "Passwords do not match.", path: ["rePassword"] })

