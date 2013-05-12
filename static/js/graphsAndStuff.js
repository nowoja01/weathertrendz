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

  var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
      document.getElementById('visualization'));
  annotatedtimeline.draw(data, {'displayAnnotations': true});
}

    
google.setOnLoadCallback(drawVisualization);
