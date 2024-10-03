"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [rows, setRows] = useState<number[]>([]);
  const [cols, setCols] = useState<number[]>([]);

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

  const [blockColors, setBlockColors] = useState<string[][]>(initializeUncoloredGrid(0, 0));

  // Initialize screen size and grid
  useEffect(() => {
    const updateScreenSize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      setScreenSize({ width: newWidth, height: newHeight });

      const newRows = Math.floor(newHeight / squareSize);
      const newCols = Math.floor(newWidth / squareSize);

      setRows(new Array(newRows).fill(1));
      setCols(new Array(newCols).fill(1));
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Initialize blockColors when grid size changes
  useEffect(() => {
    setBlockColors(initializeUncoloredGrid(rows.length, cols.length));
  }, [rows.length, cols.length]);

  // Initialize pieces once when grid is ready
  const isInitialized = useRef(false);

  const [knights, setKnights] = useState(
    Array.from({ length: 3 }, () => ({
      row: 0,
      col: 0,
      color: getRandomColor(),
    }))
  );
  const [bishops, setBishops] = useState(
    Array.from({ length: 2 }, () => ({
      row: 0,
      col: 0,
      color: getRandomColor(),
    }))
  );

  useEffect(() => {
    if (rows.length > 0 && cols.length > 0 && !isInitialized.current) {
      const centerPosition = {
        row: Math.floor(rows.length / 2),
        col: Math.floor(cols.length / 2),
      };

      setKnights(
        knights.map(() => ({
          row: centerPosition.row,
          col: centerPosition.col,
          color: getRandomColor(),
        }))
      );

      setBishops(
        bishops.map(() => ({
          row: centerPosition.row,
          col: centerPosition.col,
          color: getRandomColor(),
        }))
      );

      isInitialized.current = true;
    }
  }, [rows.length, cols.length]);

  // Move functions
  const getRandomKnightMove = (row: number, col: number): [number, number] | null => {
    const knightMoves: [number, number][] = [
      [-2, -1], [-1, -2], [1, -2], [2, -1],
      [2, 1], [1, 2], [-1, 2], [-2, 1],
    ];

    const validMoves = knightMoves.filter(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      return newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length;
    });

    return validMoves.length > 0 ? validMoves[Math.floor(Math.random() * validMoves.length)] : null;
  };

  const getRandomBishopMove = (row: number, col: number): [number, number] | null => {
    const bishopMoves: [number, number][] = [
      [-1, -1], [-1, 1], [1, -1], [1, 1],
    ];

    const validMoves = bishopMoves.filter(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      return newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length;
    });

    return validMoves.length > 0 ? validMoves[Math.floor(Math.random() * validMoves.length)] : null;
  };

  const updateBlockColor = (newRow: number, newCol: number) => {
    setBlockColors((prevBlockColors) => {
      if (newRow < 0 || newRow >= prevBlockColors.length || newCol < 0 || newCol >= prevBlockColors[0].length) {
        console.warn(`Attempted to update invalid cell: (${newRow}, ${newCol})`);
        return prevBlockColors;
      }

      const updatedColors = prevBlockColors.map((row, rowIndex) =>
        rowIndex === newRow ? [...row] : row // Ensure only the specific row is copied
      );
      updatedColors[newRow][newCol] = `var(${getRandomColor()})`; // Update only the specific square
      return updatedColors;
    });
  };

  // Move pieces at intervals
  useEffect(() => {
    if (rows.length === 0 || cols.length === 0) return;

    const interval = setInterval(() => {
      // Update knight positions and colors
      setKnights((prevKnights) => {
        return prevKnights.map((knight) => {
          const move = getRandomKnightMove(knight.row, knight.col);
          if (move) {
            const [rowOffset, colOffset] = move;
            const newRow = knight.row + rowOffset;
            const newCol = knight.col + colOffset;

            // Update block color
            updateBlockColor(newRow, newCol);

            return {
              row: newRow,
              col: newCol,
              color: getRandomColor(),
            };
          }
          // If no move is possible, return the current state without changes
          return knight;
        });
      });

      // Update bishop positions and colors
      setBishops((prevBishops) => {
        return prevBishops.map((bishop) => {
          const move = getRandomBishopMove(bishop.row, bishop.col);
          if (move) {
            const [rowOffset, colOffset] = move;
            const newRow = bishop.row + rowOffset;
            const newCol = bishop.col + colOffset;

            // Update block color
            updateBlockColor(newRow, newCol);

            return {
              row: newRow,
              col: newCol,
              color: getRandomColor(),
            };
          }
          // If no move is possible, return the current state without changes
          return bishop;
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
