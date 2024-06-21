"use client"

import React, { useEffect } from 'react';

const Page = () => {
    useEffect(() => {
        // Initialize selectedPiece to keep track of the currently selected chess piece
        let selectedPiece: HTMLElement | null = null;

        // Add click event listeners to all elements with class 'piece'
        document.querySelectorAll('.piece').forEach(piece => {
            piece.addEventListener('click', () => {
                // If there's already a selected piece, remove its 'selected' class
                if (selectedPiece) {
                    selectedPiece.classList.remove('selected');
                }
                // Update selectedPiece to the clicked piece and add 'selected' class
                selectedPiece = piece as HTMLElement;
                selectedPiece.classList.add('selected');
            });
        });

        // Add click event listeners to all elements with class 'square'
        document.querySelectorAll('.square').forEach(square => {
            square.addEventListener('click', () => {
                // If there's a selected piece and the square doesn't already contain it
                if (selectedPiece && !square.contains(selectedPiece)) {
                    // Append the selected piece to the clicked square
                    square.appendChild(selectedPiece);
                    // Remove 'selected' class from the piece and reset selectedPiece to null
                    selectedPiece.classList.remove('selected');
                    selectedPiece = null;
                }
            });
        });

        // Cleanup event listeners on component unmount
        return () => {
            // Remove click event listeners for all elements with class 'piece'
            document.querySelectorAll('.piece').forEach(piece => {
                piece.removeEventListener('click', () => {});
            });
            // Remove click event listeners for all elements with class 'square'
            document.querySelectorAll('.square').forEach(square => {
                square.removeEventListener('click', () => {});
            });
        };
    }, []); // Empty dependency array ensures useEffect runs only once

    return (
        <>
            <div className="chess-board">
                {/* Board setup with pieces */}
                {/* First row (white pieces) */}
                <div className="square white"><span className="piece">&#9814;</span></div>
                <div className="square black"><span className="piece">&#9816;</span></div>
                <div className="square white"><span className="piece">&#9815;</span></div>
                <div className="square black"><span className="piece">&#9813;</span></div>
                <div className="square white"><span className="piece">&#9812;</span></div>
                <div className="square black"><span className="piece">&#9815;</span></div>
                <div className="square white"><span className="piece">&#9816;</span></div>
                <div className="square black"><span className="piece">&#9814;</span></div>
                {/* Second row (white pawns) */}
                <div id='11' className="square black"><span className="piece">&#9817;</span></div>
                <div id='12' className="square white"><span className="piece">&#9817;</span></div>
                <div id='13' className="square black"><span className="piece">&#9817;</span></div>
                <div id='14' className="square white"><span className="piece">&#9817;</span></div>
                <div id='15' className="square black"><span className="piece">&#9817;</span></div>
                <div id='16' className="square white"><span className="piece">&#9817;</span></div>
                <div id='17' className="square black"><span className="piece">&#9817;</span></div>
                <div id='18' className="square white"><span className="piece">&#9817;</span></div>
                {/* Empty rows */}
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                <div className="square black"></div>
                <div className="square white"></div>
                {/* Seventh row (black pawns) */}
                <div id='1' className="square white"><span className="piece">&#9823;</span></div>
                <div id='2' className="square black"><span className="piece">&#9823;</span></div>
                <div id='3' className="square white"><span className="piece">&#9823;</span></div>
                <div id='4' className="square black"><span className="piece">&#9823;</span></div>
                <div id='5' className="square white"><span className="piece">&#9823;</span></div>
                <div id='6' className="square black"><span className="piece">&#9823;</span></div>
                <div id='7' className="square white"><span className="piece">&#9823;</span></div>
                <div id='8' className="square black"><span className="piece">&#9823;</span></div>
                {/* Eighth row (black pieces) */}
                <div className="square black"><span className="piece">&#9820;</span></div>
                <div className="square white"><span className="piece">&#9822;</span></div>
                <div className="square black"><span className="piece">&#9821;</span></div>
                <div className="square white"><span className="piece">&#9819;</span></div>
                <div className="square black"><span className="piece">&#9818;</span></div>
                <div className="square white"><span className="piece">&#9821;</span></div>
                <div className="square black"><span className="piece">&#9822;</span></div>
                <div className="square white"><span className="piece">&#9820;</span></div>
            </div>
        </>
    );
}

export default Page;
