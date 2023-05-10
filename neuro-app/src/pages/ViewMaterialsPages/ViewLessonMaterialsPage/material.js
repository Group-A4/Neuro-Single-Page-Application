async function getMaterialById(id) {
    const response = await fetch(`http://localhost:8191/materials/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch material');
    }
    const material = await response.json();
    return material;
  }
  export { getMaterialById };