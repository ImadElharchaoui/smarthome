import React from "react";

// Optional: You can add props for size and color
const Spinner = ({ size = "md", color = "text-blue-600" }) => {
  const sizeClasses = {
    sm: "w-4",
    md: "w-6",
    lg: "w-10",
    xl: "w-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          loader 
          ${sizeClasses[size] || sizeClasses.md}
          ${color}
        `}
      />
    </div>
  );
};

export default Spinner;
