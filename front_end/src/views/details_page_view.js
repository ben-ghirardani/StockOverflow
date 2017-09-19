var PortfolioView = require('./portfolio_view');
var ScatterChart = require('./scatterChart_view');
var AjaxRequest = require( '../services/ajax_request.js' );

var DetailsPage = function( refresh ) {
    this.data = null;
    this.refresh = refresh;

    //grab dom elements
    portfolioViewSelect = document.querySelector('#portfolio-list')
    portfolioView = new PortfolioView( this.refresh, portfolioViewSelect );
    scatterChartContainer = document.querySelector( '#scatterChart')
    scatterChart = new ScatterChart( this.refresh, scatterChartContainer );


    var addShareButton = document.querySelector( "#add-share" );
    addShareButton.addEventListener( "click", this.addShares.bind(this) );

}

DetailsPage.prototype.render = function(){
    portfolioView.setData( this.data );
    scatterChart.setData( this.data );
    portfolioView.render();
    scatterChart.render();
}

DetailsPage.prototype.setData = function( data ){
    this.data = data;
}

DetailsPage.prototype.addShares = function(){
    var newName = document.querySelector( "#new-name" );
    var newEpicText = document.querySelector( "#new-epic" );
    var newNumber = document.querySelector( "#new-number" );
    var newBuyPrice = document.querySelector( "#new-buy-price" );
    var newShare = {
        "name": newName.value,
        "epic": newEpicText.value,
        "price": newBuyPrice.value,
        "quantity": newNumber.value,
        "buyPrice": newBuyPrice.value,
        "buyDate": new Date().toISOString().split('T')[0]
    }
    console.log( newShare );
    var postShare = new AjaxRequest( "http://localhost:3001/api/portfolio" );
    console.log( "this.refresh in addShares", this );
    postShare.post( newShare, this.refresh );

}

module.exports = DetailsPage;