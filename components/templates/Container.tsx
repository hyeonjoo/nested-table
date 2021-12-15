import React, { ReactNode } from "react";
import Head from "next/head";

interface ContainerProps {
  children?: ReactNode;
  title?: string;
}

const Container = ({ children, title = "Hello World" }: ContainerProps) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </div>
);

export default Container;
