import React from "react";
import { BuilderComponent, builder } from "@builder.io/react";

interface BuilderSymbolProps {
  name: string;
  data?: Record<string, any>;
  className?: string;
  model?: string;
}

// Symbol component for reusable Builder.io symbols
const BuilderSymbol: React.FC<BuilderSymbolProps> = ({
  name,
  data = {},
  className = "",
  model = "symbol",
}) => {
  return (
    <div className={className}>
      <BuilderComponent
        model={model}
        name={name}
        data={{
          locale: "ro",
          timestamp: Date.now(),
          ...data,
        }}
      />
    </div>
  );
};

export default BuilderSymbol;
