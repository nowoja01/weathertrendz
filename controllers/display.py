from datetime import date
from ReadingsProvider import *
from gluon.contrib import simplejson

def base():
    return {}

def graphs():
    rows = getReadingsInRange(db, date(2012,9,1), date(2012,9,30))
    
    return dict(rows=rows.as_list())
