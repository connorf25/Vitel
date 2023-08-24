import {startCase} from 'lodash-es';

/**
* Format a string to use Start Casing
* i.e. 'thisCamelCasedString' -> 'This Camel Cased String'
*
* @param {value} value The input value to format
* @returns {String} Human readable, start-cased string
*/
export default function(value) {
	return startCase(value);
}
