import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Factory,
  FileCheck,
  FileText,
  Percent,
  Receipt,
  Sparkles,
  Stamp,
  Tags,
  Utensils,
} from "lucide-react";

/* Registry entries carry an icon *name* so they stay serializable.
   Keep this map in sync with the `icon` values in app/data/services.js. */
const SERVICE_ICONS = {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Factory,
  FileCheck,
  FileText,
  Percent,
  Receipt,
  Sparkles,
  Stamp,
  Tags,
  Utensils,
};

export function getServiceIcon(name) {
  return SERVICE_ICONS[name] || Building2;
}

export default SERVICE_ICONS;
