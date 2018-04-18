import { Component, OnInit } from '@angular/core';

import { Cell } from '@models/cell.model';
import { Player } from '@models/player.model';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'dc-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  columns = 6;
  rows = 7;
  cells: Cell[] = [];

  p1: Player;
  p2: Player;

  currentRound = 0;

  currentPlayer: Player;

  constructor(private storageSvc: StorageService) {
    this.initGame();
  }

  ngOnInit() {

  }

  initGame(): void {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.cells.push({
          id: i * this.rows + j,
          row: i,
          column: j
        });
      }
    }

    this.p1 = { id: 1, color: 'RED'};
    this.p2 = { id: 2, color: 'YELLOW'};

    this.currentRound = 0;
    this.currentPlayer = this.p1;
  }

  reset(): void {
    this.cells = [];
    this.initGame();
  }

  save(): void {
    this.storageSvc.setItem('currentPlayer', this.currentPlayer);
    this.storageSvc.setItem('cells', this.cells);
    this.storageSvc.setItem('currentRound', this.currentRound);
  }

  loadGame(): void {
    const cells = this.storageSvc.getItem('cells');
    const currentPlayer = this.storageSvc.getItem('currentPlayer');
    if (cells && currentPlayer) {
      this.cells = cells;
      this.currentPlayer = currentPlayer;
      this.currentRound = this.storageSvc.getItem('currentRound');
    }
  }

  play(cell: Cell): void {
    const lowestCell: Cell = this._lowestCell(cell.column);
    if (lowestCell === undefined) { return; }
    this.currentRound++;

    lowestCell.playerId = this.currentPlayer.id;
    lowestCell.clicked = true;

    if (this.currentRound >= 7) {
      const winner: Player = this._checkWin(lowestCell);
      if (winner === null && this.currentRound >= this.rows * this.columns) {
        alert('fin de partie');
        this.reset();
        return;
      }
      if (winner) {
        alert(`Le gagnant est ${winner.color}`);
        this.reset();
        return;
      }
    }

    this._swapPlayer();
  }

  private _swapPlayer(): void {
    this.currentPlayer = this.currentPlayer === this.p1 ? this.p2 : this.p1;
  }

  private _checkWin(cell: Cell): Player {
    if (this._checkWinRow(cell) || this._checkWinCol(cell) || this._checkWinAscDiagonal(cell) || this._checkWinDescDiagonal(cell)) {
      return this.currentPlayer;
    }
    return null;
  }

  private _lowestCell(col: number): Cell {
    return this._getColumn(col).reverse().find(cell => !cell.clicked);
  }

  private _getColumn(col: number): Cell[] {
    return this.cells.filter(cell => cell.column === col);
  }

  private _getRow(row: number): Cell[] {
    return this.cells.filter(cell => cell.row === row);
  }

  private _getAscDiagonal(id: number): Cell[] {
    return this.cells.filter(cell => (cell.id - id) % (this.rows - 1) === 0);
  }

  private _getDescDiagonal(id: number): Cell[] {
    return this.cells.filter(cell => (cell.id - id) % (this.rows + 1) === 0);
  }

  private _checkWinRow(cell: Cell): boolean {
    const row = this._getRow(cell.row);
    const playerCells = row.filter(c => c.playerId === this.currentPlayer.id);
    if (playerCells.length >= 4) {
      for (let i = 0; i < playerCells.length - 1; i++) {
        if (playerCells[i + 1].column - playerCells[i].column !== 1) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  private _checkWinCol(cell: Cell): boolean {
    const col = this._getColumn(cell.column);
    const playerCells = col.filter(c => c.playerId === this.currentPlayer.id);
    if (playerCells.length >= 4) {
      return playerCells[playerCells.length - 1].row - playerCells[0].row === 3;
    }
    return false;
  }

  private _checkWinAscDiagonal(cell: Cell): boolean {
    const diag = this._getAscDiagonal(cell.id);
    const playerCells = diag.filter(c => c.playerId === this.currentPlayer.id);
    console.log(playerCells);
    if (playerCells.length >= 4) {
      console.log(this.rows - 1);
      for (let i = 0; i < playerCells.length - 1; i++) {
        if (playerCells[i + 1].id - playerCells[i].id !== this.rows - 1) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  private _checkWinDescDiagonal(cell: Cell): boolean {
    const diag = this._getDescDiagonal(cell.id);
    const playerCells = diag.filter(c => c.playerId === this.currentPlayer.id);
    if (playerCells.length >= 4) {
      for (let i = 0; i < playerCells.length - 1; i++) {
        if (playerCells[i + 1].id - playerCells[i].id !== this.rows + 1) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

}
