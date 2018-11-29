(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "bardemolk",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: "Table",
				Height: 150,
				Width: 150 ,
				BackgroundColor: '#cbcfde',
				TextColor: '#000000',
				BorderRadius: 50	
			} 
		},
		configOptions: function () { 
			return [{ 
				title: "Format Symbol",
				mode: "format" 
			}];
		}
	}

	function getConfig(){
		return {
			"type": "serial",
			"categoryField": "attribute",
			"startDuration": 1,
			"categoryAxis": {
				"gridPosition": "start"
			},
			"trendLines": [],
			"graphs": [
				{
					"balloonText": "[[category]]:[[value]]",
					"fillAlphas": 1,
					"id": "AmGraph-1",
					"title": "range",
					"type": "column",
					"valueField": "value"
				},
			],
			"guides": [],
			"valueAxes": [
				{
					"id": "ValueAxis-1",
					"title": "Values"
				}
			],
			"allLabels": [],
			"balloon": {},
			"legend": {
				"enabled": true,
				"useGraphSettings": true
			},
			"titles": [
				{
					"id": "Title-1",
					"size": 15,
					"text": ""
				}
			],
			"dataProvider": [
				{
					"attribute": "1",
					"value": 8,
				},
				{
					"attribute": "2",
					"value": 6,
				}
			]
		}
	}
	
	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;
		var labels;
		var previousValue = []; //for extra credit
		
		var symbolContainerDiv = elem.find("#container")[0];
		symbolContainerDiv.id = "barChart_" + scope.symbol.Name;
		var chart = AmCharts.makeChart(symbolContainerDiv.id, getConfig());
		
		function convertoChart(data){
			
			return data.Rows.map(function(item, index){
				return {
					value: item.Value,
					attribute: labels[index]
				}
			});
			
			
		}
		
		function updateLabel(data){
			labels = data.Rows.map(function(item){
				return item.Label;
			});
		}
		
		function dataUpdate(data){
			if( !data) return;
			if( data.Rows[0].Label) updateLabel(data);
			if( !labels || !chart) return;
			
			var dataprovider = convertoChart(data);
			chart.dataProvider = dataprovider; 
			chart.validateData(); 
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
