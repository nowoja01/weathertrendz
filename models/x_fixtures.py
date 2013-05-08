# coding: utf8
import datetime
import yaml
import os

cwd = os.getcwd()
filepath = os.path.join(cwd, "applications/weathertrendz/private/data.yaml")
print filepath

data = yaml.load(open(filepath, 'r'))

if db(db.Readings.id > 0).count() == 0:

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