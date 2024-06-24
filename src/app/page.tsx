"use client";

import React, { useRef, useState } from 'react';

const Page: React.FC = () => {
    const chessBoardRef = useRef<HTMLDivElement>(null); // Ref for the chessboard container
    const [isWhiteTurn, setIsWhiteTurn] = useState<boolean>(true); // State to track whose turn it is (true for white's turn)
    const [board, setBoard] = useState<string[]>([
        "\u265C", "\u265E", "\u265D", "\u265B", "\u265A", "\u265D", "\u265E", "\u265C", // Black pieces
        "\u265F", "\u265F", "\u265F", "\u265F", "\u265F", "\u265F", "\u265F", "\u265F", // Black pawns
        "", "", "", "", "", "", "", "", // Empty rows
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "\u2659", "\u2659", "\u2659", "\u2659", "\u2659", "\u2659", "\u2659", "\u2659", // White pawns
        "\u2656", "\u2658", "\u2657", "\u2655", "\u2654", "\u2657", "\u2658", "\u2656"  // White pieces
    ]);
    const [selectedPiece, setSelectedPiece] = useState<HTMLElement | null>(null); // State to track the currently selected piece

    // Event handler for when a piece is clicked
    const handlePieceClick = (piece: HTMLElement) => {
        console.log("Piece clicked:", piece.innerHTML); // Log the clicked piece
        const isWhitePiece = piece.innerHTML.charCodeAt(0) >= 9812 && piece.innerHTML.charCodeAt(0) <= 9817; // Determine if the piece is white
        if ((isWhiteTurn && !isWhitePiece) || (!isWhiteTurn && isWhitePiece)) {
            return; // Prevent selecting pieces out of turn
        }
        if (selectedPiece) {
            selectedPiece.classList.remove('selected'); // Remove 'selected' class from previously selected piece
        }
        piece.classList.add('selected'); // Add 'selected' class to the newly selected piece
        setSelectedPiece(piece); // Update selectedPiece to the clicked piece
    };

    // Validation function for pawn moves
    const isValidPawnMove = (startId: number, endId: number, isWhitePiece: boolean, isCapture: boolean) => {
        const direction = isWhitePiece ? -8 : 8; // Direction of movement for pawns (negative for white, positive for black)
        const initialRow = isWhitePiece ? startId >= 48 : startId <= 15; // Check if pawn is in its initial row
        const moveDistance = endId - startId; // Distance of the move
        if (isCapture) {
            return Math.abs(moveDistance) === direction - 1 || Math.abs(moveDistance) === direction + 1; // Valid capture move
        }
        return (moveDistance === direction || (moveDistance === 2 * direction && initialRow)); // Valid non-capture move
    };

    // Validation function for rook moves
    const isValidRookMove = (startId: number, endId: number) => {
        const sameColumn = startId % 8 === endId % 8; // Check if rook moves in the same column
        const sameRow = Math.floor(startId / 8) === Math.floor(endId / 8); // Check if rook moves in the same row
        return sameColumn || sameRow; // Valid rook move if either condition is true
    };

    // Validation function for knight moves
    const isValidKnightMove = (startId: number, endId: number) => {
        const rowDiff = Math.abs(Math.floor(startId / 8) - Math.floor(endId / 8)); // Difference in rows
        const colDiff = Math.abs((startId % 8) - (endId % 8)); // Difference in columns
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2); // Valid knight move
    };

    // Validation function for bishop moves
    const isValidBishopMove = (startId: number, endId: number) => {
        return Math.abs(Math.floor(startId / 8) - Math.floor(endId / 8)) === Math.abs((startId % 8) - (endId % 8)); // Valid bishop move
    };

    // Validation function for queen moves
    const isValidQueenMove = (startId: number, endId: number) => {
        return isValidRookMove(startId, endId) || isValidBishopMove(startId, endId); // Valid queen move (combines rook and bishop moves)
    };

    // Validation function for king moves
    const isValidKingMove = (startId: number, endId: number) => {
        const rowDiff = Math.abs(Math.floor(startId / 8) - Math.floor(endId / 8)); // Difference in rows
        const colDiff = Math.abs((startId % 8) - (endId % 8)); // Difference in columns
        return rowDiff <= 1 && colDiff <= 1; // Valid king move within one square in any direction
    };

    // Function to determine if a move is valid based on piece type
    const isValidMove = (startId: number, endId: number, pieceType: number, isWhitePiece: boolean, isCapture: boolean) => {
        switch (pieceType) {
            case 9817: // White pawn
            case 9823: // Black pawn
                return isValidPawnMove(startId, endId, isWhitePiece, isCapture);
            case 9814: // White rook
            case 9820: // Black rook
                return isValidRookMove(startId, endId);
            case 9816: // White knight
            case 9822: // Black knight
                return isValidKnightMove(startId, endId);
            case 9815: // White bishop
            case 9821: // Black bishop
                return isValidBishopMove(startId, endId);
            case 9813: // White queen
            case 9819: // Black queen
                return isValidQueenMove(startId, endId);
            case 9812: // White king
            case 9818: // Black king
                return isValidKingMove(startId, endId);
            default:
                return false;
        }
    };

    // Event handler for when a square on the chessboard is clicked
    const handleSquareClick = (squareId: number) => {

        console.log("Square clicked:", squareId);
        const squareContainsPiece = board[squareId - 1] !== ""; // Check if the square contains a piece

        if (selectedPiece && selectedPiece.parentElement?.id !== squareId.toString()) {
            const pieceType = selectedPiece.innerHTML.charCodeAt(0); // Get the type of the selected piece
            const isWhitePiece = pieceType >= 9812 && pieceType <= 9817; // Check if the selected piece is white
            const startId = parseInt(selectedPiece.parentElement?.id || "0"); // Get the ID of the square where the selected piece is currently located
            const endId = squareId; // Get the ID of the square where the selected piece is being moved
            const isCapture = squareContainsPiece; // Check if the move involves capturing another piece

            if (isValidMove(startId, endId, pieceType, isWhitePiece, isCapture)) { // Validate the move

                console.log("Valid move"); 
                const newBoard = [...board]; // Create a copy of the board
                newBoard[endId - 1] = newBoard[startId - 1]; // Move the selected piece to the new square
                newBoard[startId - 1] = ""; // Clear the original square
                setBoard(newBoard); // Update the board state

                selectedPiece.classList.remove('selected'); // Remove 'selected' class from the moved piece
                setSelectedPiece(null); // Clear the selected piece
                setIsWhiteTurn(!isWhiteTurn); // Toggle turn to the next player
            } else {

                console.log("Invalid move"); 
            }
        }
    };

    // Function to render the chessboard UI
    const renderBoard = () => {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            const isWhiteSquare = (Math.floor(i / 8) + i) % 2 === 0; // Determine if square should be white or black
            const piece = board[i]; // Get the piece (if any) for the current square
            const squareId = i + 1; // Square ID (1-based index)

            squares.push(
                <div
                    key={i}
                    id={squareId.toString()}
                    className={`square ${isWhiteSquare ? 'white' : 'black'}`} // Apply appropriate square color
                    onClick={() => handleSquareClick(squareId)} // Attach click handler to the square
                >
                    {piece && (
                        <span
                            className="piece"
                            dangerouslySetInnerHTML={{ __html: piece }} // Render the piece using its HTML entity
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the click event from bubbling up to the square
                                handlePieceClick(e.currentTarget as HTMLElement); // Call piece click handler
                            }}
                        ></span>
                    )}
                </div>
            );
        }
        return squares;
    };

    // Render the chessboard component
    return (
        <div className="chess-board" ref={chessBoardRef}>
            {renderBoard()}
        </div>
    );
};

export default Page;
