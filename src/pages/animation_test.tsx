import { useState } from 'react';
import animations from '@/styles/components/animations.module.scss'

export default function App(){
    const [open, setOpen] = useState(false);

    return (
        // <main>
        //     <a className='dropdown-button' onClick={() => add_class()}>click me</a>
        //     <div className='flex h-screen flex-col items-center justify-between p-24'>
        //         <div className={`${animations.expand_dropdown} z-10 w-full max-w-5xl items-center justify-between font-mono text-sm place-items-center bg-red-800 overflow-hidden`}>
        //             <p>eee</p>
        //             <p>eee</p>
        //             <p>eee</p>
        //         </div>
        //     </div>
        // </main>
        <main>
            <div className='h-screen'>
                <a className='dropdown-button' onClick={() => setOpen(!open)}>click me</a>
                <div className={open === true ? `${animations.expandDropdown} bg-red-800 overflow-hidden` : `${animations.closeDropdown} bg-red-800 overflow-hidden`}>
                    <p>eee</p>
                    <p>eee</p>
                    <p>eee</p>
                </div>
                
            </div>
            <div><p className={`${animations.rotate}`}>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p></div>
        </main>

        
    );
}