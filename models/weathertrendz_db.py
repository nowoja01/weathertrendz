# coding: utf8
db.define_table('Readings',
     Field('recorded_on', 'date'),
     Field('hightemp','integer'),
     Field('lowtemp','integer'),
     Field('precipitation', 'integer'),
     Field('snowfall','integer'),
     migrate=True
 )

db.define_table('DailyForcastedReadings',
     Field('recorded_on','date'),
     Field('zip_code', 'integer'),
     Field('hightemp','integer'),
     Field('precipitation', 'double'),
     Field('probability_of_precip', 'integer'),
     Field('one_day_high', 'integer'),
     Field('three_day_high', 'integer'),
     migrate=True
 )

#db.define_table('HourlyForcastedReadings',
     #Field('recorded_on','date'),
     #Field('zip_code', 'integer'),
     #migrate=True
 #)
