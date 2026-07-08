export interface CommunicationDashboardReadModel {
  totalDelivered: number;
  openRate: string;
  activeCampaigns: number;
  healthScore: string;
}

export interface InboxReadModel {
  id: string;
  subject: string;
  preview: string;
  isRead: boolean;
  date: Date;
}

export interface TemplateReadModel {
  id: string;
  name: string;
  version: string;
  type: string;
}

export interface CampaignReadModel {
  id: string;
  name: string;
  status: string;
  progress: number;
}
