import { DIWALI } from "../../data/diwali";

/* Footer: a quiet greeting in the copyright bar, shown only in Diwali mode. */
export default function DiwaliGreeting() {
  if (!DIWALI.enabled) return null;

  const star = (
    <span aria-hidden="true" className="text-[#F5B942]">
      ✦
    </span>
  );

  return (
    <p lang="hi" className="diwali-only text-slate-400">
      {star} {DIWALI.greeting} {star}
    </p>
  );
}
