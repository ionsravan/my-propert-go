import React from 'react';

export function formatCost(cost: number): string {

  if (cost === undefined) {
    return ''; 
  }


  if (cost >= 10000000) {
    return (cost / 10000000).toFixed(2) + " Cr";
  } else if (cost >= 100000) {
    return (cost / 100000).toFixed(2) + " Lakh";
  } else {
    return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

interface PropertyCostProps {
  cost: number;
}

const PropertyCost: React.FC<PropertyCostProps> = ({ cost }) => {
  const formattedCost = formatCost(cost);

  return (
    <span>{formattedCost}</span>
  );
};

export default PropertyCost;
