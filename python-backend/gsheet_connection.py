import os
import csv
import string
import json

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
        saving_throws[csv_data[start_row][column_mod_name]] = {"Prof": prof, "Mod": modifier}
        start_row += 1
    
    start_row = 24 # Column 25
    for i in range(0, 17):
        prof = check_prof(csv_data[start_row][column_prof])
        modifier = csv_data[start_row][column_mod]
        skills[csv_data[start_row][column_mod_name]] = {"Prof": prof, "Mod": modifier}
        start_row += 1
        
    return [saving_throws, skills]

def get_details(csv_data):
    character = {}
    name_column = letter_to_index("C")
    race_class_column = letter_to_index("T")
    total_level_column = letter_to_index("AL")
    hp_column = letter_to_index("R")
    ac_column = letter_to_index("R")
    init_column = letter_to_index("V")
    speed_column = letter_to_index("Z")
    
    character_name = csv_data[5][name_column]
    character_level = csv_data[5][total_level_column]
    character_race = csv_data[6][race_class_column]
    character_class_levels = csv_data[4][race_class_column]
    character_hp = csv_data[16][hp_column]
    character_ac = csv_data[11][ac_column]
    character_init = csv_data[11][init_column]
    character_speed = csv_data[11][speed_column]
    
    character[character_name] = {"Level": character_level, "Race": character_race, "classes/levels": character_class_levels, "HP": character_hp, 
                                 "AC": character_ac, "Init": character_init, "Speed": character_speed}
    return character

def get_spells(csv_data):
    pass

def get_ability_modifiers(csv_data):
    column = letter_to_index("C")
    row = 11 # row 12 on sheet
    stats = {}
    for i in range(0, 6):
        stat_name = csv_data[row][column]
        modifier_amount = csv_data[row+1][column]
        stat_total = csv_data[row+3][column]
        stats[stat_name] = {"Total": stat_total, "Modifier": modifier_amount}
        row += 5
    return stats

def create_details(csv_data):
    character = get_details(csv_data)
    character_name = list(character.keys())[0] # gets the name of the character
    stats = get_ability_modifiers(csv_data)
    for stat_name, stat_details in stats.items():
        character[character_name][stat_name] = stat_details
    skills = get_skill_details(csv_data)
    character[character_name]["Saving Throws"] = skills[0]
    character[character_name]["Skills"] = skills[1]
    
    create_json(character, character_name)
    
def create_json(character, name):
    print(character)
    
    with open(name + ".json", "w") as outfile:
        json.dump(character, outfile)

data = get_data()
create_details(data)
# skill_detail_tuple = get_skill_details(data)
# print(skill_detail_tuple)