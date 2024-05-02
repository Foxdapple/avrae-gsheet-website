import { list } from "postcss";
import { List } from "postcss/lib/list";

interface jsonData {
    [key: string]: any;
  }

export default function Get_data(file: jsonData, character: string) {
    const image = typeof document !== 'undefined' && document.getElementById("character-image");
    const level_and_class = typeof document !== 'undefined' && document.getElementById("character-classes");
    if (level_and_class != null && level_and_class != false){
        level_and_class.innerHTML = ``;
    }
    if (image != null && image != false){
        image.setAttribute('src', file[character]["Description"]["IMAGE"]);
    }
    get_character_details(file, character);
    // alert(character);
    // console.log(file);

    function get_classes_and_levels(class_info: Array<string>){
        const document_item = typeof document !== 'undefined' && document.getElementById("character-classes");
        const main_class = class_info[class_info.length-2];
        const link = "http://dnd5e.wikidot.com/" + main_class;
        let class_string = "";
        class_info.forEach(((item: string) => (class_string+=item + " ")));
        if (document_item != null && document_item != false){
            document_item.innerHTML += 
            `<li><a href="${link}" target="_blank">${class_string}</a></li>`;
        }
    }

    function get_character_details(file: jsonData, character: string){
        const json_details = file[character];
        const level = typeof document !== 'undefined' && document.getElementById("character-level");
        const hp = typeof document !== 'undefined' && document.getElementById("character-hp");
        const ac = typeof document !== 'undefined' && document.getElementById("character-ac");
        const init = typeof document !== 'undefined' && document.getElementById("character-init");
        const speed = typeof document !== 'undefined' && document.getElementById("character-speed");
        const classes = json_details["classes/levels"];
        classes.forEach((classes: Array<string>) => get_classes_and_levels(classes));

        if (level != null && level != false){
            level.innerText = "Level: " + json_details["Level"];
        }
        if (hp != null && hp != false){
            hp.innerText = "HP: " + json_details["HP"];
        }
        if (ac != null && ac != false){
            ac.innerText = "AC: " + json_details["AC"];
        }
        if (init != null && init != false){
            init.innerText = "Init: " + json_details["Init"];
        }
        if (speed != null && speed != false){
            speed.innerText = "Speed: " + json_details["Speed"];
        }
    }
}