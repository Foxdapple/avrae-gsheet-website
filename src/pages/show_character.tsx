import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { json } from "stream/consumers";

// components
import Get_data from "@/components/Get_data";
import animations from '@/styles/components/animations.module.scss';

// ToDo:
// Make dropdown menus for right side of the page (follow this design: file:///C:/Users/Foxdapple/Desktop/Folders/Programming_Projects/avrae_gsheet_website_V1/html-frontend/dnd_characters.html)
//    follow this for animation: https://www.youtube.com/watch?v=yoMf7BOujLA&ab_channel=DiegoCabrera
// add more animation stuff
    // Fix Animations bouncing back (going over max limit) 
// add maybe more colour in the background

const inter = Inter({ subsets: ["latin"] });

export default function App() {
  
  const [openDetails, setOpenDetails] = useState(false);
  const [dropButton1, setButton1] = useState(false);
  const [open, setOpen] = useState(false);

  const getFile = (file_input: File) => {
    new Response(file_input).json().then(json_file => {
        Get_data(json_file, get_character_name_from_json(json_file));
      }, err => {
        // not json
      });
  }

  const showskills = () => {
    setButton1(!dropButton1);
    setOpen(!open);
  }


  function get_character_name_from_json(json_input: JSON) {
    let character_name = "";
    for(var i in json_input){
      character_name = i;
    }
    return character_name
  }

  return (
    <>
      <Head>
        <title>Avrae Gsheet Viewing - Upload File</title>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        <div className="mx-auto grid max-w-6xl items-start gap-5 sm:max-w-5xl sm:grid-cols-2 md:gap-5 lg:max-w-6xl lg:grid-cols-2 ">
          
          {/* left side of page */}


            <div className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              <div>
                <img id="character-image" src="https://images.ctfassets.net/swt2dsco9mfe/G8hY5RaUUgMiwctolsI0K/1496009a9a957296d768d86e7503b5ca/157997_1920x1342.jpg?q=70" alt="Avatar" />
              </div>
              <label>
                <input 
                  type="file"
                  onChange={({ target }) => {
                    if (target.files) {
                      const file = target.files[0];
                      getFile(file);
                      setOpenDetails(!openDetails);
                    }
                  }}
                />
              </label>
              <p><b>Classes/Levels:</b></p>
                <ul id="character-classes" className="indent-6">
                    <li>???</li>
                </ul>
                <p id="character-hp"><b>HP: ?</b></p>
                <p id="character-ac"><b>AC: ?</b></p>
                <p id="character-init"><b>Init: ?</b></p>
                <p id="character-speed"><b>Speed: ?</b></p>
            </div>
            
            

          {/* right side of page */}
          {/* adds background glow */} <div className={openDetails === true ? `` : `relative z-[-1] flex place-items-left before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]`}>
            <div className={openDetails === true ? `${animations.showDetails} border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 overflow-hidden` : "overflow-hidden hidden"}>
                  <div>
                    <Image
                      src="dropdown_icon.svg"
                      alt="Dropdown Icon"
                      onClick={() => showskills()}
                      className={dropButton1 === true ? `${animations.rotateOpen} ` : `${animations.rotateClose}`}
                      width={100}
                      height={24}
                      priority
                    />
                  </div>
                <div className={open === true ? `${animations.expandDropdown} overflow-hidden` : `${animations.closeDropdown} overflow-hidden`}> {/* keep set to hidden if not in use (like the other animation in animation_test*/}
                  {/* add a new div for each new row (keep to maybe 3 skills a row) */}
                  <div className="bg-red-800 overflow-hidden">
                      <p>eee</p>
                      <p>eee</p>
                      <p>eee</p>
                  </div>
                </div>
                <div className='h-screen'> {/* keep set to hidden if not in use (like the other animation in animation_test*/}
                  <div>bbbb</div> {/* add a new div for each new row (keep to maybe 3 skills a row) */}
                </div>
                
            </div>
          </div>

        </div>
      </main>
    </>
  );
}