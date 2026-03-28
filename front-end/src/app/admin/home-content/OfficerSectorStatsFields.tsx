"use client";

import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import type { OfficerSectorStatsValues, OfficerStatKey } from "./types";
import {
  STAT_KEYS,
  parseDraftToNum,
  valuesToDrafts,
} from "./officerSectorStatsDraft";

export type { OfficerSectorStatsValues } from "./types";

export type LabelKey = `feature_${1 | 2 | 3 | 4 | 5 | 6}_title`;
export type OfficerCardLabels = Partial<Record<LabelKey, string>>;

const LABEL_KEYS: LabelKey[] = [
  "feature_1_title",
  "feature_2_title",
  "feature_3_title",
  "feature_4_title",
  "feature_5_title",
  "feature_6_title",
];
const DEFAULT_LABELS = [
  "Сургалт",
  "Тэмцээнүүд",
  "Идэвхтэй бүртгэл",
  "Багш, удирдлага",
  "Бүтээгдэхүүн",
  "Ажилласан жил",
];

export type OfficerSectorStatsFieldsHandle = {
  /** Returns merged stats for immediate use (e.g. fetch body); parent state updates async */
  flushDraftsToParent: () => OfficerSectorStatsValues;
};

type Props = {
  values: OfficerSectorStatsValues;
  labels: OfficerCardLabels;
  onValueChange: (next: OfficerSectorStatsValues) => void;
  onLabelChange: (key: LabelKey, value: string) => void;
};

const OfficerSectorStatsFields = forwardRef<
  OfficerSectorStatsFieldsHandle,
  Props
>(function OfficerSectorStatsFields(
  { values, labels, onValueChange, onLabelChange },
  ref
) {
  const [drafts, setDrafts] = useState<Record<OfficerStatKey, string>>(() =>
    valuesToDrafts(values)
  );
  const lastSyncedJson = useRef<string>("");

  useEffect(() => {
    const j = JSON.stringify(values);
    if (j !== lastSyncedJson.current) {
      lastSyncedJson.current = j;
      setDrafts(valuesToDrafts(values));
    }
  }, [values]);

  const draftsRef = useRef(drafts);
  draftsRef.current = drafts;
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const commitKey = (key: OfficerStatKey, raw: string) => {
    onValueChange({
      ...valuesRef.current,
      [key]: parseDraftToNum(raw),
    });
  };

  useImperativeHandle(ref, () => ({
    flushDraftsToParent() {
      const next: OfficerSectorStatsValues = { ...valuesRef.current };
      for (const k of STAT_KEYS) {
        next[k] = parseDraftToNum(draftsRef.current[k] ?? "");
      }
      onValueChange(next);
      return next;
    },
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        ОФИЦЕР САЛБАРЫН АМЖИЛТ — карт засах
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Картын гарчиг болон тоог хамт засна. Тоог бүрэн устгаад дахин бичиж болно.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STAT_KEYS.map((key, i) => (
          <div
            key={key}
            className="border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
              Карт {i + 1}
            </p>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Гарчиг
              </label>
              <input
                type="text"
                value={labels[LABEL_KEYS[i]] ?? ""}
                onChange={(e) => onLabelChange(LABEL_KEYS[i], e.target.value)}
                placeholder={DEFAULT_LABELS[i]}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Тоо
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={drafts[key]}
                onChange={(e) => {
                  const t = e.target.value;
                  if (t === "" || /^\d+$/.test(t)) {
                    setDrafts((d) => ({ ...d, [key]: t }));
                  }
                }}
                onBlur={(e) => commitKey(key, e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 tabular-nums"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default OfficerSectorStatsFields;
