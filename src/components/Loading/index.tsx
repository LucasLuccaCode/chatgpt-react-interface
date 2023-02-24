import React from "react";

import { Spinner } from "./styles";

interface LoadingProps {
  size?: string
}

export const Loading: React.FC<LoadingProps> = ({ size }) => {
  return <Spinner size={size} />;
};