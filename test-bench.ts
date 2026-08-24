import type { CartItem } from "app/routes/cart/types"
import { v } from "./app/routes/cart/util/validation-helpers"

const cartItemSchema = v.object({
    singleItem: v.boolean(),
    id: v.string(),
    name: v.string(),
    cost: v.number(),
    description: v.string(),
    image: v.string(),
    quantity: v.number()
})

const cartValidator = v.validateType<CartItem>(cartItemSchema)

type ComplexObject = {
    a: string,
    b: boolean,
    c: CartItem[],
    d: {
        aa: number,
        bb: {
            aaa: string,
            bbb: string
        }
    }
}

const validateComplexObject = v.validateType<ComplexObject>(v.object({
    a: v.string(),
    b: v.boolean(),
    c: v.array(cartItemSchema),
    d: v.object({
        aa: v.number(),
        bb: v.object({
            aaa: v.string(),
            bbb: v.string()
        })
    })
}))