import React from "react";
import { ArrowUpRight } from "lucide-react";

const RevenueCard = () => {
  return (
    <div className="bg-amber-50 rounded-lg p-4 w-full max-w-xs text-center shadow-sm">
      <h2 className="text-xl font-bold mb-1">Revenue in Sep 2022</h2>

      <div className="flex items-center justify-center mb-1">
        <span className="text-green-500 text-4xl font-bold">$121.12K</span>
        <ArrowUpRight className="text-green-500 ml-1" size={24} />
      </div>

      <p className="text-gray-800 text-sm">Aug 2022: $64.48K</p>
    </div>
  );
};

export default RevenueCard;
