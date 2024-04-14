import os
import csv
import string

'''
Columns are letters
Rows are numbers-1
'''

def letter_to_index(letter):
    alphabet = list(string.ascii_uppercase)
    extended_alphabet = ["AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP"]
    for i in extended_alphabet:
        alphabet.append(i)
    return alphabet.index(letter)

def check_prof(prof):
    if prof == "ã€‡":
        return "Not Proficient"
    else:
        return "Proficient"

def get_csv_names():
    entires = os.listdir("csv/")
    return entires

def get_data():
    csv_file = "csv/" + get_csv_names()[0]
    csv_data = []
    with open(csv_file, mode ='r') as file:
        csvFile = csv.reader(file)
        for lines in csvFile:
            csv_data.append(lines)
    # row = 6
    # column = letter_to_index("C")
    # print(csv_data[row-1][column])
    return csv_data

def get_skill_details(csv_data):
    saving_throws = {}
    skills = {}
    start_row, column_prof, column_mod, column_mod_name = 17, letter_to_index("H"), letter_to_index("I"), letter_to_index("J")
    start_row -= 1 # Sets it to the right column (want to start at 16 not 17)
    for i in range(0, 6):
        prof = check_prof(csv_data[start_row][column_prof])
        modifier = csv_data[start_row][column_mod]
        saving_throws[csv_data[start_row][column_mod_name]] = {prof, modifier}
        start_row += 1
    
    start_row = 24 # Column 25
    for i in range(0, 17):
        prof = check_prof(csv_data[start_row][column_prof])
        modifier = csv_data[start_row][column_mod]
        skills[csv_data[start_row][column_mod_name]] = {prof, modifier}
        start_row += 1
        
    return (saving_throws, skills)

def get_details(csv_data):
    pass

def get_spells(csv_data):
    pass

data = get_data()
skill_detail_tuple = get_skill_details(data)
print(skill_detail_tuple)