import { createContext, ReactElement, ReactNode } from "react";

export const MContext = createContext(undefined); //exporting context object

function MyProvider(args: any, children: ReactNode): ReactElement {
  return <MContext.Provider value={args}>{children}</MContext.Provider>;
}

export default MyProvider;
