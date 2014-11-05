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

	return categories;
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

var defineBuckets = function(categories) {

	_.each(categories, function(category) {
		_.extend(
			category, { bucket : _.find(
				buckets, function(bucket) {
					//console.log(category.sum, ' ', bucket.min, ' ', bucket.max, '\n');

					return category.factor >= bucket.min && category.factor <= bucket.max; 
				}
			)}
		);
	});

	return categories;

};

var addBucketWeight = function(categories) {

	_.each(categories, function(category) {
		category.sum *= category.bucket.factor;
	});

	return categories;
};

var defineBucketCode = function(categories) {

	var code;
	console.log('________________________________________________________________');
	_.each(categories, function(category){
		/*
		if(category.bucket.zone === 1) {
			code = [1, 0, 0];
		} else if(category.bucket.zone === 2) {
			code = [0, 1, 0];
		} else {
			code = [0, 0, 1];
		}
		*/
		console.log(category.bucket);
		_.extend(
			category, { 
				code : code 
			}
		);
	});

	return categories;
};

sumAllCategories = function(categories) {

	return _.reduce(
		categories, function(memo, category, index, list) {
			return category.sum + memo;
		}, 0
	);

	return sum;

};

var addZoneWeight = function(categories) {

	return _.reduce(
		categories, function(memo, category, index, list){
			_.each(category.code, function(digit, index, list){
				memo[index] += digit;
			});
		}, [0, 0, 0]
	);

};

var calculate = function(collection) {
				
				console.log(
					sumAllCategories(
						defineBucketCode(
							defineBuckets(
								calculateCategorySum(
									calculateCategoryFactors(
										merge(collection)
									)
								)
							)
						)
					)
				);


	/*
	console.log(util.inspect(
					defineBucketCode(
						defineBuckets(
							calculateCategorySum(
								calculateCategoryFactors(
									merge(collection)
								)
							)
						)
					)
				
			
		,
		{showHidden: false, depth: null})
	);
*/
	
};

module.exports = {
	calculate : calculate
};