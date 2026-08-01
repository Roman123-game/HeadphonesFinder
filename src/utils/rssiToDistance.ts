export function rssiToDistance(
  rssi: number,
  txPower = -59,
  n = 2
): number {
  return Number(
    Math.pow(10, (txPower - rssi) / (10 * n)).toFixed(2)
  );
}