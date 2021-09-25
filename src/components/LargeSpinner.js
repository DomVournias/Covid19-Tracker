import React from "react";

export default function LargeSpinner() {
  return (
    <div className=" flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-100"></div>
    </div>
  );
}
