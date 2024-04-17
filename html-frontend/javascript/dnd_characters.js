const getFile = (file_input) => {
    new Response(file_input.files[0]).json().then(json => {
        console.log(json);
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

function set_main_stats(json_input, character_name) {
    const str_stat = document.getElementById("str-stat");
    const dex_stat = document.getElementById("dex-stat");
    const con_stat = document.getElementById("con-stat");
    const int_stat = document.getElementById("int-stat");
    const wis_stat = document.getElementById("wis-stat");
    const cha_stat = document.getElementById("cha-stat");
    let stats = get_numbers_for_stats(json_input, character_name);
    str_stat.innerText = stats[0];
    dex_stat.innerText = stats[1];
    con_stat.innerText = stats[2];
    int_stat.innerText = stats[3];
    wis_stat.innerText = stats[4];
    cha_stat.innerText = stats[5];
    str_stat.style.width = "" + (parseInt(stats[0])/20) * 100 + "%";
    dex_stat.style.width = "" + (parseInt(stats[1])/20) * 100 + "%";
    con_stat.style.width = "" + (parseInt(stats[2])/20) * 100 + "%";
    int_stat.style.width = "" + (parseInt(stats[3])/20) * 100 + "%";
    wis_stat.style.width = "" + (parseInt(stats[4])/20) * 100 + "%";
    cha_stat.style.width = "" + (parseInt(stats[5])/20) * 100 + "%";
}

function get_numbers_for_stats(json_input, character_name){
  return [json_input[character_name]["Stats"]["STR"]["Total"], 
  json_input[character_name]["Stats"]["DEX"]["Total"],
  json_input[character_name]["Stats"]["CON"]["Total"],
  json_input[character_name]["Stats"]["INT"]["Total"],
  json_input[character_name]["Stats"]["WIS"]["Total"],
  json_input[character_name]["Stats"]["CHA"]["Total"]]
}

const get_info_from_json = (json_input) => {
    const image = document.getElementById("character-image");
    const name_text = document.getElementById("character-name");
    const character_name = get_character_name_from_json(json_input);
    console.log(character_name);
    image.src = json_input[character_name]["Description"]["IMAGE"];
    name_text.innerText = character_name;
    set_main_stats(json_input, character_name);
}