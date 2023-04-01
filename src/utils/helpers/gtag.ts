// 조회수 측정
export const pageview = (url: URL) => {
  if (typeof window === undefined) return;

  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};

// 이벤츠 측정
export const event = ({
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
  if (typeof window === undefined) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
