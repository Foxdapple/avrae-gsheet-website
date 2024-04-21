const getFile = (file_input) => {
    new Response(file_input.files[0]).json().then(json => {
        get_info_from_json(json);
        get_character_name_from_json(json);
      }, err => {
        // not json
      });
}

function get_character_name_from_json(json_input) {
  let character_name = "";
  for(var i in json_input){
    character_name = i;
  }
  return character_name;
}

function get_numbers_for_stats(json_input, character_name){
  return [json_input[character_name]["Stats"]["STR"], 
  json_input[character_name]["Stats"]["DEX"],
  json_input[character_name]["Stats"]["CON"],
  json_input[character_name]["Stats"]["INT"],
  json_input[character_name]["Stats"]["WIS"],
  json_input[character_name]["Stats"]["CHA"]]
}

function set_main_stats(json_input, character_name) {
    const str_stat = document.getElementById("str-stat");
    const dex_stat = document.getElementById("dex-stat");
    const con_stat = document.getElementById("con-stat");
    const int_stat = document.getElementById("int-stat");
    const wis_stat = document.getElementById("wis-stat");
    const cha_stat = document.getElementById("cha-stat");
    let stats = get_numbers_for_stats(json_input, character_name);
    str_stat.innerText = stats[0]["Total"];
    dex_stat.innerText = stats[1]["Total"];
    con_stat.innerText = stats[2]["Total"];
    int_stat.innerText = stats[3]["Total"];
    wis_stat.innerText = stats[4]["Total"];
    cha_stat.innerText = stats[5]["Total"];
    str_stat.style.width = "" + (parseInt(stats[0]["Total"])/20) * 100 + "%";
    dex_stat.style.width = "" + (parseInt(stats[1]["Total"])/20) * 100 + "%";
    con_stat.style.width = "" + (parseInt(stats[2]["Total"])/20) * 100 + "%";
    int_stat.style.width = "" + (parseInt(stats[3]["Total"])/20) * 100 + "%";
    wis_stat.style.width = "" + (parseInt(stats[4]["Total"])/20) * 100 + "%";
    cha_stat.style.width = "" + (parseInt(stats[5]["Total"])/20) * 100 + "%";

    document.getElementById("str-mod").innerText = "Modifier: " + stats[0]["Modifier"];
    document.getElementById("dex-mod").innerText = "Modifier: " + stats[1]["Modifier"];
    document.getElementById("con-mod").innerText = "Modifier: " + stats[2]["Modifier"];
    document.getElementById("int-mod").innerText = "Modifier: " + stats[3]["Modifier"];
    document.getElementById("wis-mod").innerText = "Modifier: " + stats[4]["Modifier"];
    document.getElementById("cha-mod").innerText = "Modifier: " + stats[5]["Modifier"];
}

function get_numbers_for_saving_throws(json_input, character_name){
  return [json_input[character_name]["Saving Throws"]["Strength"], 
  json_input[character_name]["Saving Throws"]["Dexterity"],
  json_input[character_name]["Saving Throws"]["Constitution"],
  json_input[character_name]["Saving Throws"]["Intelligence"],
  json_input[character_name]["Saving Throws"]["Wisdom"],
  json_input[character_name]["Saving Throws"]["Charisma"]]
}

function get_highest_score(saving_throws){
  let biggest_throw = 0;
  for (let i = 0; i < saving_throws.length; i++){
    if (saving_throws[i]["Mod"] > 0) {
      if (saving_throws[i]["Mod"] > biggest_throw){
        biggest_throw = saving_throws[i]["Mod"];
      }
    }
  }
  return parseInt(biggest_throw);
}

function set_saving_throws(json_input, character_name){
  const str_stat = document.getElementById("str-saving");
  const dex_stat = document.getElementById("dex-saving");
  const con_stat = document.getElementById("con-saving");
  const int_stat = document.getElementById("int-saving");
  const wis_stat = document.getElementById("wis-saving");
  const cha_stat = document.getElementById("cha-saving");

  const saving_throws_points = get_numbers_for_saving_throws(json_input, character_name);
  const max_score = get_highest_score(saving_throws_points);
  str_stat.innerText = saving_throws_points[0]["Mod"];
  dex_stat.innerText = saving_throws_points[1]["Mod"];
  con_stat.innerText = saving_throws_points[2]["Mod"];
  int_stat.innerText = saving_throws_points[3]["Mod"];
  wis_stat.innerText = saving_throws_points[4]["Mod"];
  cha_stat.innerText = saving_throws_points[5]["Mod"];

  document.getElementById("str-saving-prof").innerText = saving_throws_points[0]["Prof"];
  document.getElementById("dex-saving-prof").innerText = saving_throws_points[1]["Prof"];
  document.getElementById("con-saving-prof").innerText = saving_throws_points[2]["Prof"];
  document.getElementById("int-saving-prof").innerText = saving_throws_points[3]["Prof"];
  document.getElementById("wis-saving-prof").innerText = saving_throws_points[4]["Prof"];
  document.getElementById("cha-saving-prof").innerText = saving_throws_points[5]["Prof"];
  
  str_stat.style.width = "" + (parseInt(saving_throws_points[0]["Mod"].slice(1))/max_score) * 100 + "%";
  dex_stat.style.width = "" + (parseInt(saving_throws_points[1]["Mod"].slice(1))/max_score) * 100 + "%";
  con_stat.style.width = "" + (parseInt(saving_throws_points[2]["Mod"].slice(1))/max_score) * 100 + "%";
  int_stat.style.width = "" + (parseInt(saving_throws_points[3]["Mod"].slice(1))/max_score) * 100 + "%";
  wis_stat.style.width = "" + (parseInt(saving_throws_points[4]["Mod"].slice(1))/max_score) * 100 + "%";
  cha_stat.style.width = "" + (parseInt(saving_throws_points[5]["Mod"].slice(1))/max_score) * 100 + "%";
}

function get_skill_information_from_json(json_input, character_name){
  let list_of_keys = []
  for (let key in json_input[character_name]["Skills"]){
    list_of_keys.push(key);
  }
  return list_of_keys;
}

function set_default_skill_body(skills_body){
  skills_body.innerHTML = 
  "<h2 class='w3-text-grey w3-padding-16'>" +
    "<i class='fa fa-star fa-fw w3-margin-right w3-xxlarge w3-text-teal'></i>Skills" +
  "</h2>"
}

function set_skills(json_input, character_name){
  const skills_body = document.getElementById("skills-body");
  set_default_skill_body(skills_body);
  const skills_json_location = json_input[character_name]["Skills"];
  const name_of_skills_list = get_skill_information_from_json(json_input, character_name);
  let skills_json_list = []
  for (key in name_of_skills_list){ // used to just put all of the json's in a list for later use
    let skill_name = name_of_skills_list[key];
    skills_json_list.push(skills_json_location[skill_name]);
  }
  const highest_skill = get_highest_score(skills_json_list);

  for (key in name_of_skills_list){
    let skill_name = name_of_skills_list[key];
    let skill = skills_json_location[skill_name]
    let width = (parseInt(skill["Mod"].slice(1))/highest_skill) * 100;
    if (skill["Mod"].slice(1) == 0 || skill["Mod"] < 0){
      skills_body.innerHTML += 
      "<div class='w3-container container-width'>" +
        "<div class='w3-light-grey w3-round-xlarge skills-container'>" +
            "<p style='text-align: center; font-family: Roboto, sans-serif !important;'>" + skill_name + "</p>" +
            "<div class='w3-grey w3-round-xlarge w3-small'>" +
                `<div class='w3-container w3-center w3-round-xlarge w3-grey' style='width:100%;'>${skill["Mod"]}</div>` +
            "</div>" +
        `<p style='text-align: center;'>${skill["Prof"]}</p>` +
        "</div>" +
      "</div>";
    }else{
      skills_body.innerHTML += 
      "<div class='w3-container container-width'>" +
        "<div class='w3-light-grey w3-round-xlarge skills-container'>" +
            "<p style='text-align: center; font-family: Roboto, sans-serif !important;'>" + skill_name + "</p>" +
            "<div class='w3-grey w3-round-xlarge w3-small'>" +
                `<div class='w3-container w3-center w3-round-xlarge w3-teal' style='width:${width}%;'>${skill["Mod"]}</div>` +
            "</div>" +
        `<p style='text-align: center;'>${skill["Prof"]}</p>` +
        "</div>" +
      "</div>";
    }
    
  }
  skills_body.innerHTML += 
  "<div class='w3-container'>" +
    "<hr>" +
  "</div>";
}

function get_spell_specific_info_from_web(lower_spell_name, spell_name, spell_level){
  const fetchPromise = fetch(`https://www.dnd5eapi.co/api/spells/${lower_spell_name}`);
  const streamPromise = fetchPromise.then( (response) => response.json() )
  streamPromise.then( (data) => display_spell(spell_name, lower_spell_name, data["desc"], spell_level, data));
}

function get_spells(json_input, character_name){
  const spells_json_location = json_input[character_name]["Casting"]["Details"]["Spells"];
  for (spell_level in spells_json_location){
    let spell_array = spells_json_location["" + spell_level];
    for (spell in spell_array){
      let lower_spell_name = "";
      let spell_name = "";
      for (i in spell_array[spell]){
        let letter = spell_array[spell][i]
        if (letter == " "){
          lower_spell_name += "-";
        }
        else{
          lower_spell_name += letter;
        }
        spell_name += letter;
        
      }
      get_spell_specific_info_from_web(lower_spell_name.toLowerCase(), spell_name, spell_level);
    }
    
  }
}

function get_spell_colour(damage_type){
  let colour = "";
    switch(damage_type){
      case "Fire":
        colour = "red";
        break;
      case "Acid":
        colour = "light-green";
        break;
      case "Cold":
        colour = "pale-blue";
        break;
      case "Force":
        colour = "blue-grey";
        break;
      case "Lightning":
        colour = "indigo";
        break;
      case "Poison":
        colour = "green";
        break;
      case "Psychic":
        colour = "pink";
        break;
      case "Necrotic":
        colour = "dark-grey";
        break;
      case "Radiant":
        colour = "pale-yellow";
        break;
      case "Thunder":
        colour = "deep-purple";
        break;
      case "No damage Type":
        colour = "grey";
        break;
    }
  return colour
}

function display_spell(spell_name, search_spell_name, spell_info, spell_level, data) {
  let damage_type = "";
  try {
    damage_type = data["damage"]["damage_type"]["name"];
  }
  catch(err){
    damage_type = "No damage Type";
  }
  finally {
    const colour = get_spell_colour(damage_type);
    const website_spell_spot = document.getElementById(spell_level+"-level-spells");
    if (spell_info != null){
      spell_info = spell_info;
    }else{
      spell_info = [`No Info Avaliable, look at it here instead: <a href="http://dnd5e.wikidot.com/spell:${search_spell_name}" target="_blank">http://dnd5e.wikidot.com/spell:${search_spell_name}</a>`]
    }
    let spell_details = "";
    for (i in spell_info){
      spell_details += spell_info[i] + "\n";
    }
    website_spell_spot.innerHTML +=
    "<div class='w3-container container-width'>" +
      "<div class='w3-light-grey w3-round-xlarge spell-container'>" +
          `<p style='text-align: center; font-family: Roboto, sans-serif !important;'>${spell_name}</p>` +
          "<div class='w3-grey w3-round-xlarge w3-small'>" +
              `<div class='w3-container w3-center w3-round-xlarge w3-${colour} spell-description'>${spell_details}</div>` +
          "</div>" +
          "<div class='w3-grey w3-round-xlarge w3-small'>" +
              `<div class='w3-container w3-center w3-round-xlarge w3-grey' style='width: 100%;'>Components: </div>` +
              `<div class='w3-container w3-center w3-round-xlarge w3-grey' style='width: 100%;'>Casting Time: </div>` +
          "</div>" +
      `<p style='text-align: center;'>Damage Type: ${damage_type}</p>` +
      "</div>" +
    "</div>"
  }
}

const display_language = (language) => {
  const language_section = document.getElementById("character-languages");
  language_section.innerHTML += `<li>${language}</li>`;
}


function get_languages(json_input, character_name){
  const languages = json_input[character_name]["Languages"]
  languages.forEach((language) => display_language(language));
}

function get_character_description(json_input, character_name){
  const json_details = json_input[character_name]["Description"];
  document.getElementById("character-details").innerHTML = 
  `<li>Age: ${json_details["AGE"]}</li>` +
  `<li>Gender: ${json_details["GENDER"]}</li>` +
  `<li>Height: ${json_details["HEIGHT"]}</li>` +
  `<li>Weight: ${json_details["WEIGHT"]}</li>` +
  `<li>Hair: ${json_details["HAIR"]}</li>` +
  `<li>Eyes: ${json_details["EYES"]}</li>` +
  `<li>Skin: ${json_details["SKIN"]}</li>` +
  `<li>Size: ${json_details["SIZE"]}</li>`
}

const get_classes_and_levels = (class_list) => {
  console.log(class_list);
  const main_class = class_list[class_list.length-2];
  const link = "http://dnd5e.wikidot.com/" + main_class
  let class_string = "";
  class_list.forEach((item) => (class_string+=item + " "))
  document.getElementById("character-classes").innerHTML += 
    `<li><a href="${link}">${class_string}</a></li>`;
  
}

function get_character_details(json_input, character_name){
  const json_details = json_input[character_name];
  document.getElementById("character-level").innerText = "Level: " + json_details["Level"];
  const classes = json_details["classes/levels"];
  classes.forEach((classes) => get_classes_and_levels(classes))
  document.getElementById("character-hp").innerText = "HP: " + json_details["HP"];
  document.getElementById("character-ac").innerText = "AC: " + json_details["AC"];
  document.getElementById("character-init").innerText = "Init: " + json_details["Init"];
  document.getElementById("character-speed").innerText = "Speed: " + json_details["Speed"];
}

const get_info_from_json = (json_input) => {
  document.getElementById("character-details").innerHTML = "";
  document.getElementById("character-languages").innerHTML = "";
  document.getElementById("character-classes").innerHTML = "";
  const image = document.getElementById("character-image");
  const name_text = document.getElementById("character-name");
  const character_name = get_character_name_from_json(json_input);
  image.src = json_input[character_name]["Description"]["IMAGE"];
  name_text.innerText = character_name;
  get_character_details(json_input, character_name);
  set_main_stats(json_input, character_name);
  set_saving_throws(json_input, character_name);
  set_skills(json_input, character_name);
  get_spells(json_input, character_name);
  get_languages(json_input, character_name);
  get_character_description(json_input, character_name);

}