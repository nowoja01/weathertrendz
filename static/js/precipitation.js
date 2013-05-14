google.load('visualization', '1', {packages: ['corechart']});
function highestPrecipitation() {
    // Create and populate the data table.
    
    var rowList = [['Year', 'Record Precipitation']];
    var currentYear = 0;
    var highest = 0;
    for (r in rows){
        var date= new Date(rows[r]['recorded_on']+" 00:00:00");
        var rYear = date.getFullYear();
        if (currentYear != rYear){
            if (currentYear != 0){
                rowList.push([String(currentYear),highest/100]);
                highest = 0;
            }; 
            currentYear = rYear;
            console.log(currentYear);
        };
        precip= rows[r]['precipitation'];

        if (precip>highest){
            highest = precip
            console.log
        };

    };
    rowList.push([String(currentYear),highest/100]);
    var data = google.visualization.arrayToDataTable(rowList);

    // Create and draw the visualization.
    new google.visualization.ColumnChart(document.getElementById('highs')).
       draw(data,
           {title:"Yearly Precipitation Highs",
            width:700, height:400,
            hAxis: {title: "Year"}}
       );
}



function totalPrecipitation() {
    // Create and populate the data table.
    
    var rowList = [['Year', 'Total Precipitation']];
    var currentYear = 0;
    var total = 0;
    for (r in rows){
        var date= new Date(rows[r]['recorded_on']+" 00:00:00");
        var rYear = date.getFullYear();
        if (currentYear != rYear){
            if (currentYear != 0){
                rowList.push([String(currentYear),total/100]);
                total = 0;
            }; 
            currentYear = rYear;
            console.log(currentYear);
        };
        precip= rows[r]['precipitation'];
        if (precip > 0){
            console.log(precip);
            total += precip;
        };
    };
    rowList.push([String(currentYear),total/100]);
    var data = google.visualization.arrayToDataTable(rowList);

    // Create and draw the visualization.
    new google.visualization.ColumnChart(document.getElementById('totals')).
       draw(data,
           {title:"Yearly Precipitation Totals",
            width:700, height:400,
            hAxis: {title: "Year"}}
       );
}

google.setOnLoadCallback(totalPrecipitation);

google.setOnLoadCallback(highestPrecipitation);

