export type ApplicationStatusChangePayload = {
  applicationId: number;
  status: string;
  closeApplicationDrawer: () => void;
};
