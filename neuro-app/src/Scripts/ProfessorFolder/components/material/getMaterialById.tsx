import React, { useEffect, useState } from 'react';
import { SERVER_ADDRESS } from '../../../../config/config';

interface Material {
  id: number;
  title: string;
  markdownText: string;
  html: string;
}

const GetMaterialById = (id: number): Material => {
  const [material, setMaterial] = useState<Material>({
    id: 0,
    title: '',
    markdownText: '',
    html: '',
  });

  const url = SERVER_ADDRESS + `/materials/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setMaterial(data);
    };

    fetchData();
  }, [id]);

  if (!material) {
    return { id: 0, title: '', markdownText: '', html: '' };
  }

  return material;
};

export { GetMaterialById };