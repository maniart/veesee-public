// ALL numbers, max values and buckets should live here
// ALL calclulations should happen here.
// ONLY expose the BARE MINIMUM in data.json 
var zoneTable = {
	/* for the top seve, we are not yelding a valuation, but this:
		Based on your input, there are too many good things going on for you. Congratulations. Unfortunately, the model has been calibrated against companies with pre-money valuations between $1.2M and $7.1M. Based on the information, you are outside of this range, and we suggest you contact a valuation provider for further details.
	*/
	'006' : 10000,
	'015' : 10000,
	'105' : 10000,
	'024' : 10000,
	'114' : 10000,
	'204' : 10000,
	'033' : 10000,
	'123' : 1.7,
	'213' : 1.65,
	'303' : 1.6,
	'042' : 1.55,
	'132' : 1.5,
	'222' : 1.45,
	'312' : 1.4,
	'402' : 1.35,
	'051' : 1.3,
	'141' : 1.25,
	'231' : 1.2,
	'321' : 1.15,
	'411' : 1.1,
	'501' : 1.05,
	'060' : 1,
	'150' : 0.95,
	'240' : 0.9,
	/*
		for the bottom 4, same as above:
		Based on your input, there seems to be some more that needs to be done before a professional investor would invest in your venture. Typically, investors would need to hang their hat on something (a proven product, team, traction, etc). Once the company has evolved further, come back, and we'll give this another go
	*/
	'330' : 0,
	'420' : 0,
	'510' : 0,
	'600' : 0,
};

var data = {
	"initialSliderValue" : 51,
	"categories" : [

		{
			"title" : "team",
			"maxValue" : 1100000,
			"index" : 1,
			"steps" : [

				{
					"title" : "Depth of understanding",
					"initialSliderValue" : 50,
					"weight" : 0.4,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"Avg. Masters degree in industry related field",
						"Avg. 3 years of relevant industry experience",
						"Avg. PhD in subject",
						"Avg. 5 years of relevant industry experience"
					]
				},

				{
					"title" : "Execution Experience",
					"initialSliderValue" : 50,
					"weight" : 0.4,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"First Startup",
						"At least on the 2nd startup",
						"At least one successful exits",
						"More than 2 successful exits"
					]
					
				},

				{
					"title" : "Team composition",
					"initialSliderValue" : 50,
					"weight" : 0.1,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"1 member, Experience as product manager",
						"1 member, Experience as C-suite (CEO/CTO/COO, etc.)",
						"2 members, 1 Tech, 1 BizDev",
						"4 members, 1 in BizDev, 2 Technology, 1 Design"
					]
				},

				{
					"title" : "External network",
					"initialSliderValue" : 50,
					"weight" : 0.1,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"500+ LinkedIn connections and/or 2000+ Twitter followers and/or non-profit/meetup organization leader",
						"2+ industry expert as formal advisor/board member",
						"Top 5 incubator graduate, and/or achieved 3x crowdfunding for product",
						"Awarded leaders in the industry"
					]
				}

			]
		},

		{
			"title" : "market",
			"maxValue" : 700000,
			"index" : 2,
			"steps" : [

				{
					"title" : "Annual Spend",
					"initialSliderValue" : 50,
					"weight" : 0.5,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"<$500M",
						"$500M - $1B",
						"$1B - $5B",
						">$5B"
					]
				},

				{
					"title" : "Structure",
					"initialSliderValue" : 50,
					"weight" : 0.5,
					"slideType" : "mutuallyExclusive",
					"breakpoints" : [
						"Niche",
						"Oligapoly / Fractured",
						"Heterogeneous Customers",
						"Homogenous Customers"
					]
					
				}

			]
		},

		{
			"title" : "development",
			"maxValue" : 500000,
			"index" : 3,
			"steps" : [

				{
					"title" : "Development Stage",
					"initialSliderValue" : 50,
					"weight" : 0.5,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"In Development",
						"Pre-revenue, Working Prototype, Being Tested by Potential Customers",
						"Sporadic Revenue",
						"Recurring Revenue and/or Profit"
					]
				},

				{
					"title" : "Hours Spent",
					"initialSliderValue" : 50,
					"weight" : 0.25,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"<500 hours",
						"500 - 2,000 hours",
						"2,000 - 4,000 hours",
						">4,000 hours"
					]
					
				},

				{
					"title" : "Money Spent / Invested",
					"initialSliderValue" : 50,
					"weight" : 0.25,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"<$25K",
						"$25K - $100K",
						"$100K - $250K",
						">$250K"
					]
					
				}

			]
		},

		{
			"title" : "competetive advantage",
			"maxValue" : 400000,
			"index" : 4,
			"steps" : [

				{
					"title" : "competetive advantage",
					"initialSliderValue" : 50,
					"weight" : 1,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"better design/niche focus",
						"better pricing",
						"better product offering",
						"better core technology"
					]
				}

			]
		},

		{
			"title" : "traction",
			"maxValue" : 300000,
			"index" : 5,
			"steps" : [

				{
					"title" : "traction",
					"initialSliderValue" : 50,
					"weight" : 1,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"no customers yet",
						"sporadic customer growth",
						"extraordinary growth in first months / growth has slowed down",
						"six months of accelerating growth"
					]
				}

			]
		},

		{
			"title" : "distribution channel",
			"maxValue" : 200000,
			"index" : 6,
			"steps" : [

				{
					"title" : "distribution channel",
					"initialSliderValue" : 50,
					"weight" : 1,
					"slideType" : "slidingScale",
					"breakpoints" : [
						"submitted many requests for collaboration, some response for additional information",
						"handful of statement of works",
						"number of signed partnership agreements",
						"multiple R&D, licensing, or supply chain partnership agreements"
					]
				}

			]
		}


	],
	"buckets" : [
		{
			"range" : "0-24",
			"factor" : 0.75,
			"zone" : 1
		},
		{
			"range" : "25-49",
			"factor" : 1.1,
			"zone" : 1
		},
		{
			"range" : "50-74",
			"factor" : 1.3,
			"zone" : 2
		},
		{
			"range" : "75-100",
			"factor" : 1.5,
			"zone" : 3
		}
	],
}