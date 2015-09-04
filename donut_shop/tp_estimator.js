(function(){
  //declare all the variables and the column headers.
  var open, close, locationList, newStoreButton, hoursButton, tableInit;
  open  = 7;
  close = 18;

  //Shop object constructor with prototype methods for determining a random
  //customer per hour count, and based on that the donuts needed per hour and
  //per day. The results of these methods are then used in the render and
  //tableInit function to write a table to the index.html page dynamically.
  function Shop(minCustHour, maxCustHour, donutPerCust, locationName){
    this.minCustPerHour  = minCustHour;
    this.maxCustPerHour  = maxCustHour;
    this.avgDonutPerCust = donutPerCust;
    this.locationName    = locationName;
    this.byHour          = [];
  }

  //Creates a random number of customers per hour between min and max
  Shop.prototype.custPerHour = function(){
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
  };

  //calculate hourly donuts sold base on customers per hour and average sold per customer.
  Shop.prototype.hourlyDonuts = function() {
    return parseInt((this.avgDonutPerCust * this.custPerHour(this.minCustPerHour, this.maxCustPerHour)));
  };

  //Calculates the daily donuts needed by calling the hourly method for each hour
  //the store is open. It stores each of the hourly calls in an array for reference
  //in the render method. And then stores the total to the object.
  //Open and close times need to be in military time rounded to nearest hour.
  Shop.prototype.dailyDonuts = function(open, close) {
    var total     = 0;
    var hoursOpen = close - open;
    for (var i = hoursOpen; i > 0; i--) {
      this.byHour[i]  = this.hourlyDonuts();
      total          += this.byHour[i];
    }
    this.byHour[0] = total;
  };

  //Creates a row on the table for each object call. The first element is the
  //location name in a <th> element tag. The rest are iterated over and stored
  //in <td> elements. The row is then appended to the table.
  Shop.prototype.render = function() {
    var table    = document.getElementById('table-body');
    var row      = document.createElement('tr');
    var cell     = document.createElement('th');
    var cellText = document.createTextNode(this.locationName);
    cell.appendChild(cellText);
    row.appendChild(cell);
    for (var i = this.byHour.length - 1; i >= 0; i--) {
      cell       = document.createElement('td');
      cellText   = document.createTextNode(this.byHour[i]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    table.appendChild(row);
  };

  //Initializes the table given and open and closing time in military time.
  //Creates and array and converts to nonmilitary time.
  tableInit = function(open, close) {
    var tableValues       = [];
    var table             = document.getElementById('table-body');
    var tableHead         = document.getElementById('table-head');
    tableHead.textContent = '';
    table.textContent     = '';
    var row               = document.createElement('tr');
    for(var j = 0; j < close - open; j++) {
      var time = (j + open + 1);
      if (time <= 12){
        tableValues[j] = time + ':00am ';
      } else {
        tableValues[j] = (time - 12) + ':00pm';
      }
    }
    tableValues.unshift(' ');
    tableValues.push('Total');
    for (var i = 0; i < tableValues.length; i++) {
      var cell     = document.createElement('th');
      var cellText = document.createTextNode(tableValues[i]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tableHead.appendChild(row);
  };

  var tableBuilder = function(open, close){
    tableInit(open, close);
    for( var i = 0; i < locationList.length; i++){
      locationList[i].dailyDonuts(open, close);
      locationList[i].render();
    }
  };

  //Event listener and functions to add a new store object, and to change the open
  //and close times building a new table.
  var getHours = function() {
    open = parseInt(document.getElementById('open').value);
    close = parseInt(document.getElementById('close').value);
    tableBuilder(open, close);
  };

  var updateCreate = function() {
    var locationFull = document.getElementById('location').value;
    var missing = 0;
    for (var i = 0; i < locationList.length; i++) {
      if(locationList[i].locationName == locationFull) {
        updateInfo();
      } else {
        missing ++;
      }
    }
    if (missing == locationList.length) {
      createNew();
    }
  };

  var createNew = function() {
    var locationFull = document.getElementById('location').value;
    var minCustPerHour = parseInt(document.getElementById('min-cust-hour').value);
    var maxCustPerHour = parseInt(document.getElementById('max-cust-hour').value);
    var donutPerCust = parseInt(document.getElementById('donut-cust').value);
    var location = new Shop(minCustPerHour, maxCustPerHour, donutPerCust, locationFull);
    locationList.unshift(location);
    locationList[0].dailyDonuts(open, close);
    locationList[0].render();
  };

  var updateInfo = function() {
    var locationFull = document.getElementById('location').value;
    var minCustPerHour = parseInt(document.getElementById('min-cust-hour').value);
    var maxCustPerHour = parseInt(document.getElementById('max-cust-hour').value);
    var donutPerCust = parseInt(document.getElementById('donut-cust').value);
    for (var i = 0; i < locationList.length; i++) {
      if(locationList[i].locationName == locationFull) {
        locationList[i].minCustPerHour  = minCustPerHour;
        locationList[i].maxCustPerHour  = maxCustPerHour;
        locationList[i].avgDonutPerCust = donutPerCust;
        locationList[i].locationName    = locationFull;
        tableBuilder(open, close);
      }
    }
  };

  hoursButton = document.getElementById('submit-hours');
  hoursButton.addEventListener('click', getHours, false);

  newStoreButton = document.getElementById('submit-new-store');
  newStoreButton.addEventListener('click', updateCreate, false);

  //Initialize the table and instantiates 5 shop locations.
  locationList = [];
  locationList.push(new Shop(8, 43, 4.50, 'Downtown'));
  locationList.push(new Shop(4, 37, 2.00, 'Capitol Hill'));
  locationList.push(new Shop(9, 23, 6.33, 'South Lake Union'));
  locationList.push(new Shop(2, 28, 1.25, 'Wedgewood'));
  locationList.push(new Shop(8, 58, 3.75, 'Ballard'));

  tableBuilder(open, close);

})();

