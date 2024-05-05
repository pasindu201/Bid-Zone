import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from './Product';

const SearchItem = ({cart, setCart}) => {
  // console.log(useParams())
  const {term} = useParams();
  const [filterData, setFilterData] = useState([]);
  const [items, setAllItems] = useState([]);

    // Fetch all items from the API when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:8080/items/all"); // Assuming the base URL is the same as the API base URL
                const data = await response.json();
                setAllItems(data);

                // Filter products based on the provided `id`
                const filteredProduct = data.find((item) => item.id == id);
                setProduct(filteredProduct);

                // Filter related products based on the category of the current product
                const filteredRelatedProducts = data.filter(
                    (item) => item.category === filteredProduct.category && item.id !== id
                );
                setRelatedProducts(filteredRelatedProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchItems();
    }, []);

  useEffect(() => {
    const filteredData = () =>{
      const data = items.filter((p)=>p.title.toLowerCase().includes(term.toLowerCase()));
      // console.log(data)
      setFilterData(data)
    }

    filteredData();
    
  }, [term])
  


  return (
   <Product cart={cart} setCart={setCart} items={filterData} />
  )
}

export default SearchItem