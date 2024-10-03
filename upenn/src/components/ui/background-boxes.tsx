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
  const [rooks, setRooks] = useState(
    Array.from({ length: 2 }, () => ({
      row: 0,
      col: 0,
      color: getRandomColor(),
    }))
  );

  // Helper function to generate unique positions
  const generateUniquePositions = (
    numPositions: number,
    rows: number,
    cols: number
  ): [number, number][] => {
    const positions = new Set<string>();
    const uniquePositions: [number, number][] = [];

    while (uniquePositions.length < numPositions) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      const key = `${row},${col}`;
      if (!positions.has(key)) {
        positions.add(key);
        uniquePositions.push([row, col]);
      }

      // Prevent infinite loop if grid is too small
      if (uniquePositions.length + positions.size > rows * cols) {
        break;
      }
    }

    return uniquePositions;
  };

  useEffect(() => {
    if (rows.length > 0 && cols.length > 0 && !isInitialized.current) {
      const totalPieces = knights.length + bishops.length + rooks.length;
      const uniquePositions = generateUniquePositions(totalPieces, rows.length, cols.length);

      if (uniquePositions.length < totalPieces) {
        console.warn("Not enough unique positions available for all pieces.");
      }

      const [knightPositions, bishopPositions, rookPositions] = [
        uniquePositions.slice(0, knights.length),
        uniquePositions.slice(knights.length, knights.length + bishops.length),
        uniquePositions.slice(knights.length + bishops.length, totalPieces),
      ];

      setKnights(
        knights.map((knight, index) => ({
          ...knight,
          row: knightPositions[index][0],
          col: knightPositions[index][1],
        }))
      );

      setBishops(
        bishops.map((bishop, index) => ({
          ...bishop,
          row: bishopPositions[index][0],
          col: bishopPositions[index][1],
        }))
      );

      setRooks(
        rooks.map((rook, index) => ({
          ...rook,
          row: rookPositions[index][0],
          col: rookPositions[index][1],
        }))
      );

      isInitialized.current = true;
    }
  }, [rows.length, cols.length]);

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
    const bishopDirections: [number, number][] = [
      [-1, -1], [-1, 1], [1, -1], [1, 1],
    ];

    // Shuffle the directions
    const shuffledDirections = [...bishopDirections].sort(() => 0.5 - Math.random());

    for (let direction of shuffledDirections) {
      const stepSize = Math.floor(Math.random() * 5) + 1; // Step size between 1 and 5
      const newRow = row + direction[0] * stepSize;
      const newCol = col + direction[1] * stepSize;

      if (newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length) {
        return [direction[0] * stepSize, direction[1] * stepSize];
      }
    }

    return null;
  };

  const getRandomRookMove = (row: number, col: number): [number, number] | null => {
    const rookDirections: [number, number][] = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
    ];

    // Shuffle the directions
    const shuffledDirections = [...rookDirections].sort(() => 0.5 - Math.random());

    for (let direction of shuffledDirections) {
      const stepSize = Math.floor(Math.random() * 5) + 1; // Step size between 1 and 5
      const newRow = row + direction[0] * stepSize;
      const newCol = col + direction[1] * stepSize;

      if (newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < cols.length) {
        return [direction[0] * stepSize, direction[1] * stepSize];
      }
    }

    return null;
  };

  const updateBlockColor = (newRow: number, newCol: number) => {
    setBlockColors((prevBlockColors) => {
      if (
        newRow < 0 ||
        newRow >= prevBlockColors.length ||
        newCol < 0 ||
        newCol >= prevBlockColors[0].length
      ) {
        console.warn(`Attempted to update invalid cell: (${newRow}, ${newCol})`);
        return prevBlockColors;
      }

      const updatedColors = prevBlockColors.map((rowData, rowIndex) =>
        rowIndex === newRow ? [...rowData] : rowData 
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

      // Update rook positions and colors
      setRooks((prevRooks) => {
        return prevRooks.map((rook) => {
          const move = getRandomRookMove(rook.row, rook.col);
          if (move) {
            const [rowOffset, colOffset] = move;
            const newRow = rook.row + rowOffset;
            const newCol = rook.col + colOffset;

            // Update block color
            updateBlockColor(newRow, newCol);

            return {
              row: newRow,
              col: newCol,
              color: getRandomColor(),
            };
          }
          return rook;
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
                 bishops.some((bishop) => bishop.row === i && bishop.col === j) ||
                 rooks.some((rook) => rook.row === i && rook.col === j))
                  ? knights.find((knight) => knight.row === i && knight.col === j)?.color ||
                    bishops.find((bishop) => bishop.row === i && bishop.col === j)?.color ||
                    rooks.find((rook) => rook.row === i && rook.col === j)?.color
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
              {rooks.some((rook) => rook.row === i && rook.col === j) && (
                <img
                  src="/chess/rook.png"
                  alt="Rook"
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
