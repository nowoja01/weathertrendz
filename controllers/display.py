from datetime import date
from ReadingsProvider import *

def base():
    return {}

def highsAndLows():
    rows = getReadingsInRange(db, date(2012,9,1), date(2012,9,30), 'recorded_on', 'hightemp', 'lowtemp')
    return dict(rows=rows.as_list())

def trendz():
    rows = getDayReadingInRange(db, date(2012,9,5), 15)
    return dict(rows=rows.as_list())

def precipitation():
    rows = getReadingsInRange(db,date(2000,9,1), date(2012,9,30), 'recorded_on', 'precipitation')
    return dict(rows=rows.as_list())

def snowfall():
    rows = getReadingsInRange(db,date(2000,9,1), date(2012,9,30), 'recorded_on', 'snowfall')
    return dict(rows=rows.as_list())

def forcasted():
    rows = getDailyForcastedReadingsInRange(db, 52101, date(2012,9,1), date(2012,9,30))
    zcodes = getDailyForcastedReadingsZipCodes(db)
    return dict(rows=rows.as_list(), zipcodes=zcodes.as_list())
