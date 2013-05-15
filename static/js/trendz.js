google.load('visualization', '1', {packages: ['annotatedtimeline', 'corechart']});
function drawTempVisualization() {
	keytocol = {'recorded_on': {'type':'date', 'name':"Date"},'hightemp':{'type':'number', 'name':"High"},'lowtemp':{'type':'number', 'name':"Low"}};
	keys = ['recorded_on', 'hightemp', 'lowtemp'];
	
	var data = new google.visualization.DataTable();
	for (k in keys){
		key = keys[k];
		data.addColumn(keytocol[key]['type'], keytocol[key]['name']);
	}
	
	var highavg = 0;
	var rechigh = -99;
	var lowavg = 0;
	var reclow = 1000;
	
	var rowList = []
	for (r in rows){
		row = rows[r];
		var day=[];
		for (k in keys){
			key = keys[k];
			if (key === 'recorded_on'){
				day.push(new Date(row[key]+" 00:00:00"));
			}else{
				day.push(row[key]);
				if(key === 'hightemp'){
					if (row[key] > rechigh){rechigh = row[key];}
					highavg += row[key];
				}
				if(key === 'lowtemp'){
					if(row[key] < reclow){reclow = row[key];}
					lowavg += row[key]
				}
			}
		}
		rowList.push(day);
	}
	data.addRows(rowList);

	var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
      document.getElementById('tempvisualization'));
	annotatedtimeline.draw(data, {'title':"Highs and Lows",'displayAnnotations': true,'colors':['#4960C0','#C0494D','#C0BC49','#858585']});
	
	$("#highavg").html(Math.round(highavg/rows.length));
	$("#recordhigh").html(rechigh);
	$("#lowavg").html(Math.round(lowavg/rows.length));
	$("#recordlow").html(reclow);
}

function drawPrecipVisualization() {
	keytocol = {'recorded_on': {'type':'date', 'name':"Date"}, 'precipitation':{'type':'number', 'name':"Precipitation"},'snowfall':{'type':'number', 'name':"Snow"}};
	keys = ['recorded_on', 'precipitation', 'snowfall'];
	
	var data = new google.visualization.DataTable();
	for (k in keys){
		key = keys[k];
		data.addColumn(keytocol[key]['type'], keytocol[key]['name']);
	}
	var recrain = -1;
	var recsnow = -1;
	
	var rowList = []
	for (r in rows){
		row = rows[r];
		var day=[];
		for (k in keys){
			key = keys[k];
			if (key === 'recorded_on'){
				day.push(new Date(row[key]+" 00:00:00"));
			}else if(key==='precipitation'){
				var rain = row[key] / 100;
				day.push(rain);
				if(rain > recrain){recrain = rain;}
			}else{
				day.push(row[key]);
				if(row[key] > recsnow){recsnow = row[key];}
			}
		}
		rowList.push(day);
	}
    
	data.addRows(rowList);

	var chart = new google.visualization.ScatterChart(
        document.getElementById('precipvisualization'));
    chart.draw(data, {title: "Precipitation and Snowfall",
					  vAxis: {title: "Tempurature (Fahrenheit)", titleTextStyle: {color: 'black'}},
                      hAxis: {title: "Date", titleTextStyle: {color: 'black'}},
                      'colors':['#4960C0','#858585','#C0494D','#C0BC49']}
              );
	
	
	//var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
	//document.getElementById('precipvisualization'));
	//annotatedtimeline.draw(data, {'displayAnnotations': true});
	
	$("#recordrain").html(recrain);
	$("#recordsnow").html(recsnow);
}

function drawVisualization(){
	drawTempVisualization();
	drawPrecipVisualization();
}

google.setOnLoadCallback(drawVisualization);

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
	var url = "/weathertrendz/ajax/getDayReadingData";
	
	var trending_date = new Date($("#trending_date").val() + " 00:00:00");
	var year_range = $("#yearsback").val();
	
	if (!isValidDate(trending_date)){
		showErrorMessage("Start Date is not a valid date!");
		return;
	}
	$("#error_banner").hide();
	
	$.getJSON(url, {'date': getJSONDateString(trending_date), 'year_range': year_range}, function(data){
		rows = data;
		drawVisualization();
	});

}
