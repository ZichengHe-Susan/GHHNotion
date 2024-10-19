import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { getDocs, collection } from 'firebase/firestore';

const ViewItems = () => {
  const [itemsList, setItemsList] = useState([]);
  const itemsCollectionRef = collection(db, "items");

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const data = await getDocs(itemsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItemsList(filteredData);
      } catch (err) {
        console.error("Error fetching items: ", err);
      }
    };

    // Call the async function
    getItemsList();
  }, []); // Empty dependency array ensures this runs only once when component mounts

  return (
    <div>
      {itemsList.map((item) => (
        <div key={item.id}> {/* Make sure to add a unique key for each item */}
          <h1>{item.name}</h1>
          <p>Price: {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewItems;