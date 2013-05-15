from datetime import datetime

def getReadingsInRange(db, start_date, end_date, *selected_fields):
    '''start_date and end_date are inclusive
    '''
    if type(start_date) is str:
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_date, "%Y-%m-%d").date()

    names = selected_fields if len(selected_fields) > 0 else\
        ['recorded_on', 'hightemp', 'lowtemp', 'precipitation', 'snowfall']
    fields = [db.Readings[name] for name in names]

    rows = db((db.Readings.recorded_on >= start_date) & (db.Readings.recorded_on <= end_date))\
        .select(*fields)
    return rows

def getDayReadingInRange(db, date, year_range):
    if type(date) is str:
        date = datetime.strptime(date, "%Y-%m-%d").date()
    if type(year_range) is str:
        year_range = int(year_range)

    #names = selected_fields if len(selected_fields) > 0 else\
        #['recorded_on', 'hightemp', 'lowtemp', 'precipitation', 'snowfall']
    #fields = [db.Readings[name] for name in names]

    query = db((db.Readings.recorded_on.day() == date.day) & (db.Readings.recorded_on.month() == date.month) &\
            (db.Readings.recorded_on.year() <= date.year) & (db.Readings.recorded_on.year() >= (date.year - year_range)))
    rows = query.select()
    return rows


def getDailyForcastedReadingsInRange(db, zip_code, start_date, end_date, *selected_fields):
    '''start_date and end_date are inclusive
    '''
    if type(start_date) is str:
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_date, "%Y-%m-%d").date()

    names = selected_fields if len(selected_fields) > 0 else \
        ['recorded_on','zip_code','hightemp','precipitation','probability_of_precip','one_day_high','three_day_high']
    fields = [db.DailyForcastedReadings[name] for name in names]

    query = db((db.DailyForcastedReadings.zip_code==zip_code) & (db.DailyForcastedReadings.recorded_on >= start_date) & (db.DailyForcastedReadings.recorded_on <= end_date))
    rows = query.select(*fields)

    return rows


def getDailyForcastedReadingsZipCodes(db):
    names = ['zip_code']
    fields = [db.DailyForcastedReadings[name] for name in names]
    codes = db(db.DailyForcastedReadings.id > 0).select(distinct=db.DailyForcastedReadings.zip_code)
    return codes


def getRecordReadings(db, record, year=None, month=None):
    query = (db.Readings.id > 0)
    if year:
        query = query & (db.Readings.year()==year)
    if month:
        query = query & (db.Readings.month()==month)

    if record == 'high':
        rows = db(query).select(db.Readings.recorded_on, db.Readings.hightemp)
    if record == 'low':
        rows = db(query).select(db.Readings.recorded_on, db.Readings.lowtemp)
    if record == 'precipitation':
        rows = db(query).select(db.Readings.recorded_on, db.Readings.precipitation)
    if record == 'snowfall':
        rows = db(query).select(db.Readings.recorded_on, db.Readings.snowfall)
    return rows
