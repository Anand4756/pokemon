/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";
import { Pokemon } from "../types/PokemonTypes";
import { Kalam } from "next/font/google";
const kalam = Kalam({ subsets: ["latin"], weight: "400" });
const PokemonCard = ({
  pokemon,
  id,
}: {
  pokemon: Pokemon;
  id: string | undefined;
}) => {
  const [bgColor, setBgColor] = useState("white");
  const imgRef = useRef<HTMLImageElement>(null);

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const colorThief = new ColorThief();

    img.onload = () => {
      if (img.complete) {
        try {
          const [r, g, b] = colorThief.getColor(img);
          setBgColor(`rgb(${r}, ${g}, ${b})`);
        } catch (error) {
          console.error("Error extracting color:", error);
        }
      }
    };
  }, []);

  return (
    <div className="card-glass h-max w-full flex flex-col m-auto items-center justify-center rounded-xl shadow p-4 transition-all duration-300">
      <div className={`p-2 flex flex-col items-center justify-center `}>
        {" "}
        <div
          className="absolute rounded-full h-3/5 w-3/6"
          style={{ backgroundColor: bgColor, opacity: 0.4 }}
        >
          {""}
        </div>
        <img
          key={imageUrl}
          ref={imgRef}
          className={` pokemon-image w-40 h-40`}
          src={imageUrl}
          alt={pokemon.name}
          crossOrigin="anonymous"
        />
      </div>
      <h2
        className={`text-2xl capitalize font-semibold mt-3 ${kalam.className}`}
      >
        {pokemon.name}
      </h2>
    </div>
  );
};
export default PokemonCard;
