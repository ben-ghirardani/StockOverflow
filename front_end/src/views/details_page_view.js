var PortfolioView = require('./portfolio_view');
var ScatterChart = require('./scatterChart_view');
var AjaxRequest = require( '../services/ajax_request.js' );

var NewsFeedView = require( './newsfeed_view.js' );

var DetailsPage = function( refresh ) {
    this.data = null;
    this.refresh = refresh;

    //grab dom elements
    portfolioViewSelect = document.querySelector('#portfolio-list');
    portfolioView = new PortfolioView( this.refresh, portfolioViewSelect );
    scatterChartContainer = document.querySelector( '#scatterChart')
    scatterChart = new ScatterChart( this.refresh, scatterChartContainer );
    
    newsViewList = document.querySelector('#news-feed');
    newsView = new NewsFeedView( this.refresh, newsViewList );

    portfolioViewSelect.addEventListener( "change", function( event ){
        scatterChart.setSeries( event.target.value );
        scatterChart.render();
        newsView.setSeries( event.target.value );
        newsView.getNewsData();
    })

    var addShareButton = document.querySelector( "#add-share" );
    addShareButton.addEventListener( "click", this.addShares.bind(this) );

    var deleteButton = document.querySelector( '#remove-share' )
    deleteButton.addEventListener( "click", this.removeShare.bind( this ) );

}

DetailsPage.prototype.render = function(){
    portfolioView.setData( this.data );
    scatterChart.setData( this.data );
    portfolioView.render();
    scatterChart.render();
    newsView.setData( this.data );
    newsView.getNewsData();
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
        "price": null,
        "quantity": Number(newNumber.value),
        "buyPrice": Number(newBuyPrice.value),
        "lastUpdated": new Date(0).toISOString().split('T')[0],
        "pastCloseOfDayPrices": [],
        "buyDate": new Date().toISOString().split('T')[0]
    }
    console.log( newShare );
    var postShare = new AjaxRequest( "http://localhost:3001/api/portfolio" );
    console.log( "this.refresh in addShares", this );
    postShare.post( newShare, this.refresh );

}

DetailsPage.prototype.removeShare = function(){
    var shareIndex = portfolioViewSelect.value;
    var shareIDURL = "http://localhost:3001/api/portfolio/";
    scatterChart.setSeries( shareIndex - 1 );
    newsView.setSeries( shareIndex - 1 );
    shareIDURL += this.data[shareIndex]["_id"];
    var deleteShare = new AjaxRequest( shareIDURL );
    deleteShare.delete( this.refresh );
}

// DetailsPage.prototype.removeShares = function(){
//     portfolioViewSelect.addEventListener( "change", function( event ){
//         var itemToRemove = event.target.value;
//     })
// }

module.exports = DetailsPage;