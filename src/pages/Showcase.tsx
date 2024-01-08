import React from "react";
import "tailwindcss/tailwind.css";
import LayoutShowcase from "../components/layout/LayoutShowcase";
import { CardWithImageBody } from "../components/card/cards";

function Showcase() {
  return (
    <LayoutShowcase>
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8 flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl sm:text-4xl font-bold">Showcase</h1>
          <p className="text-xl">This is the showcase page</p>
        </div>
        <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
            <li className="  px-8 py-10">
                <CardWithImageBody 
                text="This is a card with image body"
                title="Card with image body"
                
                />
            </li>
        </ul>
      </div>
    </LayoutShowcase>
  );
}

export default Showcase;
