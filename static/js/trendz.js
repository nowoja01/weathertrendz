google.load('visualization', '1', {packages: ['annotatedtimeline']});
function drawVisualization() {

	//Do future check against selected checkboxes
	
	keytocol = {'recorded_on': {'type':'date', 'name':"Date"}, 'hightemp':{'type':'number', 'name':"High"},
				 'lowtemp':{'type':'number', 'name':"Low"}, 'precipitation':{'type':'number', 'name':"Precipitation"},
				 'snowfall':{'type':'number', 'name':"Snow"}};
	keys = ['recorded_on', 'hightemp', 'lowtemp', 'precipitation', 'snowfall'];
	
	var data = new google.visualization.DataTable();
	for (k in keys){
		key = keys[k];
		data.addColumn(keytocol[key]['type'], keytocol[key]['name']);
	}
	
	
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
			}
		}
		rowList.push(day);
	}
    
	data.addRows(rowList);

	var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
      document.getElementById('visualization'));
	annotatedtimeline.draw(data, {'displayAnnotations': true});
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
