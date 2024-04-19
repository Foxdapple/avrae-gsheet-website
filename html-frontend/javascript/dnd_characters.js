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
    if (saving_throws[i]["Mod"] > biggest_throw){
      biggest_throw = saving_throws[i]["Mod"];
    }
  }
  // console.log(biggest_throw)
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

function set_skills(json_input, character_name){
  const skills_body = document.getElementById("skills-body");
  const skills_json_location = json_input[character_name]["Skills"]
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
    // console.log(highest_skill, parseInt(skill["Mod"].slice(1)), (parseInt(skill["Mod"].slice(1))/highest_skill) * 100)
    let width = (parseInt(skill["Mod"].slice(1))/highest_skill) * 100;
    console.log(width)
    if (skill["Mod"].slice(1) == 0){
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

const get_info_from_json = (json_input) => {
    const image = document.getElementById("character-image");
    const name_text = document.getElementById("character-name");
    const character_name = get_character_name_from_json(json_input);
    image.src = json_input[character_name]["Description"]["IMAGE"];
    name_text.innerText = character_name;
    set_main_stats(json_input, character_name);
    set_saving_throws(json_input, character_name);
    set_skills(json_input, character_name);
}