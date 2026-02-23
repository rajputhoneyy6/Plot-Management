import { useEffect, useState } from "react";
import axios from "axios";


function PlotGrid() {
  const [plots, setPlots] = useState([]);
  const [block, setBlock] = useState("A");

  const totalPlots = plots.length;
  const registeredPlots = plots.filter(p => p.status === "registered").length;
  const availablePlots = totalPlots - registeredPlots;

  useEffect(() => {
    axios
      .get(`http://localhost:4090/api/plots/${block}`)
      .then((res) => setPlots(res.data))
      .catch((err) => console.log(err));
  }, [block]);

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Block {block}</h4>

        <select
          className="form-select w-auto"
          value={block}
          onChange={(e) => setBlock(e.target.value)}
        >
          {Array.from({ length: 26 }, (_, i) => {
            const letter = String.fromCharCode(65 + i);
            return (
              <option key={letter} value={letter}>
                Block {letter}
              </option>
            );
          })}
        </select>
      </div>

      {/* Statistics Section */}
      <div className="row mb-4 text-center">
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm p-3">
            <h6>Total Plots</h6>
            <h4>{totalPlots}</h4>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card shadow-sm p-3">
            <h6>Registered</h6>
            <h4 className="text-danger">{registeredPlots}</h4>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card shadow-sm p-3">
            <h6>Available</h6>
            <h4 className="text-success">{availablePlots}</h4>
          </div>
        </div>
      </div>

      {/* Plot Grid */}
      <div className="row">
        {plots.map((plot) => (
          <div key={plot._id} className="col-lg-2 col-md-3 col-4 mb-3">
            <div
              className={`p-3 text-center rounded shadow-sm ${
                plot.status === "registered"
                  ? "bg-danger text-white"
                  : "bg-success text-white"
              }`}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
              }}
              title={
                `Type: ${plot.type || "Plot"}\n` +
                `Plot/Shop No: ${plot.block}-${plot.plotNumber}\n` +
                `Size: ${plot.size || "N/A"}\n` +
                `PLC: ${plot.plc || 0}\n` +
                `Dimension: ${plot.dimension || "N/A"}\n` +
                `Status: ${plot.status}\n` +
                `User: ${plot.registeredBy || "None"}\n` +
                `Registry No: ${plot.registryNo || "N/A"}\n` +
                `Last Updated: ${new Date(plot.updatedAt).toLocaleString()}`
              }
            >
              {plot.block}-{plot.plotNumber}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlotGrid;