'''
ToDo:

    Find out proficiency symbols <- figure out easiest way to do this
    Make it easy to add information to the gsheet
'''

a_json = {
    "Mraess Equirrion": {
        "Level": "8",
        "Race": "Gold Dragonborn",
        "classes/levels": [],
        "HP": "60",
        "AC": "17",
        "Init": "+4",
        "Speed": "30 ft",
        "Languages": [],
        "Stats": {},
        "Skills": {},
        "Casting": {},
        "Description": {}
    }
}


def get_character_name(json):
    return list(json.keys())[0]

print(get_character_name(a_json))