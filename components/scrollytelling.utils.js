/**
* Simple class to handle + calculate against linear 1-dimentional positions
*/
export class Position {
	/**
	* Maxmimum value of the position as an absolute number
	* @type {Number}
	*/
	max = 0;


	/**
	* Position expressed as an absolute number <= `max`
	* @type {Number}
	*/
	absolute = 0;


	/**
	* Position expressed as a floating point number (zero to one)
	* @type {Number}
	*/
	float = 0;


	/**
	* Position expressed as a natural, rounted percentage to 0dp
	* @type {Number}
	*/
	percent = 0;


	/**
	* Position constructor
	* @param {Object} input Input data to use
	* @param {Number} input.max Maximum possible value for the position
	* @param {Number} [input.absolute] Current absolute position
	* @param {Number} [input.float] Current floating-point position
	*/
	constructor(input) {
		if (input?.max === undefined) throw new Error('Position must have a `max` key');
		this.max = input.max;

		if (input.absolute !== undefined) {
			this.absolute = input.absolute;
			this.float = input.absolute / this.max;
			this.percent = Math.round(this.float * 100);
		} else if (input.float !== undefined) {
			this.absolute = this.max * input.float;
			this.float = input.float;
			this.percent = Math.round(this.float * 100);
		} else {
			throw new Error('new Position object must be provided `max` + (`absolute` || `float`)');
		}

		if (this.absolute > this.max) console.warn('Position.max', this.max, 'is higher than maximum', this.max);
	}
}
