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
		});
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
		value : sum,
		floor : sum * .9,
		ceiling : sum * 1.1
	};

};

var format = function(input) {

	var outOfRangeMessage = 'The model has been calibrated against companies with pre-money valuations between $1.2M and $7.1M. The model has not been calibrated for values outside of this range and will be unable to produce reliable pricing.';

	if (typeof input === 'object') {
		if(input.sum < 1200000 || input.sum > 7100000) {
			return outOfRangeMessage;
		}
		return _.each(_.clone(input), function(value, key, list) {
			list[key] = numeral(value).format('($ 0.00 a)'); 
		});
		
	} else if(typeof input === 'number') {
		if(input < 1200000 || input > 7100000) {
			return outOfRangeMessage;
		}
		var result = numeral(input).format('($ 0.00 a)'); 
		return result; 
	} else {
		throw new TypeError('`format` method only accepts numbers and objects');
	}

};

var calculate = function(collection) {			

	var valuationRaw,
		valuationFormatted,
		factors;

	valuationRaw = calculateFloorCeiling(
		addZoneWeight(
			sumAllCategories(
				addBucketWeight(
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
	
	valuationFormatted = format(valuationRaw);
	
	factors = _.map(categories, function(category) {
		return {
			title : category.title,
			factor : category.factor
		};
	});
	
	console.log({
		valuation : {
			raw : valuationRaw,
			formatted : valuationFormatted
		},
		factors : factors
	});

	return {
		valuation : {
			raw : valuationRaw,
			formatted : valuationFormatted
		},
		factors : factors
	};
	
};

module.exports = {
	calculate : calculate
};