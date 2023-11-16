import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api/posts";

function useArticleData() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setNotices(data.paginatedResults || []);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError("No se pudo obtener la información. Por favor, inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { notices, loading, error };
}

export default useArticleData;