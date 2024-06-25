// npx create-next-app@latest chess-game
//cd chess-game


// //component/ChessBoard
// import { FC } from 'react';
// import Square from './Square';

// interface ChessboardProps {
//   board: (Piece | null)[][];
// }

// const Chessboard: FC<ChessboardProps> = ({ board }) => {
//   return (
//     <div className="flex flex-wrap w-96">
//       {board.map((row, rowIndex) => (
//         <div key={rowIndex} className="flex">
//           {row.map((piece, colIndex) => (
//             <Square key={`${rowIndex}${colIndex}`} piece={piece} />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Chessboard;

// //components/Square.tsx
// import { FC } from 'react';
// import { Piece } from '../types';

// interface SquareProps {
//   piece: Piece | null;
// }

// const Square: FC<SquareProps> = ({ piece }) => {
//   return (
//     <div className="w-12 h-12 border flex items-center justify-center">
//       {piece ? piece.type.charAt(0) : '-'}
//     </div>
//   );
// };

// export default Square;

// //types.ts
// export type PieceType = 'Pawn' | 'Knight' | 'Bishop' | 'Rook' | 'Queen' | 'King';
// export type Color = 'White' | 'Black';

// export interface Piece {
//   type: PieceType;
//   color: Color;
//   hasMoved: boolean;
// }

// //pages/index.tsx
// import { FC, useEffect, useState } from 'react';
// import Chessboard from '../components/Chessboard';
// import { Piece } from '../types';

// const Home: FC = () => {
//   const [board, setBoard] = useState<(Piece | null)[][]>([]);

//   // Initialize the chessboard
//   useEffect(() => {
//     initializeBoard();
//   }, []);

//   const initializeBoard = () => {
//     const initialBoard: (Piece | null)[][] = [];

//     // Initialize black pieces
//     initialBoard[0] = [
//       { type: 'Rook', color: 'Black', hasMoved: false },
//       { type: 'Knight', color: 'Black', hasMoved: false },
//       { type: 'Bishop', color: 'Black', hasMoved: false },
//       { type: 'Queen', color: 'Black', hasMoved: false },
//       { type: 'King', color: 'Black', hasMoved: false },
//       { type: 'Bishop', color: 'Black', hasMoved: false },
//       { type: 'Knight', color: 'Black', hasMoved: false },
//       { type: 'Rook', color: 'Black', hasMoved: false },
//     ];
//     initialBoard[1] = Array(8).fill({ type: 'Pawn', color: 'Black', hasMoved: false });

//     // Initialize empty middle squares
//     for (let i = 2; i < 6; i++) {
//       initialBoard[i] = Array(8).fill(null);
//     }

//     // Initialize white pieces
//     initialBoard[6] = Array(8).fill({ type: 'Pawn', color: 'White', hasMoved: false });
//     initialBoard[7] = [
//       { type: 'Rook', color: 'White', hasMoved: false },
//       { type: 'Knight', color: 'White', hasMoved: false },
//       { type: 'Bishop', color: 'White', hasMoved: false },
//       { type: 'Queen', color: 'White', hasMoved: false },
//       { type: 'King', color: 'White', hasMoved: false },
//       { type: 'Bishop', color: 'White', hasMoved: false },
//       { type: 'Knight', color: 'White', hasMoved: false },
//       { type: 'Rook', color: 'White', hasMoved: false },
//     ];

//     setBoard(initialBoard);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="text-4xl font-bold">Chess Game</h1>
//       <div className="mt-8">
//         <Chessboard board={board} />
//       </div>
//     </div>
//   );
// };

// export default Home;

// // styles/globals.css
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// /* Additional global styles here */

// .square {
//   width: 60px;
//   height: 60px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid #333;
// }
