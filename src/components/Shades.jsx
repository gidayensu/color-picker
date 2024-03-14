import Values from "values.js";

export default function Shades({ color, status }) {
  const tints = new Values(`${color}`).shades(8);
  return (
    <>
      {status() && (
        <div className="m-6">
          <h1 className="text-4xl font-bold mb-4 mt-4 text-center">SHADES</h1>
          <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {tints.map((shade, index) => (
              <li className="text-center p-10 rounded cursor-pointer text-white" key={index} style={{
                backgroundColor: `#${shade.hex}`
              }}>{`#${shade.hex}`}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
