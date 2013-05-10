# coding: utf8
# try something like
from datetime import date
from ReadingsProvider import *
def index():
    rows = getReadingsInRange(db, date(2012,9,1), date(2012,9,30))
    return dict(rows=rows)