import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="d-flex sign">
      <section className="m-auto bg-body-secondary px-3 py-4 rounded-1 signSection" >
        {children}
      </section>
    </div>
  );
}
