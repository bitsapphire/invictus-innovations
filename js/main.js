	$( document ).ready(function() {
	  $('body').addClass("animate");

		// $('.beforeheader').hide();
        $('.curency').click(function () {


	        if($(".ha-header").hasClass('active')){
					$(".ha-header").removeClass('active');
				}else{
					$(".ha-header").addClass('active');
				}
        });	
        
        $('.closegraph').click(function () {


	        if($(".ha-header").hasClass('active')){
					$(".ha-header").removeClass('active');
				}else{
					$(".ha-header").addClass('active');
				}
        });	

	});

	var $head = $( '#ha-header' );
	$( '.ha-waypoint' ).each( function(i) {
		var $el = $( this ),
			animClassDown = $el.data( 'animateDown' ),
			animClassUp = $el.data( 'animateUp' );

		$el.waypoint( function( direction ) {
			if( direction === 'down' && animClassDown ) {
				$head.attr('class', 'ha-header ' + animClassDown);
			}
			else if( direction === 'up' && animClassUp ){
				$head.attr('class', 'ha-header ' + animClassUp);
			}
		}, { offset: '100%' } );
	} );




AmCharts.ready(function () {
				generateChartData();
				createStockChart();
			});

			var chart;
			var chartData = [];
			var newPanel;
			var stockPanel;

			function generateChartData() {
				var firstDate = new Date();
				firstDate.setHours(0, 0, 0, 0);
				firstDate.setDate(firstDate.getDate() - 2000);

				for (var i = 0; i < 2000; i++) {
					var newDate = new Date(firstDate);

					newDate.setDate(newDate.getDate() + i);

					var open = Math.round(Math.random() * (30) + 100);
					var close = open + Math.round(Math.random() * (15) - Math.random() * 10);

					var low;
					if (open < close) {
						low = open - Math.round(Math.random() * 5);
					} else {
						low = close - Math.round(Math.random() * 5);
					}

					var high;
					if (open < close) {
						high = close + Math.round(Math.random() * 5);
					} else {
						high = open + Math.round(Math.random() * 5);
					}

					var volume = Math.round(Math.random() * (1000 + i)) + 100 + i;

					var value = Math.round(Math.random() * (30) + 100);

					chartData[i] = ({
						date: newDate,
						open: open,
						close: close,
						high: high,
						low: low,
						volume: volume,
						value: value
					});
				}
			}

			function createStockChart() {
				var chart = new AmCharts.AmStockChart();
				chart.pathToImages = "images/";
				chart.balloon.horizontalPadding = 13;


				// DATASET //////////////////////////////////////////
				var dataSet = new AmCharts.DataSet();
				dataSet.fieldMappings = [{
					fromField: "open",
					toField: "open"
				}, {
					fromField: "close",
					toField: "close"
				}, {
					fromField: "high",
					toField: "high"
				}, {
					fromField: "low",
					toField: "low"
				}, {
					fromField: "volume",
					toField: "volume"
				}, {
					fromField: "value",
					toField: "value"
				}];
				dataSet.color = "#80a894";
				dataSet.dataProvider = chartData;
				dataSet.title = "ProtoShares";
				dataSet.categoryField = "date";

				var dataSet2 = new AmCharts.DataSet();
				dataSet2.fieldMappings = [{
					fromField: "value",
					toField: "value"
				}];
				dataSet2.color = "#d94214";
				dataSet2.dataProvider = chartData;
				dataSet2.compared = true;
				dataSet2.title = "BitCoin";
				dataSet2.categoryField = "date";

				chart.dataSets = [dataSet, dataSet2];

				// PANELS ///////////////////////////////////////////
				var stockPanel = new AmCharts.StockPanel();
				stockPanel.title = "Value";
				stockPanel.showCategoryAxis = false;
				stockPanel.percentHeight = 60;

				var valueAxis = new AmCharts.ValueAxis();
				valueAxis.dashLength = 5;
				stockPanel.addValueAxis(valueAxis);

				stockPanel.categoryAxis.dashLength = 5;

				// graph of first stock panel
				var graph = new AmCharts.StockGraph();
				graph.type = "candlestick";
				graph.openField = "open";
				graph.closeField = "close";
				graph.highField = "high";
				graph.lowField = "low";
				graph.valueField = "close";
				graph.lineColor = "#093844";
				graph.fillColors = "#7f8da9";
				graph.negativeLineColor = "#80a894";
				graph.negativeFillColors = "#80a894";
				graph.fillAlphas = 1;
				graph.balloonText = "open:<b>[[open]]</b><br>close:<b>[[close]]</b><br>low:<b>[[low]]</b><br>high:<b>[[high]]</b>";
				graph.useDataSetColors = false;
				graph.comparable = true;
				graph.compareField = "value";
				graph.showBalloon = true;
				stockPanel.addStockGraph(graph);

				var stockLegend = new AmCharts.StockLegend();
				stockLegend.valueTextRegular = undefined;
				stockLegend.periodValueTextComparing = "[[percents.value.close]]%";
				stockPanel.stockLegend = stockLegend;


				var stockPanel2 = new AmCharts.StockPanel();
				stockPanel2.title = "Volume";
				stockPanel2.percentHeight = 30;
				stockPanel2.marginTop = 1;
				stockPanel2.showCategoryAxis = true;

				var valueAxis2 = new AmCharts.ValueAxis();
				valueAxis2.dashLength = 5;
				stockPanel2.addValueAxis(valueAxis2);

				stockPanel2.categoryAxis.dashLength = 5;

				var graph2 = new AmCharts.StockGraph();
				graph2.valueField = "volume";
				graph2.type = "column";
				graph2.showBalloon = false;
				graph2.fillAlphas = 1;
				stockPanel2.addStockGraph(graph2);

				var legend2 = new AmCharts.StockLegend();
				legend2.markerType = "none";
				legend2.markerSize = 0;
				legend2.labelText = "";
				legend2.periodValueTextRegular = "[[value.close]]";
				stockPanel2.stockLegend = legend2;

				chart.panels = [stockPanel, stockPanel2];


				// OTHER SETTINGS ////////////////////////////////////
				var sbsettings = new AmCharts.ChartScrollbarSettings();
				sbsettings.graph = graph;
				sbsettings.graphType = "line";
				sbsettings.usePeriod = "WW";
				chart.chartScrollbarSettings = sbsettings;


				// Enable pan events
				var panelsSettings = new AmCharts.PanelsSettings();
				panelsSettings.panEventsEnabled = true;
				chart.panelsSettings = panelsSettings;

				// CURSOR
				var cursorSettings = new AmCharts.ChartCursorSettings();
				cursorSettings.valueBalloonsEnabled = true;
				chart.chartCursorSettings = cursorSettings;

				// PERIOD SELECTOR ///////////////////////////////////
				var periodSelector = new AmCharts.PeriodSelector();
				periodSelector.position = "bottom";
				periodSelector.periods = [{
					period: "DD",
					count: 10,
					label: "10 days"
				}, {
					period: "MM",
					selected: true,
					count: 1,
					label: "1 month"
				}, {
					period: "YYYY",
					count: 1,
					label: "1 year"
				}, {
					period: "YTD",
					label: "YTD"
				}, {
					period: "MAX",
					label: "MAX"
				}];
				chart.periodSelector = periodSelector;

				chart.write('chartdiv');
			}



			function addPanel() {
				newPanel = new AmCharts.StockPanel();
				newPanel.allowTurningOff = true;
				newPanel.title = "open";
				newPanel.showCategoryAxis = false;

				var graph = new AmCharts.StockGraph();
				graph.valueField = "close";
				graph.fillAlphas = 0.15;
				newPanel.addStockGraph(graph);

				var legend = new AmCharts.StockLegend();
				legend.markerType = "none";
				legend.markerSize = 0;
				newPanel.stockLegend = legend;

				chart.addPanelAt(newPanel, 1);
				chart.validateNow();

			}

$(document).ready(function(){
	// Cache the Window object
	$window = $(window);
                
   $('div[data-type="background"]').each(function(){
     var $bgobj = $(this); // assigning the object
                    
      $(window).scroll(function() {
                    
		// Scroll the background at var speed
		// the yPos is a negative value because we're scrolling it UP!								
		var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
		
		// Put together our final background position
		var coords = '50% '+ yPos + 'px';

		// Move the background
		$bgobj.css({ backgroundPosition: coords });
		
}); // window scroll Ends

 });	

}); 
/* 
 * Create HTML5 elements for IE's sake
 */

document.createElement("article");
document.createElement("section");

$('.subpagecontent .links').portamento({gap: 100});