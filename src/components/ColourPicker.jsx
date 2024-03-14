import React from 'react';
import { SketchPicker, SwatchesPicker } from 'react-color';

export default function ColourPicker ({color, handleOnChangeComplete, cancel}) {
    
    return (
    <>  <div className="flex justify-center flex-col md:flex-row items-center gap-3 ">
        <SketchPicker color = {color} disableAlpha  onChangeComplete={handleOnChangeComplete} />
        <SwatchesPicker color = {color} disableAlpha  onChangeComplete={handleOnChangeComplete} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 rounded mr-2" onClick={cancel}>Close</button>
        </div>
    </>
    );
}
