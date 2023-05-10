import React, { useEffect, useState } from 'react';

interface Material {
  id: number;
  title: string;
  html: string;
}

const GetMaterialById = (id: number): Material => {
  const [material, setMaterial] = useState<Material>({
    id: 0,
    title: '',
    html: '',
  });

  const url = `http://localhost:8191/materials/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setMaterial(data);
    };

    fetchData();
  }, [id]);

  console.log(material);

  if (!material) {
    return { id: 0, title: '', html: '' };
  }

  return material;
};

export { GetMaterialById };
