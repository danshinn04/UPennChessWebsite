"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateScreenSize(); // Initial call
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const squareSize = Math.max(Math.min(Math.floor(screenSize.width / 20), Math.floor(screenSize.height / 20)), 1);
  const rows = squareSize > 0 ? new Array(Math.floor(screenSize.height / squareSize)).fill(1) : [];
  const cols = squareSize > 0 ? new Array(Math.floor(screenSize.width / squareSize)).fill(1) : [];

  const colors = [
    "--sky-300",
    "--pink-300",
    "--green-300",
    "--yellow-300",
    "--red-300",
    "--purple-300",
    "--blue-300",
    "--indigo-300",
    "--violet-300",
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  // Initially, all squares are "uncolored" (empty string)
  const initializeUncoloredGrid = () => rows.map(() => cols.map(() => ""));

  const centerPosition = {
    row: Math.floor(rows.length / 2),
    col: Math.floor(cols.length / 2),
  };

  const [blockColors, setBlockColors] = useState<string[][]>(initializeUncoloredGrid);
  const [knights, setKnights] = useState(
    Array.from({ length: 5 }, () => ({
      row: centerPosition.row,
      col: centerPosition.col,
      color: getRandomColor(),
    }))
  );

  const getRandomKnightMove = (row: number, col: number) => {
    const knightMoves = [
      [-2, -1], [-1, -2], [1, -2], [2, -1],
      [2, 1], [1, 2], [-1, 2], [-2, 1],
    ];
    const validMoves = knightMoves.filter(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      return newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length;
    });
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setKnights((prevKnights) => {
        return prevKnights.map((knight) => {
          const [rowOffset, colOffset] = getRandomKnightMove(knight.row, knight.col);
          const newRow = knight.row + rowOffset;
          const newCol = knight.col + colOffset;

          // Check if the row and column are valid before updating the grid
          if (newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length) {
            setBlockColors((prevBlockColors) => {
              // Ensure the array structure is properly handled
              const updatedColors = prevBlockColors.map((row, index) => {
                // Ensure the row exists in the updated structure
                if (!row) row = Array(cols.length).fill("");
                return [...row];
              });

              // Ensure the row exists
              if (!updatedColors[newRow]) {
                updatedColors[newRow] = Array(cols.length).fill("");
              }

              // Update the new color
              updatedColors[newRow][newCol] = `var(${getRandomColor()})`;
              return updatedColors;
            });
          }

          return {
            row: newRow,
            col: newCol,
            color: getRandomColor(),
          };
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [rows.length, cols.length]);

  return (
    <div
      style={{
        width: screenSize.width,
        height: screenSize.height,
        display: "grid",
        gridTemplateColumns: `repeat(${cols.length}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${rows.length}, ${squareSize}px)`,
      }}
      className={cn("absolute left-0 top-0", className)}
      {...rest}
    >
      {rows.map((_, i) => (
        <React.Fragment key={`row${i}`}>
          {cols.map((_, j) => (
            <motion.div
              key={`col${j}`}
              style={{ width: squareSize, height: squareSize }}
              animate={{ backgroundColor: blockColors[i]?.[j] || "transparent" }} // Default to transparent if uncolored
              whileHover={{ backgroundColor: `var(${getRandomColor()})`, transition: { duration: 0 } }}
              className={cn(
                "border border-slate-700 relative",
                knights.some((knight) => knight.row === i && knight.col === j)
                  ? knights.find((knight) => knight.row === i && knight.col === j)?.color
                  : ""
              )}
            >
              {knights.some((knight) => knight.row === i && knight.col === j) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 text-black pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 4.5v15m8-15v15m-5 0a3 3 0 106 0h-6zM6 14h6m-6 4h6m-6-8h6m-6-4h6"
                  />
                </svg>
              )}
            </motion.div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
