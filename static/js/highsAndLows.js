
google.load('visualization', '1', {packages: ['annotatedtimeline']});
function drawVisualization() {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Low Temp');
  data.addColumn('string', 'title1');
  data.addColumn('string', 'text1');
  data.addColumn('number', 'High Temp');
  data.addColumn('string', 'title2');
  data.addColumn('string', 'text2');
  var rowList = []
  for (r in rows){
    var day=[]
    day.push(new Date(rows[r]['recorded_on']+" 00:00:00"))
    day.push(rows[r]['lowtemp'])
    day.push(null)
    day.push(null)
    day.push(rows[r]['hightemp'])
    day.push(null)
    day.push(null)
    rowList.push(day)
  }
    
  data.addRows(rowList);

  var timeLine = new google.visualization.ChartWrapper({
      'chartType': 'AnnotatedTimeLine',
      'containerId': 'visualization',

  });
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
	var url = "/weathertrendz/ajax/getHighLowData";
	
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
		showErrorMessage("The Start Date is greater than the End Date!!");
		return;
	}
	$("#error_banner").hide();
	
	$.getJSON(url, {'start_date': getJSONDateString(start_date), 'end_date': getJSONDateString(end_date)}, function(data){
		rows = data;
		drawVisualization();
		
		highavg = 0;
		lowavg = 0;
		for (var i = 0; i < rows.length; i ++){
			highavg += rows[i]['hightemp']
			lowavg += rows[i]['lowtemp']
		}
		
		highavg = Math.round(highavg/rows.length)
		lowavg = Math.round(lowavg/rows.length)
		
		$("#highavg").html(highavg);
		$("#lowavg").html(lowavg);
	});

}

