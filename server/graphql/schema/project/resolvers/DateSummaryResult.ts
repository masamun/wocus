export const DateSummaryResult: DateSummaryResultResolvers = {
  /* Implement DateSummaryResult resolver logic here */
  dates: ({ dates }, _arg, _ctx) => {
    /* DateSummaryResult.dates resolver is required because DateSummaryResult.dates and DateSummaryResultMapper.dates are not compatible */
    return dates;
  },
  info: ({ info }, _arg, _ctx) => {
    /* DateSummaryResult.info resolver is required because DateSummaryResult.info and DateSummaryResultMapper.info are not compatible */
    return info;
  },
};
