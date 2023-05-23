import React from "react";

interface ButtonDeleteProps {
  path: string;
  onDelete: () => void;
}

//<ButtonDelete path="/api/items/123" /> --- how to use

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ path, onDelete }) => {
  const handleClick = () => {
    fetch(path, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Item deleted:', data);
        onDelete();
      })
      .catch(error => {
        console.error('There was a problem deleting the item:', error);
      });
  };

  return (
    <button type="button" onClick={handleClick}>
      DELETE
    </button>
  );
};

export default ButtonDelete;