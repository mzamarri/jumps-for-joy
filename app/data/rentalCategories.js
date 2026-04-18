import bounceHouseImg from '../assets/bounce-house.png';
import drySlideImg from '../assets/dry-slide.png';
import waterSlideImg from '../assets/water-slide.png';
import comboHouseImg from '../assets/combo-house.png';
import tentImg from '../assets/tent.png';
import tablesChairsImg from '../assets/tables-chairs.png';
import generatorImg from '../assets/generator.png';

const rentalCategories = [
    {
        id: "bounce-house",
        name: "Bounce Houses",
        title: "Bounce Houses",
        description: "Best for any occasion big or small.",
        tagline: "The classic crowd-pleaser for any age",
        longDescription: "Bounce houses are large, air-filled inflatable structures where kids jump, play, and bounce to their hearts' content. Available in a variety of themes and sizes, they're designed to keep guests entertained for hours at birthdays, school carnivals, church events, and backyard gatherings. Each unit is cleaned, inspected, and set up safely before your event.",
        image: bounceHouseImg
    },
    {
        id: "dry-slides",
        name: "Dry Slides",
        title: "Dry Slides",
        description: "High-energy slide rentals for all-day fun without water setup.",
        tagline: "Big thrills without the water",
        longDescription: "Dry slides are tall inflatable slides that deliver fast, exciting rides without any water required. They're perfect for events where a wet setup isn't practical — indoor venues, cooler days, or locations without drainage. Kids and teens climb to the top and launch down at full speed, making them a high-energy centerpiece for any event.",
        image: drySlideImg
    },
    {
        id: "water-slides",
        name: "Water Slides",
        title: "Water Slides",
        description: "Cool down summer events with splash-ready inflatable slides.",
        tagline: "The ultimate summer cool-down experience",
        longDescription: "Water slides combine the thrill of a slide with a refreshing splash — ideal for summer birthdays, pool parties, and hot-weather celebrations. Riders get soaked from start to finish as water runs down the lane and into a splash pool at the base. These units are a guaranteed hit when temperatures climb and you want guests moving and cooling off all day.",
        image: waterSlideImg
    },
    {
        id: "combos",
        name: "Combo Units",
        title: "Combo Units",
        description: "Bounce + slide combinations for maximum variety in one rental.",
        tagline: "More fun in one footprint",
        longDescription: "Combo units pack a bounce area and an attached slide into a single inflatable, giving guests plenty of variety without needing multiple setups. They're a great value when you want to maximize activity in a limited space. Kids can bounce, climb, and slide all in one unit — keeping energy high and lines moving at any event.",
        image: comboHouseImg
    },
    {
        id: "tents",
        name: "Tents",
        title: "Tents",
        description: "Cover yourself from rainy or hot summer days.",
        tagline: "Keep guests comfortable rain or shine",
        longDescription: "Event tents provide shade and shelter for guests, food tables, and equipment during outdoor celebrations. Whether you're dealing with strong sun, unexpected drizzle, or just want a defined gathering space, a tent makes your layout feel organized and comfortable. Available in sizes suited for small gatherings to larger community events.",
        image: tentImg
    },
    {
        id: "tables-chairs",
        name: "Tables & Chairs",
        title: "Tables & Chairs",
        description: "Complete your setup with clean, dependable seating solutions.",
        tagline: "Reliable seating for every guest",
        longDescription: "Tables and chairs are the foundation of any well-organized event layout. They give guests a place to eat, sit, and gather — making the space feel complete and welcoming. Our rentals arrive clean and ready to use, and are picked up after your event so you're not left managing bulky equipment on your own.",
        image: tablesChairsImg
    },
    {
        id: "generators",
        name: "Generators",
        title: "Generators",
        description: "Need power? Rent one of our generators for outdoor setups.",
        tagline: "Power your event anywhere",
        longDescription: "Portable generators supply the electricity your inflatables and other equipment need at outdoor venues without reliable power access. Essential for parks, open fields, sports complexes, and locations far from outlets — a generator ensures your blowers stay running and your event stays on schedule without interruption.",
        image: generatorImg
    },
];

export default rentalCategories;
