google.load('visualization', '1', {packages: ['annotatedtimeline']});
function drawVisualization() {
	var data = new google.visualization.DataTable();
	data.addColumn('date', 'Date');
	data.addColumn('number', 'Actual High');
	data.addColumn('number', 'One Day Forcasted High');
	data.addColumn('number', 'Three Day Forcasted High');
	var rowList = []
	for (r in rows){
		var day=[]
		day.push(new Date(rows[r]['recorded_on']+" 00:00:00"))
		day.push(rows[r]['hightemp'])
		day.push(rows[r]['one_day_high'])
		day.push(rows[r]['three_day_high'])
		rowList.push(day)
	}
    
	data.addRows(rowList);

	var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
      document.getElementById('visualization'));
	annotatedtimeline.draw(data, {'displayAnnotations': true,
                                  'colors':['#4960C0','#858585','#C0494D','#C0BC49'] });
  
  
	actualavg = 0;
	onedayavg = 0;
	threedayavg = 0;
	for (var i = 0; i < rows.length; i ++){
		actualavg += rows[i]['hightemp']
		onedayavg += rows[i]['one_day_high']
		threedayavg += rows[i]['three_day_high']
	}
	
	actualavg = Math.round(actualavg/rows.length)
	onedayavg = Math.round(onedayavg/rows.length)
	threedayavg = Math.round(threedayavg/rows.length)
	
	$("#actualhigh").html(actualavg);
	$("#onedayhigh").html(onedayavg);
	$("#threedayhigh").html(threedayavg);
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
	var url = "/weathertrendz/ajax/getForcastedData";
	var zcode = $("#zipcodes").val();
	
	var start_date = new Date($("#start_date").val() + " 00:00:00");
	var end_date = new Date($("#end_date").val() + " 00:00:00");
	
	if (!isValidDate(start_date)){
		showErrorMessage("Start Date is not a valid date!");
		return;
	}
	if (!isValidDate(end_date)){
		showErrorMessage("End Date is not a valid date!");
		return;
	}
	if (start_date > end_date){
		showErrorMessge("The Start Date is greater than the End Date!!");
		return;
	}
	$("#error_banner").hide();
	
	$.getJSON(url, {'zip_code':zcode, 'start_date': getJSONDateString(start_date), 'end_date': getJSONDateString(end_date)}, function(data){
		rows = data;
		drawVisualization();
	});
}
