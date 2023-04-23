import React, { ReactNode, Suspense } from "react"
import { Loading } from "../Loading"

export const SuspenseFallback: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<Loading size='1.4rem' position="RELATIVE" />}>
    {children}
  </Suspense>
)