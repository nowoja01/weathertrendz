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
        pass

p = Parser()
p.parseBernatzData()