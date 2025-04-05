"use client";

import { useEffect } from "react";
import Ping from "@/components/Ping";
import { incrementView } from "./../lib/incrementView";

const View = ({ id, totalViews }: { id: string; totalViews: number }) => {
  useEffect(() => {
    incrementView(id, totalViews);
  }, [id, totalViews]);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="text-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
