import { FC, ReactElement, ReactNode } from "react";
import Navbar from "./navbar";

type Props = {
    children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;