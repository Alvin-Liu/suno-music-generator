import { SnowflakeIdv1 } from "simple-flakeid";

export const genOrderNo = (): string => {
  const gen = new SnowflakeIdv1({ workerId: 1 });
  const snowId = gen.NextId();

  return snowId.toString();
}
