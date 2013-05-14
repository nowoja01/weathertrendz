## coding: utf8
import datetime
import yaml
import os

cwd = os.getcwd()
filepath = os.path.join(cwd, "applications/weathertrendz/private/data.yaml")

if db(db.Readings.id > 0).count() == 0:
    data = yaml.load(open(filepath, 'r'))
    keys = data.keys()
    keys.sort()
    for key in keys:
        high = int(data[key]['max'])
        low = int(data[key]['min'])
        precip = int(data[key]['pre'])
        snow = int(data[key]['sno'])
        db.Readings.insert(
            recorded_on=datetime.datetime.strptime(key, "%Y-%m-%d").date(),
            hightemp=high if high != -99 and high != -9900 else None,
            lowtemp=low if low != -99 and low != -9900 else None,
            precipitation=precip if precip != -99 and precip != -9900 else None,
            snowfall=snow if snow != -99 and snow != -9900 else None,
       )


filepath = os.path.join(cwd, "applications/weathertrendz/private/marcus-data.yaml")

if db(db.DailyForcastedReadings.id > 0).count() == 0:
    data = yaml.load(open(filepath, 'r'))
    for zcode in data:
        dates = data[zcode]
        keys = dates.keys()
        keys.sort()
        for date in keys:
            high = data[zcode][date]['high']
            pop = data[zcode][date]['pop']
            precip = data[zcode][date]['precip']
            one_day_high = data[zcode][date]['one_day_high']
            three_day_high = data[zcode][date]['three_day_high']

            db.DailyForcastedReadings.insert(
                recorded_on=datetime.datetime.strptime(date, "%Y-%m-%d").date(),
                zip_code=int(zcode),
                hightemp=int(float(high)) if high else None,
                precipitation=float(precip) if precip else 0.0,
                probability_of_precip=int(pop) if pop else None,
                one_day_high=int(one_day_high) if one_day_high else None,
                three_day_high=int(three_day_high) if three_day_high else None
           )
