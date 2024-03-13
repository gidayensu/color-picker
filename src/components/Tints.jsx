import Values from "values.js";

export default function Tints({ color, status }) {
  const tints = new Values(`${color}`).tints(10);
  return (
    <>
      {status() && (
        <div className="m-6">
          <h1 className="text-4xl font-bold mb-4 mt-4 text-center">TINTS</h1>
          <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {tints.map((tint, index) => (
              <li className="bg-gray-200 text-center p-10 rounded cursor-pointer" key={index} style={{
                backgroundColor: `#${tint.hex}`
              }}>{`#${tint.hex}`}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
