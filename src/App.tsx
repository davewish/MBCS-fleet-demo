import { useEffect, useState } from "react";
import { Car, Zap, AlertCircle, Battery } from "lucide-react";

interface Vehicle {
  id: string;
  speed: number;
  battery: number;
  status: "online" | "warning" | "offline";
  timestamp: Date;
}

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newVehicle: Vehicle = {
        id: `MB-VH${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        speed: Math.random() * 120,
        battery: Math.random() * 100,
        status: (["online", "warning", "offline"] as const)[
          Math.floor(Math.random() * 3)
        ],
        timestamp: new Date(),
      };
      setVehicles((prev) => {
        // Keep last 10 for dashboard view
        const updated = [...prev, newVehicle].slice(-10);
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        MBCS Fleet Connectivity Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className={`border rounded-lg p-4 shadow-md ${
              v.status === "online"
                ? "bg-green-50"
                : v.status === "warning"
                ? "bg-yellow-50"
                : "bg-red-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">{v.id}</span>
              {v.status === "online" && (
                <span className="text-green-600 flex items-center">
                  <Car className="mr-1" size={16} /> Online
                </span>
              )}
              {v.status === "warning" && (
                <span className="text-yellow-600 flex items-center">
                  <AlertCircle className="mr-1" size={16} /> Warning
                </span>
              )}
              {v.status === "offline" && (
                <span className="text-red-600 flex items-center">
                  <AlertCircle className="mr-1" size={16} /> Offline
                </span>
              )}
            </div>
            <div className="flex items-center mb-1">
              <Zap className="mr-2 text-blue-600" size={18} />
              <span>Speed: {v.speed.toFixed(1)} km/h</span>
            </div>
            <div className="flex items-center mb-1">
              <Battery className="mr-2 text-green-600" size={18} />
              <span>Battery: {v.battery.toFixed(0)}%</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Last Update: {v.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      {vehicles.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          Connecting to fleet... Real-time updates starting soon.
        </p>
      )}
    </div>
  );
}

export default App;
