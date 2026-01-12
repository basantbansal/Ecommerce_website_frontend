import axios from "axios";

let cachedProducts = null; 

const fetchItems = async () => {
  if (cachedProducts) {
    return cachedProducts;
  }

  const response = await axios.get(
    "https://fakestoreapi.com/products"
  );

  cachedProducts = response.data; 
  return cachedProducts;
};


export async function fetchItemById(id) {

  const items = await fetchItems();
  return items.find(item => item.id === Number(id));
}


export default fetchItems;
