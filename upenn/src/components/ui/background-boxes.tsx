"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [rows, setRows] = useState<number[]>([]);
  const [cols, setCols] = useState<number[]>([]);

  useEffect(() => {
    const updateScreenSize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      setScreenSize({ width: newWidth, height: newHeight });

      const squareSize = 50;
      const newRows = Math.floor(newHeight / squareSize);
      const newCols = Math.floor(newWidth / squareSize);

      setRows(new Array(newRows).fill(1));
      setCols(new Array(newCols).fill(1));
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const squareSize = 50;

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

  const initializeUncoloredGrid = (rowsLength: number, colsLength: number) => {
    return Array.from({ length: rowsLength }, () => Array(colsLength).fill(""));
  };

  const centerPosition = {
    row: Math.floor(rows.length / 2),
    col: Math.floor(cols.length / 2),
  };

  const [blockColors, setBlockColors] = useState<string[][]>(initializeUncoloredGrid(0, 0));
  const [knights, setKnights] = useState(
    Array.from({ length: 3 }, () => ({
      row: centerPosition.row,
      col: centerPosition.col,
      color: getRandomColor(),
    }))
  );
  const [bishops, setBishops] = useState(
    Array.from({ length: 2 }, () => ({
      row: centerPosition.row,
      col: centerPosition.col,
      color: getRandomColor(),
    }))
  );

  const getRandomKnightMove = (row: number, col: number): [number, number] => {
    const knightMoves: [number, number][] = [
      [-2, -1], [-1, -2], [1, -2], [2, -1],
      [2, 1], [1, 2], [-1, 2], [-2, 1],
    ];

    const validMoves = knightMoves.filter(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      return newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length;
    });

    return validMoves.length > 0 ? validMoves[Math.floor(Math.random() * validMoves.length)] : [0, 0];
  };

  const getRandomBishopMove = (row: number, col: number): [number, number] => {
    const bishopMoves: [number, number][] = [
      [-1, -1], [-1, 1], [1, -1], [1, 1],
    ];

    const validMoves = bishopMoves.filter(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      return newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length;
    });

    return validMoves.length > 0 ? validMoves[Math.floor(Math.random() * validMoves.length)] : [0, 0];
  };

  useEffect(() => {
    setKnights(knights.map(knight => ({
      ...knight,
      row: centerPosition.row,
      col: centerPosition.col,
    })));

    setBishops(bishops.map(bishop => ({
      ...bishop,
      row: centerPosition.row,
      col: centerPosition.col,
    })));

    const interval = setInterval(() => {
      setKnights((prevKnights) => {
        return prevKnights.map((knight) => {
          const [rowOffset, colOffset] = getRandomKnightMove(knight.row, knight.col);
          const newRow = knight.row + rowOffset;
          const newCol = knight.col + colOffset;

          if (newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length) {
            setBlockColors((prevBlockColors) => {
              // Ensure we're creating a new deep copy of the row and the specific square
              const updatedColors = prevBlockColors.map((row, rowIndex) =>
                rowIndex === newRow ? [...row] : row
              );

              // Update only the exact square
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

      setBishops((prevBishops) => {
        return prevBishops.map((bishop) => {
          const [rowOffset, colOffset] = getRandomBishopMove(bishop.row, bishop.col);
          const newRow = bishop.row + rowOffset;
          const newCol = bishop.col + colOffset;

          if (newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length) {
            setBlockColors((prevBlockColors) => {
              // Ensure we're creating a new deep copy of the row and the specific square
              const updatedColors = prevBlockColors.map((row, rowIndex) =>
                rowIndex === newRow ? [...row] : row
              );

              // Update only the exact square
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

  useEffect(() => {
    setBlockColors(initializeUncoloredGrid(rows.length, cols.length));
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
              animate={{ backgroundColor: blockColors[i]?.[j] || "transparent" }}
              whileHover={{ backgroundColor: `var(${getRandomColor()})`, transition: { duration: 0 } }}
              className={cn(
                "border border-slate-700 relative",
                (knights.some((knight) => knight.row === i && knight.col === j) || 
                bishops.some((bishop) => bishop.row === i && bishop.col === j))
                  ? knights.find((knight) => knight.row === i && knight.col === j)?.color ||
                    bishops.find((bishop) => bishop.row === i && bishop.col === j)?.color
                  : ""
              )}
            >
              {knights.some((knight) => knight.row === i && knight.col === j) && (
                <img
                  src="/chess/knight.png"
                  alt="Knight"
                  style={{ width: "100%", height: "100%" }}
                  className="absolute h-full w-full object-contain pointer-events-none"
                />
              )}
              {bishops.some((bishop) => bishop.row === i && bishop.col === j) && (
                <img
                  src="/chess/bishop.png"
                  alt="Bishop"
                  style={{ width: "100%", height: "100%" }}
                  className="absolute h-full w-full object-contain pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
