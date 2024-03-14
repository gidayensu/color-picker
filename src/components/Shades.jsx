import Values from "values.js";

export default function Shades({ color }) {
  const tints = new Values(`${color}`).shades(8);
  return (
    <>
      
      <div className={`m-6 ${color === '#ffff' ? 'animate-pulse': '' } `}>
          <h1 className="text-4xl font-bold mb-4 mt-4 text-center">SHADES</h1>
          <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {tints.map((shade, index) => (
              <li className="bg-gray-200 text-center p-10 rounded text-white cursor-pointer" key={index} style={{
                backgroundColor: `#${shade.hex}`
              }}>{`${color === '#ffff'? 'choose colour' : `#${shade.hex}`}`}</li>
            ))}
          </ul>
        </div>
      
    </>
  );
}
