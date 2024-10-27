import React, { useState } from "react";

const BluetoothProx = () => {
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const startProximityScan = async () => {
        setIsScanning(true);
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: ["battery_service"]
            });

            setDeviceInfo({
                name: device.name || "Unnamed Device",
                id: device.id
            });

            const server = await device.gatt.connect();
            const service = await server.getPrimaryService("battery_service");
            const characteristic = await service.getCharacteristic("battery_level");
            const batteryLevel = await characteristic.readValue();
            console.log(`Battery level: ${batteryLevel.getUint8(0)}%`);

            device.gatt.disconnect();
            setIsScanning(false);

        } catch (error) {
            console.error("Error during Bluetooth scan:", error);
            setIsScanning(false);
        }
    };

    return (
        <div>
            <button onClick={startProximityScan} disabled={isScanning}>
                {isScanning ? "Scanning..." : "Turn On Proximity"}
            </button>

            {deviceInfo ? (
                <div>
                    <p>Device Found: {deviceInfo.name}</p>
                    <p>ID: {deviceInfo.id}</p>
                </div>
            ) : (
                <p>No nearby devices detected.</p>
            )}
        </div>
    );
};
<p>BluetoothProx Component Loaded</p>
export default BluetoothProx;