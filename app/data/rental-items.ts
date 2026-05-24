import rentalCategories from "./rental-categories";

export type RentalItemData = {
    id: string;
    name: string;
    cost: number;
    image: string;
    summary: string;
    description: string[];
    dimensions: string;
    maxCapacity: string;
    features: string[];
};

const categoryImageMap = new Map(
    rentalCategories.map(category => [category.id, category.image]),
);

const rentalItemsByCategory: Record<string, RentalItemData[]> = {
    "bounce-house": [
        {
            id: "rainbow-castle",
            name: "Rainbow Castle Bounce House",
            cost: 165,
            image: categoryImageMap.get("bounce-house") ?? "",
            summary: "A bright, classic bounce house that brings nonstop energy to birthdays and backyard parties.",
            description: [
                "The Rainbow Castle Bounce House is a classic inflatable rental with bold party colors, tall castle-style towers, and a roomy jump area that gives kids plenty of space to play. It is designed for families who want a dependable inflatable that feels festive the moment guests arrive.",
                "This unit works especially well for birthdays, school events, church functions, and neighborhood celebrations where you want a strong visual centerpiece and an easy activity that keeps children entertained for hours.",
            ],
            dimensions: "13' L x 13' W x 14' H",
            maxCapacity: "6 to 8 riders",
            features: ["Large jumping area", "Bright castle design", "Mesh sides for visibility", "Great for birthdays and backyard events"],
        },
        {
            id: "party-palace",
            name: "Party Palace Bounce House",
            cost: 185,
            image: categoryImageMap.get("bounce-house") ?? "",
            summary: "A larger party-ready bounce house with a playful look and extra room for active events.",
            description: [
                "The Party Palace Bounce House is built for customers who want a bounce house that feels a little bigger and more eye-catching for busy parties. Its colorful design helps anchor the event setup while the spacious interior gives kids a fun place to stay active.",
                "It is a solid fit for family celebrations and community events where you need a bounce house that looks exciting, photographs well, and handles steady activity throughout the day.",
            ],
            dimensions: "15' L x 15' W x 16' H",
            maxCapacity: "8 to 10 riders",
            features: ["Expanded bounce space", "Colorful party styling", "High-visibility mesh panels", "Ideal for medium to large gatherings"],
        },
        {
            id: "jumbo-fun-house",
            name: "Jumbo Fun House",
            cost: 210,
            image: categoryImageMap.get("bounce-house") ?? "",
            summary: "A roomy inflatable for larger parties that need a strong visual focal point and more play space.",
            description: [
                "The Jumbo Fun House gives your event a bigger inflatable presence while still keeping the simple appeal of a classic bounce house. It is a good choice when you expect a lot of excited guests and want more room for jumping throughout the rental period.",
                "With its bold look and spacious layout, this unit works well for school events, church festivals, and larger birthday parties that need a dependable crowd-pleaser.",
            ],
            dimensions: "16' L x 16' W x 16' H",
            maxCapacity: "10 riders",
            features: ["Large event-friendly footprint", "Classic bounce house experience", "Bright high-impact colors", "Great for schools and church events"],
        },
    ],
    "dry-slides": [
        {
            id: "summit-slide",
            name: "Summit Dry Slide",
            cost: 245,
            image: categoryImageMap.get("dry-slides") ?? "",
            summary: "A tall inflatable slide that adds fast-paced fun without water setup.",
            description: [
                "The Summit Dry Slide is a strong option for events that want a high-energy inflatable with a simple setup. Its tall profile draws attention immediately and gives older kids a more exciting activity than a traditional bounce house.",
                "This unit is ideal for school carnivals, church events, and larger parties where you want a standout attraction that keeps lines moving and guests engaged.",
            ],
            dimensions: "25' L x 11' W x 18' H",
            maxCapacity: "1 rider at a time",
            features: ["Tall single-lane slide", "No water required", "Exciting event centerpiece", "Great for school and church functions"],
        },
    ],
    "water-slides": [
        {
            id: "splash-rush",
            name: "Splash Rush Water Slide",
            cost: 325,
            image: categoryImageMap.get("water-slides") ?? "",
            summary: "A summer-ready inflatable slide built for splashy, all-day fun.",
            description: [
                "The Splash Rush Water Slide is designed for hot-weather events where you want a bigger attraction and a way to keep guests cool. Its tall slide and splash landing create an energetic setup that feels like the main event.",
                "This rental is a strong fit for summer birthdays, neighborhood parties, and larger family gatherings that want something more exciting than a standard inflatable.",
            ],
            dimensions: "28' L x 12' W x 19' H",
            maxCapacity: "1 rider at a time",
            features: ["Water-ready slide lane", "Splash landing area", "Perfect for summer parties", "High-visibility colorful design"],
        },
    ],
    combos: [
        {
            id: "bounce-slide-combo",
            name: "Bounce & Slide Combo",
            cost: 285,
            image: categoryImageMap.get("combos") ?? "",
            summary: "A combo unit that gives guests both bounce space and slide action in one rental.",
            description: [
                "The Bounce & Slide Combo is a versatile inflatable that combines a jump area with a built-in slide, making it a practical choice for customers who want more variety without renting multiple units.",
                "It works especially well for birthdays and family events where different age groups want more than one activity in a single setup.",
            ],
            dimensions: "27' L x 13' W x 15' H",
            maxCapacity: "6 to 8 riders",
            features: ["Bounce area plus slide", "Great all-in-one option", "Ideal for mixed-age groups", "Eye-catching party design"],
        },
    ],
    tents: [
        {
            id: "event-shade-tent",
            name: "Event Shade Tent",
            cost: 140,
            image: categoryImageMap.get("tents") ?? "",
            summary: "A dependable tent rental that adds shade, comfort, and structure to your event layout.",
            description: [
                "The Event Shade Tent helps create a more comfortable and organized event space by providing reliable cover from sun and light weather. It works well for seating areas, food tables, and gathering zones.",
                "This is a practical add-on for birthdays, graduations, and community events where guests need a shaded place to relax.",
            ],
            dimensions: "20' L x 20' W",
            maxCapacity: "Varies by layout",
            features: ["Clean covered event space", "Great for seating or food areas", "Useful for sun protection", "Easy event upgrade"],
        },
    ],
    "tables-chairs": [
        {
            id: "party-seating-set",
            name: "Party Seating Set",
            cost: 95,
            image: categoryImageMap.get("tables-chairs") ?? "",
            summary: "A simple seating package that helps complete your party setup.",
            description: [
                "The Party Seating Set is a practical rental for events that need dependable tables and chairs without overcomplicating the setup. It helps tie the party space together and keeps guests comfortable throughout the event.",
                "It works well alongside inflatables, tents, and food tables when you want a more complete rental package.",
            ],
            dimensions: "Package rental",
            maxCapacity: "Varies by bundle",
            features: ["Clean tables and chairs", "Useful add-on for any event", "Pairs well with tents", "Helps complete the setup"],
        },
    ],
    generators: [
        {
            id: "portable-power-unit",
            name: "Portable Power Unit",
            cost: 120,
            image: categoryImageMap.get("generators") ?? "",
            summary: "A generator rental for locations where dedicated power is limited or unavailable.",
            description: [
                "The Portable Power Unit is intended for event setups that need dependable power support for inflatables or other rental equipment. It is especially useful for parks, open lots, and remote event spaces.",
                "This add-on helps customers avoid power access issues and gives more flexibility when planning outdoor events.",
            ],
            dimensions: "Portable generator",
            maxCapacity: "Supports select equipment",
            features: ["Useful for remote setups", "Supports inflatable operation", "Outdoor event flexibility", "Reliable add-on rental"],
        },
    ],
};

export function getItemsForCategory(categoryId?: string) {
    if (!categoryId) return [];
    return rentalItemsByCategory[categoryId] ?? [];
}

export function getRentalItem(categoryId?: string, itemId?: string) {
    return getItemsForCategory(categoryId).find(item => item.id === itemId);
}
