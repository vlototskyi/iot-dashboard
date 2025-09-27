export type DhtMessage = {
  device_id: string;
  ts: string;
  ts_epoch?: number;
  temperature: number;
  humidity: number;
  sig?: string;
  key_id?: string;
};

export type SoundMessage = {
  device_id: string;
  ts: string;
  ts_epoch?: number;
  sound_floor: number;
  sound_rms_avg: number;
  sound_rms_peak: number;
  sound_delta_avg: number;
  sound_delta_peak: number;
  sound_percent_avg: number;
  sound_percent_peak: number;
  win_ms: number;
  seg_ms: number;
  sig?: string;
  key_id?: string;
};

export type LedgerRow = { key: string; value: string };

export type Telemetry =
  | ({ kind: "dht" } & DhtMessage)
  | ({ kind: "sound" } & SoundMessage);
