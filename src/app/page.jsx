"use client";

import { Montserrat } from "next/font/google";
import Offers from "@/components/Offers/Offers";

const inter = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    // <PurchaseOrder data={data} />
    <div>
      <Offers />
    </div>
  );
}
