import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [plots, setPlots] = useState([]);
  const [block, setBlock] = useState("A");
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [buyerName, setBuyerName] = useState("");

  useEffect(() => {
    fetchPlots();
  }, [block]);

  const fetchPlots = async () => {
    const res = await axios.get(
      `http://localhost:4090/api/plots/${block}`
    );
    setPlots(res.data);
  };

const registerPlot = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.put(
      `http://localhost:4090/api/register-plot/${selectedPlot._id}`,
      { name: buyerName },
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    );

    setSelectedPlot(null);
    setBuyerName("");
    fetchPlots();

  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="container mt-4">
      <h3 className="mb-4">Admin Dashboard</h3>

      <select
        className="form-select w-auto mb-4"
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

      <div className="row">
        {plots.map((plot) => (
          <div key={plot._id} className="col-lg-2 col-md-3 col-4 mb-3">
            <div
              className={`p-3 text-center rounded shadow-sm ${
                plot.status === "registered"
                  ? "bg-danger text-white"
                  : "bg-success text-white"
              }`}
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => {
                if (plot.status !== "registered") {
                  setSelectedPlot(plot);
                }
              }}
            >
              {plot.block}-{plot.plotNumber}
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {selectedPlot && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>
                  Register Plot {selectedPlot.block}-{selectedPlot.plotNumber}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedPlot(null)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buyer Name"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedPlot(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={registerPlot}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;