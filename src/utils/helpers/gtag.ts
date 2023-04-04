// 조회수 측정
export const measurePageViewByGTag = (url: URL) => {
  gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};

// 이벤트 측정
export const measureEventTriggerByGTag = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
