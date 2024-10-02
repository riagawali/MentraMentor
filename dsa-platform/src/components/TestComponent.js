// src/components/TestComponent.js
import React, { useEffect, useState } from "react";
import { getSampleData } from "../services/api";

const TestComponent = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSampleData();
      setData(result);
    };
    fetchData();
  }, []);

  return <div>Backend says: {data}</div>;
};

export default TestComponent;
