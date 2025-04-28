import React, { useState } from 'react';

const Home = () => {
  const [inputData, setInputData] = useState({
    sourcePort: '',
    destinationPort: '',
    protocol: '',
    packetLength: '',
    packetType: '',
    trafficType: '',
  });
  const [attackType, setAttackType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAttackType(null);
    try {
      const response = await fetch('https://cyberbackend-a3e8gxdsa7b4brf7.uksouth-01.azurewebsites.net/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_data: {
            'Source Port': parseInt(inputData.sourcePort, 10),
            'Destination Port': parseInt(inputData.destinationPort, 10),
            'Protocol': inputData.protocol,
            'Packet Length': parseInt(inputData.packetLength, 10),
            'Packet Type': inputData.packetType,
            'Traffic Type': inputData.trafficType,
          },
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Prediction failed');
      }
      const data = await response.json();
      setAttackType(data.attack_type);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cybersecurity Attack Predictor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Source Port</label>
          <input
            type="number"
            name="sourcePort"
            value={inputData.sourcePort}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Destination Port</label>
          <input
            type="number"
            name="destinationPort"
            value={inputData.destinationPort}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Protocol</label>
          <select
            name="protocol"
            value={inputData.protocol}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          >
            <option value="">Select Protocol</option>
            <option value="ICMP">ICMP</option>
            <option value="TCP">TCP</option>
            <option value="UDP">UDP</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Packet Length</label>
          <input
            type="number"
            name="packetLength"
            value={inputData.packetLength}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Packet Type</label>
          <select
            name="packetType"
            value={inputData.packetType}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          >
            <option value="">Select Packet Type</option>
            <option value="Control">Control</option>
            <option value="Data">Data</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Traffic Type</label>
          <select
            name="trafficType"
            value={inputData.trafficType}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          >
            <option value="">Select Traffic Type</option>
            <option value="DNS">DNS</option>
            <option value="FTP">FTP</option>
            <option value="HTTP">HTTP</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {attackType && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          <strong>Attack Type:</strong> {attackType}
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default Home;
