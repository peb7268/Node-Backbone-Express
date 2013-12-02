/* ------ This file acts as an entry point for all modules in this dir -------------------- /
* 			It allows you to export your schema modules to the outside.
------------------------------------------------------------------------------------------ */

module.exports = {
	Product: require('./Product'),
	Company: require('./Company'),
	Sale: require('./Sale')
};