from datetime import date
from ReadingsProvider import *

def base():
    return {}

def highsAndLows():
    rows = getReadingsInRange(db, date(2012,9,1), date(2012,9,30))
    return dict(rows=rows.as_list())

def forcasted():
    rows = getDailyForcastedReadingsInRange(db, 52101, date(2012,9,1), date(2012,9,30))
    zcodes = getDailyForcastedReadingsZipCodes(db)
    return dict(rows=rows.as_list(), zipcodes=zcodes.as_list())
