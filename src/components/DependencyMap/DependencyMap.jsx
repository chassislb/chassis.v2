import { useMemo } from "react";
import { nodes } from "../../data/diagnosis";

const YELLOW = "#F3CC31";
const BLUE = "#36C6F4";

function spokeStyle(score) {
  if (!score) return { stroke: "rgba(255,255,255,0.16)", width: 1.5, dash: "3 6", opacity: 1 };
  if (score === 1) return { stroke: YELLOW, width: 5, dash: "0", opacity: 0.95 };
  if (score === 2) return { stroke: YELLOW, width: 3.5, dash: "0", opacity: 0.7 };
  if (score === 3) return { stroke: BLUE, width: 2.5, dash: "0", opacity: 0.55 };
  return { stroke: BLUE, width: 1.5, dash: "0", opacity: 0.32 };
}

function nodeStyle(score) {
  if (!score) return { fill: "transparent", stroke: "rgba(255,255,255,0.3)" };
  if (score === 1) return { fill: YELLOW, stroke: YELLOW };
  if (score === 2) return { fill: "rgba(243,204,49,0.45)", stroke: YELLOW };
  if (score === 3) return { fill: "rgba(54,198,244,0.3)", stroke: BLUE };
  return { fill: "transparent", stroke: BLUE };
}

/**
 * values: { [nodeKey]: 1|2|3|4|undefined } — live mode, one score per answered question
 * forceState: 'broken' | 'repaired' — overrides values for the illustrative before/after map
 */
export default function DependencyMap({ values = {}, forceState, size = 420, className = "", lang = "en" }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const nodeR = size * 0.052;
  const founderR = forceState === "repaired" ? size * 0.06 : size * 0.08;

  const points = useMemo(
    () =>
      nodes.map((n, i) => {
        const angle = (-90 + i * 60) * (Math.PI / 180);
        return {
          ...n,
          x: cx + radius * Math.cos(angle),
          y: cy + radius * Math.sin(angle),
        };
      }),
    [cx, cy, radius]
  );

  const getScore = (key) => {
    if (forceState === "broken") return 1;
    if (forceState === "repaired") return 4;
    return values[key];
  };

  const ringProgress = useMemo(() => {
    if (forceState === "broken") return 0;
    if (forceState === "repaired") return 1;
    const total = nodes.reduce((sum, n) => sum + (values[n.key] || 0), 0);
    return total / (nodes.length * 4);
  }, [values, forceState]);

  const ringPath =
    points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      className={className}
      role="img"
      aria-label={lang === "ar" ? "رسم بياني لوظائف العمل المرتبطة بالمؤسس" : "Diagram of business functions connected to the founder"}
    >
      {/* peer-to-peer ring — the repaired state */}
      <path
        d={ringPath}
        fill="none"
        stroke={BLUE}
        strokeWidth={1 + ringProgress * 5}
        opacity={0.08 + ringProgress * 0.65}
        style={{ transition: "stroke-width 0.7s ease, opacity 0.7s ease" }}
      />

      {/* spokes — the founder-routed state */}
      {points.map((p) => {
        const s = spokeStyle(getScore(p.key));
        return (
          <line
            key={p.key}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke={s.stroke}
            strokeWidth={s.width}
            strokeDasharray={s.dash}
            opacity={s.opacity}
            strokeLinecap="round"
            style={{ transition: "stroke 0.6s ease, stroke-width 0.6s ease, opacity 0.6s ease" }}
          />
        );
      })}

      {/* founder node */}
      <circle
        cx={cx}
        cy={cy}
        r={founderR}
        fill="#F8F7F3"
        style={{ transition: "r 0.7s ease" }}
      />
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.032}
        fontWeight="800"
        fill="#111111"
        style={{ letterSpacing: lang === "ar" ? "0" : "0.02em" }}
      >
        {lang === "ar" ? "أنت" : "you"}
      </text>

      {/* outer nodes */}
      {points.map((p) => {
        const s = nodeStyle(getScore(p.key));
        return (
          <g key={p.key} style={{ transition: "opacity 0.6s ease" }}>
            <circle
              cx={p.x}
              cy={p.y}
              r={nodeR}
              fill={s.fill}
              stroke={s.stroke}
              strokeWidth={2}
              style={{ transition: "fill 0.6s ease, stroke 0.6s ease" }}
            />
            <text
              x={p.x}
              y={p.y + nodeR + size * 0.045}
              textAnchor="middle"
              fontSize={size * 0.03}
              fontWeight="700"
              fill="rgba(255,255,255,0.55)"
              style={lang === "ar" ? undefined : { textTransform: "lowercase", letterSpacing: "0.04em" }}
            >
              {p.label[lang]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
