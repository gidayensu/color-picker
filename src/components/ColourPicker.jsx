import React from 'react';
import { SketchPicker, SwatchesPicker } from 'react-color';

export default function ColourPicker ({color, handleColourChoice, cancel}) {
    
    return (
    <>  <div className="flex justify-center flex-col md:flex-row items-center gap-3 ">
            <SketchPicker 
                color = {color} 
                disableAlpha  
                onChangeComplete={handleColourChoice} 
            />
            
            <SwatchesPicker 
                color = {color} 
                disableAlpha  
                onChangeComplete={handleColourChoice} 
            />

            <button className="bg-teal-500 hover:bg-teal-700 h-10 w-20 text-white font-bold px-5 rounded mr-2 text-sm" onClick={cancel}>
                Close
            </button>
        </div>
    </>
    );
}
