import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes"

export default [
    index('./routes/home/index.tsx'),
    route("rentals", "./routes/rentals/rentals.tsx", [
        index("./routes/rentals/index.tsx"),
        route(":categoryId", "./routes/rentals/catalog.tsx"),
        route(":categoryId/:itemId", "./routes/rentals/details.tsx")
    ]),
    layout("./routes/cart/layout.tsx", [
        route("cart", "./routes/cart/cart.tsx"),
        route("details", "./routes/cart/details.tsx"),
        route("confirmation", "./routes/cart/review.tsx") 
    ])
] satisfies RouteConfig;