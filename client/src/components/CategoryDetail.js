import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export const CategoryDetail = () => {
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchCategoryDetail() {
      const response = await fetch(`/api/category/${id}`);
      const data = await response.json();
      setCategory(data.results);
      setIsLoading(false);
    }
    fetchCategoryDetail();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <>
          <p>Loading</p>
        </>
      ) : (
        <>
          {category.categoryItems.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </>
      )}
    </>
  );
};

/*
 Object.entries(category.categoryItems).map(([key, value]) => (
    <div key={key}>{value}</div>
));
*/
