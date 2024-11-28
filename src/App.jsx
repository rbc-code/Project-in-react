import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleAdd = () => {
    if (formData.name && formData.price) {
      setItems([...items, { ...formData, id: Date.now().toString() }]);
      setFormData({ id: "", name: "", price: "" });
    }
  };

  
  const handleEdit = (id) => {
    const item = items.find((item) => item.id === id);
    setFormData(item);
    setIsEditing(true);
  };

  
  const handleUpdate = () => {
    setItems(
      items.map((item) =>
        item.id === formData.id ? { ...formData } : item
      )
    );
    setFormData({ id: "", name: "", price: "" });
    setIsEditing(false);
  };


  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <h1>Mobile Inventory Management</h1>
      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Mobile Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
      <div className="list">
        <h2>Inventory List</h2>
        {items.map((item) => (
          <div key={item.id} className="list-item">
            <span>
              {item.name} - ₹{item.price}
            </span>
            <button onClick={() => handleEdit(item.id)} className="edit">Edit</button>
            <button onClick={() => handleDelete(item.id)} className="delete">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
