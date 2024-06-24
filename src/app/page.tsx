"use client"

import React, { useEffect, useRef } from 'react';

const Page = () => {
    const chessBoardRef = useRef<HTMLDivElement>(null); // Reference to the chess board element

    useEffect(() => {
        let selectedPiece: HTMLElement | null = null; // Variable to keep track of the currently selected chess piece
        const movedPieces = new Set<HTMLElement>(); // Set to track pieces that have moved once

        // Function to handle piece click
        const handlePieceClick = (piece: HTMLElement) => {
            return () => {
                // If there's already a selected piece, remove its 'selected' class
                if (selectedPiece) {
                    selectedPiece.classList.remove('selected');
                }
                // Update selectedPiece to the clicked piece and add 'selected' class
                selectedPiece = piece;
                selectedPiece.classList.add('selected');
            };
        };

        // Function to handle square click
        const handleSquareClick = (square: HTMLElement) => {
            return () => {
                // If there's a selected piece and the square doesn't already contain it
                if (selectedPiece && !square.contains(selectedPiece)) {
                    // Check if the piece hasn't moved yet or the square is in the first two rows (id 1-18)
                    const pieceId = selectedPiece.parentElement?.id;
                    if (!movedPieces.has(selectedPiece) || (pieceId && parseInt(pieceId) <= 18)) {
                        // Append the selected piece to the clicked square
                        square.appendChild(selectedPiece);
                        // Remove 'selected' class from the piece and reset selectedPiece to null
                        selectedPiece.classList.remove('selected');
                        // Mark the piece as moved if it's in the first two rows (id 1-18)
                        if (pieceId && parseInt(pieceId) <= 18) {
                            movedPieces.add(selectedPiece);
                        }
                        selectedPiece = null;
                    }
                }
            };
        };

        const chessBoard = chessBoardRef.current; // Get the chess board element

        if (chessBoard) {
            const pieces = chessBoard.querySelectorAll('.piece'); // Get all pieces
            const squares = chessBoard.querySelectorAll('.square'); // Get all squares

            // Add event listeners to pieces
            pieces.forEach(piece => {
                piece.addEventListener('click', handlePieceClick(piece as HTMLElement));
            });

            // Add event listeners to squares
            squares.forEach(square => {
                square.addEventListener('click', handleSquareClick(square as HTMLElement));
            });

            // Cleanup event listeners on component unmount
            return () => {
                pieces.forEach(piece => {
                    piece.removeEventListener('click', handlePieceClick(piece as HTMLElement));
                });
                squares.forEach(square => {
                    square.removeEventListener('click', handleSquareClick(square as HTMLElement));
                });
            };
        }
    }, []);

    // Initial arrangement of chess pieces
    const initialPieces = [
        "&#9814;", "&#9816;", "&#9815;", "&#9813;", "&#9812;", "&#9815;", "&#9816;", "&#9814;", // White pieces
        "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", // White pawns
        "", "", "", "", "", "", "", "", // Empty rows
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", // Black pawns
        "&#9820;", "&#9822;", "&#9821;", "&#9819;", "&#9818;", "&#9821;", "&#9822;", "&#9820;"  // Black pieces
    ];

    // Function to render the chess board
    const renderBoard = () => {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            const isWhiteSquare = (Math.floor(i / 8) + i) % 2 === 0; // Determine square color
            const piece = initialPieces[i]; // Get piece for the current square
            squares.push(
                <div key={i} id={i < 16 || i >= 48 ? (i - 48 + 1).toString() : undefined} className={`square ${isWhiteSquare ? 'white' : 'black'}`}>
                    {piece && <span className="piece" dangerouslySetInnerHTML={{ __html: piece }}></span>}
                </div>
            );
        }
        return squares;
    };

    return (
        <>
            <div ref={chessBoardRef} className="chess-board">
                {renderBoard()}
            </div>
        </>
    );
}

export default Page;
