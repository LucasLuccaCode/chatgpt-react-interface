import React from "react";

import { Spinner } from "./styles";

interface LoadingProps {
  size?: string;
  position: "ABSOLUTE" | "RELATIVE"
}

export const Loading: React.FC<LoadingProps> = ({ size, position }) => {
  return (
    <Spinner
      size={size}
      position={position}
    />
  )
};