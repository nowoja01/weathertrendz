google.load('visualization', '1', {packages: ['corechart']});
google.load('visualization', '1', {packages: ['corechart']});
function highestSnowfall() {
    // Create and populate the data table.
    
    var rowList = [['Year', 'Snowfall in Inches']];
    var currentYear = 0;
    var highest = 0;
    for (r in rows){
        var date= new Date(rows[r]['recorded_on']+" 00:00:00");
        var rYear = date.getFullYear();
        if (currentYear != rYear){
            if (currentYear != 0){
                rowList.push([String(currentYear),highest]);
                highest = 0;
            }; 
            currentYear = rYear;
        };
        precip= rows[r]['snowfall'];

        if (precip>highest){
            highest = precip
        };

    };
    rowList.push([String(currentYear),highest]);
    var data = google.visualization.arrayToDataTable(rowList);

    // Create and draw the visualization.
    new google.visualization.ColumnChart(document.getElementById('highs')).
       draw(data,
           {title:"Yearly Snowfall Highs",
            width:700, height:400,
            hAxis: {title: "Year"}}
       );
}



function totalSnowfall() {
    // Create and populate the data table.
    
    var rowList = [['Year', 'Snowfall in Inches']];
    var currentYear = 0;
    var total = 0;
    for (r in rows){
        var date= new Date(rows[r]['recorded_on']+" 00:00:00");
        var rYear = date.getFullYear();
        if (currentYear != rYear){
            if (currentYear != 0){
                rowList.push([String(currentYear),total]);
                total = 0;
            }; 
            currentYear = rYear;
        };
        precip= rows[r]['snowfall'];
        if (precip > 0){
            total += precip;
        };
    };
    rowList.push([String(currentYear),total]);
    var data = google.visualization.arrayToDataTable(rowList);

    // Create and draw the visualization.
    new google.visualization.ColumnChart(document.getElementById('totals')).
       draw(data,
           {title:"Yearly Snowfall Totals",
            width:700, height:400,
            hAxis: {title: "Year"}}
       );
}
function DrawVisualizations(){
    totalSnowfall();
    highestSnowfall();
}

google.setOnLoadCallback(DrawVisualizations);

function isValidDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}

function showErrorMessage(msg){
	$("#error_banner").html(msg).slideDown();
}

function getJSONDateString(date){
	return date.getUTCFullYear() + "-" + (date.getUTCMonth()+1) + "-" + date.getUTCDate()
}

function updateData(){
	var url = "/weathertrendz/ajax/getSnowfallData";
	
	var start_date = new Date($("#start_date").val() + " 00:00:00");
	var end_date = new Date($("#end_date").val() + " 00:00:00");
	
	if (!isValidDate(start_date)){
		showErrorMessage("Start Date is not a valid date!");
		return;
	}
	if (!isValidDate(start_date)){
		showErrorMessage("End Date is not a valid date!");
		return;
	}
	if (start_date > end_date){
		showErrorMessage("The Start Date is greater than the End Date!!");
		return;
	}
	$("#error_banner").hide();
	
	$.getJSON(url, {'start_date': getJSONDateString(start_date), 'end_date': getJSONDateString(end_date)}, function(data){
		rows = data;
		DrawVisualizations();
		
	});

}


