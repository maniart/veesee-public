var _ = require('underscore');
var util = require('util');
var numeral = require('numeral');
var categories = require('../reference/categories.json');
var buckets = require('../reference/buckets.json');
var zoneTable = require('../reference/zonetable.json');

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
	_.each(categories, function(category){
		
		if(category.bucket.zone === 1) {
			code = [1, 0, 0];
		} else if(category.bucket.zone === 2) {
			code = [0, 1, 0];
		} else {
			code = [0, 0, 1];
		}
			
		_.extend(
			category, { 
				code : code
			}
		);
	});
	return categories;
};

var sumAllCategories = function(categories) {

	return _.reduce(
		categories, function(memo, category, index, list) {
			return category.sum + memo;
		}, 0
	);

	return sum;

};

var addZoneWeight = function(sum) {

	var finalZoneCode = [0, 0, 0],
		zoneWeight;

	_.each(categories, function(category) {
		_.each(category.code, function(code, index) {
			finalZoneCode[index] += code;
		})
	});

	finalZoneCode = finalZoneCode.join('');
	zoneWeight = zoneTable[finalZoneCode];

	return sum * zoneWeight;
	

};

var calculateFloorCeiling = function(sum) {

	return {
		floor : sum * .9,
		ceiling : sum * 1.1
	};

};

var format = function(input) {

	if (typeof input === 'object') {
		
		_.each(input, function(value, key) {
			input[key] = numeral(value).format('($ 0.00 a)');
		});
		return input;
	} else if(typeof input === 'number') {
		return numeral(value).format('($ 0.00 a)'); 
	} else {
		throw new TypeError('`format` method only accepts numbers and objects');
	}

};

var calculate = function(collection) {			

	console.log(
		format(
			calculateFloorCeiling(
				addZoneWeight(
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
				)
			)
		)
	);
	return format(
		calculateFloorCeiling(
			addZoneWeight(
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
			)
		)
	);
	
};

module.exports = {
	calculate : calculate
};