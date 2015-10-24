import csv
from datetime import datetime
from pytz import timezone
from dateutil import parser

def formatTime(timestamp):
	formatted_time = datetime.strptime(timestamp, "%Y-%m-%dT%H:%M:%S+00:00")
	return formatted_time

def getTimeDiff(current, prev):
	return (current - prev).seconds

def formatVal(val):
	return float("{0:.1f}".format(float(val)))

def formatRow(row):
	
	timestamp = row[0]
	ambient_temp = formatVal(row[1])
	fridge_temp = formatVal(row[2])
	switch = row[3]
	power = formatVal(row[4])
	output_row = [timestamp, ambient_temp, fridge_temp, switch, power]
	return output_row
	
with open('data/NetFridgeData.csv', 'rU') as input_csv:
	input_data = csv.reader(input_csv, delimiter=',', quotechar='"')
	with open('data/sampleData.csv', 'w') as output_csv:
		writer = csv.writer(output_csv, delimiter=',', quotechar='"')
		
		header = next(input_data, None)
		writer.writerow(header)

		first_row = next(input_data, None)
		first_row = formatRow(first_row)
		writer.writerow(first_row)
		prev_time = formatTime(first_row[0])
		for row in input_data:
			row = formatRow(row)
			timestamp = row[0]
			current_time = formatTime(timestamp)		
			if getTimeDiff(current_time, prev_time) >= 60:
				writer.writerow(row)
				prev_time = current_time


