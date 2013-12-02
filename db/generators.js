/* ---- Each property represents on entity in our schemas folder.
Each of these points to a function which in turn points to a function
that generates the seed data for each entity.

This nested method setup is done to capture closure state around each method.
This seed generator uses Charlatan to make fake data.
*/

var ch 		= require('charlatan'),
  moment 	= require('moment');


var colors = 'IndianRed SeaGreen NavyBlue Silver Platinum Gold Black'.split(' ');

module.exports = {

	Product: function () {
		var categories = {
		        'Music': ['DVD', 'CD', 'iPod', 'Cable'],
		        'Electronics': ['TV', 'Monitor', 'Laptop', 'Phone', 'Camera', 'Keyboard', 'Tablet'],
		        'Home': ['Table', 'Chair', 'Bed', 'Dinner-Set', 'Silverware', 'Sofa', 'Shelf'],
		        'Clothing': ['Shirt', 'Trousers', 'Jacket', 'Mittens', 'Cap', 'Sweater', 'Shorts', 'Scarf', 'Gloves'],
		        'Grocery': ['Vegetable', 'Fruit', 'Snack', 'Chocolate', 'Milk', 'Eggs'],
		        'Children': ['Book', 'Toy', 'Candy', 'Video Game']
		},
	  	categoryNames = Object.keys(categories);	//Get all the keys from categories
	    return function (companyIds) {
	    	//the charlatan sample method returns a random element from an array.
			var category = ch.Helpers.sample(categoryNames),
	        type = ch.Helpers.sample(categories[category]);

	        //charlatan's numerify method: Finds the # symbol and replaces it with random number
			return {
					name: type + ch.numerify(' - ###'),
					description: ch.Lorem.paragraphs(2),
					manufacturer: ch.Helpers.sample(companyIds),

					color: ch.Helpers.sample(colors),
					releaseDate: moment().subtract('months', ch.Helpers.rand(12)).toDate(),
					price: ch.Helpers.rand(500, 20),

					category: category,
					model: ch.numerify(ch.letterify('Model-?##?')),
					rating: 1 + ch.Helpers.rand(5),
					reviews: ch.Helpers.rand(100)
			};
	    };
  },


  Company: function () {
    return function(){
      var sectors = 'Technology Energy Pharmaceuticals Research Finance Real-Estate Electronics'.split(' ');
      return {
        name: ch.Company.name(),
        sector: ch.Helpers.sample(sectors),
        location: {
          city: ch.Address.city(),
          country: ch.Address.country()
        },
        founded: moment().subtract('years', ch.Helpers.rand(20)).toDate()
      };
    };
  },


  Sale: function () {

    return function(productIds) {

      return {
        product: ch.Helpers.sample(productIds),
        quantity: ch.Helpers.rand(100),
        saleDate: moment().subtract('days', ch.Helpers.rand(90)).toDate(),
        color: ch.Helpers.sample(colors)
      };

    };
  }
};