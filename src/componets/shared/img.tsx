import React, { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  src: string;
}

export const LoadImage = ({ src, children }: Props) => {
  const [widht, setWidth] = useState<number>(0);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setWidth(img.width);
    };
    img.onerror = (err) => {
      console.log("img error");
      console.error(err);
    };
  }, [src]);
  return (
    <div
      className="relative h-96 object-contain  "
      style={{
        width: widht,
        maxWidth: 700,
      }}
    >
      {children}
    </div>
  );
};
