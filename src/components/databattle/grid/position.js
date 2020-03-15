export class Position {
	constructor(pos, columns, rows) {
		this.columns = columns;
		this.rows = rows;
		if (Array.isArray(pos)) {
			this.sectorIndex = pos[0] + pos[1] * columns;
		} else {
			this.sectorIndex = pos;
		}

		this.equals = this.equals.bind(this);
	}

	get column() {
		return this.sectorIndex % this.columns;
	}
	get row() {
		return Math.floor(this.sectorIndex / this.columns);
	}

	up(sectors = 1) {
		return this.down(-sectors);
	}
	down(sectors = 1) {
		if (sectors === 0) return this;
		const newIndex = this.sectorIndex + sectors * this.columns;
		if (newIndex < 0 || newIndex >= this.columns * this.rows) return null;
		return new Position(newIndex, this.columns, this.rows);
	}
	left(sectors = 1) {
		return this.right(-sectors);
	}
	right(sectors = 1) {
		if (sectors === 0) return this;
		const newColumn = this.sectorIndex % this.columns + sectors;
		if (newColumn < 0 || newColumn >= this.columns) return null;
		return new Position(this.sectorIndex + sectors, this.columns, this.rows);
	}

	equals(position) {
		return this === position || this.sectorIndex === position.sectorIndex;
	}
};