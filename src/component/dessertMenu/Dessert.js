import DessertItem from "./DeseertItem";
import { useEffect, useState } from "react";

// Desserts Component
const Dessert = () => {
  // Component Logic
  const [dessertsData, setDesserts] = useState(null);
  // Fetching Data from Json file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data.json");
        const result = await response.json()
        setDesserts(result)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="desserts-menu">
        {
          dessertsData?.map((dessert, index) => {
            return <DessertItem dessert={dessert} key={index} />
          })
        }
      </div>
    </>
  )
}
export default Dessert; 