from datetime import date
from ReadingsProvider import *

#This function is to be used be web2py ajax
def getForcastedData():
    #start_date=date(2012,9,1)
    #end_date=date(2012,9,30)
    zip_code = request.get_vars['zip_code']
    start_date = request.get_vars['start_date']
    end_date = request.get_vars['end_date']

    rows = getDailyForcastedReadingsInRange(db, zip_code, start_date, end_date)
    rowslist = rows.as_list()
    return response.json(rowslist)