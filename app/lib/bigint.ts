export function serialize<T>(data: T) {
  return JSON.stringify(data, (_key, value) =>
    typeof value === "bigint" ? `BIGINT::${value}` : value
  );
}

export function deserialize<T>(json: ReturnType<JSON["stringify"]>) {
  return JSON.parse(json, (_key, value) => {
    if (typeof value === "string" && value.startsWith("BIGINT::")) {
      return BigInt(value.substring(8));
    }
    return value;
  });
}
