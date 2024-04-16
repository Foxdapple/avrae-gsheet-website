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

def get_description(csv_data):
    starting_column = letter_to_index("C")
    row_one = 147 # row 148 on sheet
    row_two = 149 # row 150 on sheet
    json_info = {}
    for i in range(0, 4):
        json_info[csv_data[row_one+1][starting_column]] = csv_data[row_one][starting_column]
        json_info[csv_data[row_two+1][starting_column]] = csv_data[row_two][starting_column]
        starting_column += 3
    return json_info

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

def remove_empty_rows_from_list(list_given):
    for i in range(len(list_given)-1,-1,-1):
        if list_given[i] == "":
            list_given.remove(list_given[i])
    return list_given

def get_spell_names(csv_data, level, starting_row):
    first_column = letter_to_index("D")
    second_column = letter_to_index("N")
    third_column = letter_to_index("X")
    fourth_column = letter_to_index("AH")
    if level % 2 == 0:
        first_column = fourth_column
    temp_spells = []
    if level in [1, 2, 3]:
        rows = 5
    elif level in [4, 5, 6]:
        rows = 4
    else:
        rows = 3
    for i in range(0, rows):
        spell_one = csv_data[starting_row][first_column]
        spell_two = csv_data[starting_row][second_column]
        spell_three = csv_data[starting_row][third_column]
        print(spell_one, spell_two, spell_three)
        # print(first_column)
        if level % 2 == 0:
            temp_spells.append(spell_two)
            temp_spells.append(spell_three)
            temp_spells.append(spell_one)
        else:
            temp_spells.append(spell_one)
            temp_spells.append(spell_two)
            temp_spells.append(spell_three)
        starting_row += 1
    return (remove_empty_rows_from_list(temp_spells), starting_row)

def get_spells(csv_data):
    first_column = letter_to_index("D")
    second_column = letter_to_index("U")
    # third_column = letter_to_index("X")
    # fourth_column = letter_to_index("AH")
    casting_class = csv_data[90][first_column]
    dc = csv_data[90][second_column]
    casting_ability = csv_data[90][letter_to_index("AB")]
    bonus = csv_data[90][letter_to_index("AI")]
    spells = {}
    spells["Details"] = {"Class": casting_class, "Save DC": dc, "Ability": casting_ability, "Attack Bonus": bonus, "Spells": {}}
    starting_row = 95 # row 96 on sheet 
    for spell_level in range(0, 10):
        temp_spells, starting_row = get_spell_names(csv_data, spell_level, starting_row)
        spells["Details"]["Spells"][str(spell_level)] = temp_spells
        starting_row += 1

    
    return spells

def create_details(csv_data):
    character = get_details(csv_data)
    character_name = list(character.keys())[0] # gets the name of the character
    stats = get_ability_modifiers(csv_data)
    character[character_name]["Stats"] = {}
    for stat_name, stat_details in stats.items():
        character[character_name]["Stats"][stat_name] = stat_details
    skills = get_skill_details(csv_data)
    character[character_name]["Saving Throws"] = skills[0]
    character[character_name]["Skills"] = skills[1]
    character[character_name]["Casting"] = get_spells(csv_data)
    character[character_name]["Description"] = get_description(csv_data)
    
    create_json(character, character_name)
    
def create_json(character, name):
    print(character)
    with open(name + ".json", "w") as outfile:
        json.dump(character, outfile)

data = get_data()
# get_description(data)
# get_spells(data)
create_details(data)
# skill_detail_tuple = get_skill_details(data)
# print(skill_detail_tuple)