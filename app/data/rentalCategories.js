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
        image: bounceHouseImg
    },
    {
        id: "dry-slides",
        name: "Dry Slides",
        title: "Dry Slides",
        description: "High-energy slide rentals for all-day fun without water setup.",
        image: drySlideImg
    },
    {
        id: "water-slides",
        name: "Water Slides",
        title: "Water Slides",
        description: "Cool down summer events with splash-ready inflatable slides.",
        image: waterSlideImg
    },
    {
        id: "combos",
        name: "Combo Units",
        title: "Combo Units",
        description: "Bounce + slide combinations for maximum variety in one rental.",
        image: comboHouseImg
    },
    {
        id: "tents",
        name: "Tents",
        title: "Tents",
        description: "Cover yourself from rainy or hot summer days.",
        image: tentImg
    },
    {
        id: "tables-chairs",
        name: "Tables & Chairs",
        title: "Tables & Chairs",
        description: "Complete your setup with clean, dependable seating solutions.",
        image: tablesChairsImg
    },
    {
        id: "generators",
        name: "Generators",
        title: "Generators",
        description: "Need power? Rent one of our generators for outdoor setups.",
        image: generatorImg
    },
];

export default rentalCategories;
