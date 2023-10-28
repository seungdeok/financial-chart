import "./Toolbar.scss";

export const times = [
  {
    key: "1분",
    label: "1분",
  },
  {
    key: "10분",
    label: "10분",
  },
  {
    key: "30분",
    label: "30분",
  },
  {
    key: "1시간",
    label: "1시간",
  },
  {
    key: "1일",
    label: "1일",
  },
  {
    key: "1주",
    label: "1주",
  },
  {
    key: "1달",
    label: "1달",
  },
];

export const shapes = [
  {
    key: "bar",
    label: "봉",
  },
  {
    key: "candle",
    label: "캔들",
  },
  {
    key: "line",
    label: "라인",
  },
  {
    key: "area",
    label: "영역",
  },
];

export const topIndicators = [
  {
    key: "이동평균선",
    label: "이동평균선",
  },
  {
    key: "일목균형표",
    label: "일목균형표",
  },
  {
    key: "볼린저밴드",
    label: "볼린저밴드",
  },
  {
    key: "매물대",
    label: "매물대",
  },
  {
    key: "피봇",
    label: "피봇",
  },
  {
    key: "파라볼릭 SAR",
    label: "파라볼릭 SAR",
  },
  {
    key: "엔빌로프",
    label: "엔빌로프",
  },
];

export const bottomIndicators = [
  {
    key: "거래량",
    label: "거래량",
  },
  {
    key: "MACD",
    label: "MACD",
  },
  {
    key: "RSI",
    label: "RSI",
  },
  {
    key: "ADX",
    label: "ADX",
  },
  {
    key: "MFI",
    label: "MFI",
  },
  {
    key: "CCI",
    label: "CCI",
  },
  {
    key: "ATR",
    label: "ATR",
  },
  {
    key: "OBV",
    label: "OBV",
  },
  {
    key: "DMI",
    label: "DMI",
  },
  {
    key: "WR",
    label: "WR",
  },
  {
    key: "Stochastic RSI",
    label: "Stochastic RSI",
  },
  {
    key: "Momemtum",
    label: "Momemtum",
  },
  {
    key: "Volume OSC",
    label: "Volume OSC",
  },
];

const ToolbarSelector = ({
  data,
  selectedItem = data[0].key,
}: {
  data: { key: string; label: string }[];
  selectedItem?: string;
}) => {
  return (
    <select>
      {data.map(({ key, label }) => (
        <option key={key} value={key} selected={selectedItem === key}>
          {label}
        </option>
      ))}
    </select>
  );
};

const ToolBar = () => {
  return (
    <div className="toolbar-wrap">
      <div className="toolbar-item">
        <ToolbarSelector data={times} selectedItem="30분" />
      </div>
      <div className="toolbar-divider" />
      <div className="toolbar-item">
        <ToolbarSelector data={shapes} selectedItem="candle" />
      </div>
      <div className="toolbar-divider" />
      <div className="toolbar-item">
        <ToolbarSelector data={[...topIndicators, ...bottomIndicators]} />
      </div>
    </div>
  );
};

export default ToolBar;
