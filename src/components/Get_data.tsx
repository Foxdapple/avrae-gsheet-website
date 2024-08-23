import { list } from "postcss";
import { List } from "postcss/lib/list";

interface jsonData {
    [key: string]: any;
  }

export default function Get_data(file: jsonData, character: string) {
    const d = typeof document !== 'undefined' && document.getElementById('hover-box');

    document.onmousemove = (event) => {
        const {
            clientX,
            clientY
        } = event
        if (d != null && d != false){
            d.style.position = "fixed";
            d.style.display = "Block"; // remove after implemented on spells
            d.style.left = clientX+20+'px';
            d.style.top = clientY+20+'px';
        }
        
      }

    const image = typeof document !== 'undefined' && document.getElementById("character-image");
    const level_and_class = typeof document !== 'undefined' && document.getElementById("character-classes");
    if (level_and_class != null && level_and_class != false){
        level_and_class.innerHTML = ``;
    }
    if (image != null && image != false){
        image.setAttribute('src', file[character]["Description"]["IMAGE"]);
    }
    get_character_details(file, character);
    get_spell_names_and_levels(file, character);
    // alert(character);
    // console.log(file);

    // All Character components belong under here.

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


    // All spell components belong under here.

    function get_spell_info(){
        console.log("hmmm");
    }

    function get_spell_names_and_levels(file: jsonData, character: string){
        const spell_area = typeof document !== 'undefined' && document.getElementById("spell-section");
        if (spell_area != null && spell_area != false){
            // clears all level indicators for when another character is selected.
            spell_area.innerHTML = "";
        }
        const spells_json_location = file[character]["Casting"]["Details"]["Spells"];
        for (let i = 0; i < Object.keys(spells_json_location).length; i++){
            if (spells_json_location[i].length == 0){
                continue;
            }
            if (i > 0){
                if (spell_area != null && spell_area != false){
                    // adds heading to state what spell level we're at.
                    spell_area.innerHTML += `<hr /><h1 class="text-xl"><b>Level: ${i}</b></h1>`;
                }
            }
            if (spell_area != null && spell_area != false){
                // Adds div to spell_area to store all spells at i's level.
                spell_area.innerHTML += 
                `<div class="mx-auto grid max-w-6xl items-start gap-5 sm:max-w-4xl sm:grid-cols-1 md:gap-5 lg:max-w-7xl lg:grid-cols-3" id="character-spells-${i}"></div>`;
            }
            let section = typeof document !== 'undefined' && document.getElementById(`character-spells-${i}`);
            // clears all spells added for when another character is selected.
            var spells_to_add = "";
            // console.log(spells_json_location[i]);
            spells_json_location[i].forEach(function (spell_name: string){
                spells_to_add += 
                `<div class="inline-block bg-green-500 rounded-lg text-center pt-pb" onClick=` + `get_spell_info()>` +
                    spell_name +
                "</div>"
                if (section != null && section != false){
                    section.innerHTML = spells_to_add;
                }
            })
        }
    }


}