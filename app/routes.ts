import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes"

export default [
    index('./routes/home/index.tsx'),
    route("about", "./routes/about.tsx"),
    route("location", "./routes/location.tsx"),
    route("contact", "./routes/contact.tsx"),
    route("faq", "./routes/faq.tsx"),
    ...prefix("rentals", [
        index("./routes/rentals/index.tsx"),
        route(":categoryId", "./routes/rentals/catalog.tsx"),
        route(":categoryId/:itemId", "./routes/rentals/details.tsx")
    ]),
    layout("./routes/cart/layout.tsx", [
        route("cart", "./routes/cart/cart.tsx"),
        route("details", "./routes/cart/details.tsx"),
        route("review", "./routes/cart/review.tsx") 
    ])
] satisfies RouteConfig;
