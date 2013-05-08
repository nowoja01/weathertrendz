# coding: utf8
db.define_table('Readings',
     Field('recorded_on', 'date'),
     Field('hightemp','integer'),
     Field('lowtemp','integer'),
     Field('precipitation', 'integer'),
     Field('snowfall','integer'),
     migrate=True
 )
