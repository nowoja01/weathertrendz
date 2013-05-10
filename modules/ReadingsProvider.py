import datetime

def getReadingsInRange(db, start_date, end_date):
    '''start_date and end_date are inclusive
    '''
    if type(start_date) is str:
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_date, "%Y-%m-%d").date()

    rows = db((db.Readings.recorded_on >= start_date) & (db.Readings.recorded_on <= end_date))\
        .select(db.Readings.recorded_on, db.Readings.hightemp, db.Readings.lowtemp, db.Readings.precipitation, db.Readings.snowfall)
    return rows
