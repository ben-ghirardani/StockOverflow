var PieChart = require( './portfolioPieChart_view');
var Valuation = require( './valuation_view');
var SingleLineValuation = require( './single_stock_line_valuation');

var OverviewPage = function( refresh ) {
    this.data = null;
    this.refresh = refresh;

    //grab dom elements
    pieChartContainer = document.querySelector( '#pieChart' );
    pieChart = new PieChart( this.refresh, pieChartContainer );
    totalValuation = document.querySelector( '#valuation');
    valuation = new Valuation (this.refresh, totalValuation);
    singleLineValuesContainer = document.querySelector('#singlelinevaluations');
    console.log(singleLineValuesContainer);
    singleLineValuesData = new SingleLineValuation(this.refresh, singleLineValuesContainer);
}

OverviewPage.prototype.render = function(){
    pieChart.setData( this.data );
    pieChart.render();
    valuation.setData( this.data);
    valuation.render();
    singleLineValuesData.setData(this.data);
    singleLineValuesData.render();
}

OverviewPage.prototype.setData = function( data ){
    this.data = data;
}

module.exports = OverviewPage;