import datetime
import yaml

class Parser:
    def __init__(self):
        pass

    def parseBernatzData(self):
        path = "../Weather/"
        filenames = ["shtmax%s.txt","shtmin%s.txt","shtpre%s.txt","shtsno_b%s.txt"]
        readings = {}

        for i in range(1, 13):
            monthnum = str(i)
            if i < 10:
                monthnum = "0" + monthnum

            foldername = "month" + monthnum + "/"

            for item in filenames:
                name = item.replace("%s",monthnum)
                filepath = path + foldername + name
                with open(filepath) as f:
                    lines = f.readlines()
                    for line in lines:
                        data = line.split()
                        year = data[0]
                        for day in range(1, len(data[1:]) + 1):
                            date = datetime.date(int(year), int(monthnum), day).isoformat()
                            if not date in readings:
                                readings[date] = {}
                            prefix = name[3:6]
                            readings[date][prefix] = data[day]

        with open('data.yaml', 'w') as f:
            data = yaml.dump(readings)
            f.write(data)


    def parseMarcusData(self):
        filenames = ["daily_actual2013-05-09.csv", "daily_forecast2013-05-09.csv"]

        readings = {}

        with open(filenames[0], 'r') as f:
            lines = f.readlines()
            for line in lines:
                if line != "":
                    ldata = line.split(',')
                    zcode = ldata[0]
                    rdate = ldata[3]
                    high = ldata[4]
                    precip  = ldata[5] if ldata[5] != "" else 0.0
                    if zcode not in readings:
                        readings[zcode] = {}
                    readings[zcode][rdate] = {"high":high,"precip":precip}

        with open(filenames[1], 'r') as f:
            lines = f.readlines()
            for line in lines:
                if line != "":
                    ldata = line.split(',')
                    zcode = ldata[0]
                    cdate = ldata[2]
                    fdate = ldata[3]
                    fhigh = ldata[4] if ldata[4] != "" else None
                    pop = ldata[5] if ldata[5] != "" else None
                    if zcode in readings and fdate in readings[zcode]:
                        readings[zcode][fdate]["pop"] = pop

                        cd = datetime.datetime.strptime(cdate, "%Y-%m-%d").date()
                        fd = datetime.datetime.strptime(fdate, "%Y-%m-%d").date()
                        delta = fd - cd
                        if delta.days == 1:
                            readings[zcode][fdate]["one_day_high"] = fhigh
                        else:
                            readings[zcode][fdate]["three_day_high"] = fhigh


        for zcode in readings:
            datestodel = []
            for date in readings[zcode]:
                keys = ['high', 'pop', 'precip', 'one_day_high', 'three_day_high']
                for key in keys:
                    if key not in readings[zcode][date] or (key in readings[zcode][date] and readings[zcode][date][key] == None):
                        datestodel.append(date)
                        break

            for date in datestodel:
                readings[zcode].pop(date, None)


        with open('marcus-data.yaml', 'w') as f:
            data = yaml.dump(readings)
            f.write(data)

    def parseBernatzDataForHighPrediction(self):
        inputfile = "data.yaml"
        outputfile = "bernatz_highs.txt"
        data = yaml.load(open(inputfile, 'r'))
        keys = data.keys()
        keys.sort()
        outputstring = ""
        for key in keys:
            wdata = data[key]
            addToList = True
            for item in wdata:
                if wdata[item] == "-99" or wdata[item] == "-9900":
                    addToList = False
            if not addToList:
                continue
            year, month, day = key.split('-')
            outputstring = outputstring + wdata['max'] + "," + year + "," + month + "," + day + "\n"

        with open(outputfile, "w+") as f:
            f.write(outputstring)


p = Parser()
#p.parseBernatzData()
p.parseMarcusData()
#p.parseBernatzDataForHighPrediction()