google.load('visualization', '1', {packages: ['corechart']});
google.load('visualization', '1', {packages: ['corechart']});
function highestSnowfall() {
    // Create and populate the data table.
    
    var rowList = [['Year', 'Inches of Snowfall']];
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
            console.log(currentYear);
        };
        precip= rows[r]['snowfall'];

        if (precip>highest){
            highest = precip
            console.log
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
    
    var rowList = [['Year', 'Inches of Snowfall']];
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
            console.log(currentYear);
        };
        precip= rows[r]['snowfall'];
        if (precip > 0){
            console.log(precip);
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

google.setOnLoadCallback(totalSnowfall);

google.setOnLoadCallback(highestSnowfall);
