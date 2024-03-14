import type { DateSummaryResolvers } from "./../../types.generated";
export const DateSummary: DateSummaryResolvers = {
  dsv: (parent) => {
    return parent.ev - parent.pv;
  },
  dcv: (parent) => {
    return parent.ev - parent.ac;
  },
};
