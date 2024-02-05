export interface RangeDate {
  date: Date;
  isToday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  isHolyday: boolean;
}

export const useWbsStore = defineStore("wbs", () => {
  const currentDate = ref(initialShowDate());
  const showRange = ref(1);

  const route = useRoute();
  const projectName = ref<string | undefined>("");
  const milestoneName = ref<string | undefined>("");

  /**
   * 表記表示月
   * @returns
   */
  function initialShowDate() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  const setCurrentDate = (date: Date) => {
    logger.info(`setCurrentDate ${date.toStringYM()}`);
    currentDate.value = date;
  };

  const setShowRange = (range: string | number) => {
    showRange.value = Number(range);
  };

  const nextCurrentDate = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
  };

  const prevCurrentDate = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
  };

  // 今月の初日を初期値とする
  const startShowDate = computed(() => {
    //return new Date(2023, 11, 6, 0);
    return new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1);
  });

  // 日に0を指定することで前月の最終日となる
  const endShowDate = computed(() => {
    //return new Date(2023, 11, 6, 0);
    return new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + showRange.value, 0);
  });

  const isToday = (date: Date) => {
    return date.toStringYMD() === new Date().toStringYMD();
  };

  const isSaturday = (date: Date) => {
    return date.getDay() === 6;
  };

  const isSunday = (date: Date) => {
    return date.getDay() === 0;
  };

  /**
   * 表示期間の配列を返す
   */
  const range = computed(() => {
    const _range: RangeDate[] = [];
    for (let d = new Date(startShowDate.value); d <= endShowDate.value; d.setDate(d.getDate() + 1)) {
      const date = new Date(d);
      _range.push({
        date: date,
        isToday: isToday(d),
        isSaturday: isSaturday(d),
        isSunday: isSunday(d),
        isHolyday: false,
      });
    }

    return _range;
  });

  /**
   * 表示中のマイルストーンを返す
   */
  const milestone = computed(() => {
    return useMilestonesStore().milestones.find((value) => {
      return value.name === milestoneName.value;
    });
  });

  /**
   * 表示対象のマイルストーンIDを取得する
   */
  const milestoneId = computed(() => {
    return milestone.value?.id;
  });

  /**
   * プロジェクト名の監視
   */
  watch(
    () => route.params.project,
    (_) => {
      console.info(`change projectName ${route.params.project}`);
      const { project: params }: { project?: string } = route.params;
      projectName.value = params;
    },
    {
      deep: true,
      immediate: true,
    }
  );

  /**
   * マイルストーンの監視
   */
  watch(
    () => route.params.milestone,
    () => {
      console.info(`change milestoneName ${route.params.milestone}`);
      const { milestone: params }: { milestone?: string } = route.params;
      milestoneName.value = params;
    },
    {
      immediate: true,
    }
  );

  return {
    projectName,
    milestone,
    milestoneName,
    milestoneId,
    startShowDate,
    endShowDate,
    showRange,
    range,
    setCurrentDate,
    nextCurrentDate,
    prevCurrentDate,
    setShowRange,
  };
});
