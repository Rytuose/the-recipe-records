export const MEASUREMENT_NAMES = ["", "tablespoon", "teaspoon"] as const;

export type Measurement = typeof MEASUREMENT_NAMES[number];