import { useState } from "react";
import RentalCategories from "./RentalCategories";
import RentalCatalog from "./RentalCatalog";
import RentalDetails from "./RentalDetails"

const categoryTabs = [
    "Bounce House",
    "Inflatable Combos",
    "Water Slides",
    "Dry Slides",
    "Tables and Chairs",
    "Tents",
    "Generators"
]
const rentals = [...Array(12)].map((item, idx) => {
    return {
        name: `Rental name ${idx}`,
        cost: `$${100 * idx}`,
        imageSrc: `imageSrc ${idx}`
    }
});

export default function Rentals() {
    const [ activeTab, setActiveTab ] = useState(null);
    const [ viewItem, setViewItem ] = useState(null);

    if (viewItem) {
        return <RentalDetails/>
    } else if (!activeTab) {
        return <RentalCategories categories={categoryTabs} selectCategory={setActiveTab}/>
    } 
    return <RentalCatalog 
        rentals={rentals} 
        categories={categoryTabs} 
        currentTab={activeTab} 
        selectTab={setActiveTab} 
        viewRental={setViewItem}
    />
}