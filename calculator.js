var _ = require('underscore');
var util = require('util');
var categories = require('./reference/categories.json');
var buckets = require('./reference/buckets.json');
var zoneTable = require('./reference/zonetable.json');

var merge = function(collection) {
	
	_.each(collection, function(model) {
		_.extend(
			_.findWhere(
				_.findWhere(
					categories, {
						title : model.category 
					}).steps, {
						title : model.title
					}
			), { value : model.sliderValue / 100 }
		);
	});

	return reference;
};

var calculateCategoryFactors = function(categories) {
	
	_.each(categories, function(category) {
		_.extend(category, { 
			factor : _.reduce(
				_.map(category.steps, function(step) {
					return step.weight * step.value;
				}), function(memo, weightedValue, index, list) {
					return weightedValue + memo;
				}, 0
			) 
		})
	});

	return categories;

};

var calculateCategorySum = function(categories) {

	_.each(categories, function(category) {
		_.extend(
			category, { sum : category.factor * category.maxValue }
		);
	});

	return categories;
};



var calculate = function(collection) {
	
	//console.log(merge(collection));
	//console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&\n');
	
	console.log(util.inspect(calculateCategorySum(calculateCategoryFactors(merge(collection))), {showHidden: false, depth: null}));
	
	//console.log('*********************************************************\n', util.inspect(merge(collection), {showHidden: false, depth: null}));
};
// ALL numbers, max values and buckets should live here
// ALL calclulations should happen here.
// ONLY expose the BARE MINIMUM in data.json 
/* for the top seve, we are not yelding a valuation, but this:
		Based on your input, there are too many good things going on for you. Congratulations. Unfortunately, the model has been calibrated against companies with pre-money valuations between $1.2M and $7.1M. Based on the information, you are outside of this range, and we suggest you contact a valuation provider for further details.
	*/




module.exports = {
	calculate : calculate
};