
export interface Institution {
  id: number;
  name: string;
  country: string;
  department?: string;
  submissionCount: number;
  acceptedCount: number;
  oaCount: number;
  subscriptionCount: number;
  apcSpend: number;
  hasExistingDeal: boolean;
  opportunityScore: number;
}

export interface Funder {
  id: number;
  name: string;
  country: string;
  type: 'Government' | 'Private' | 'NGO' | 'Academic';
  totalFundedArticles: number;
  oaArticles: number;
  subscriptionArticles: number;
  totalSpend: number;
  hasExistingDeal: boolean;
  opportunityScore: number;
}

export interface Article {
  id: number;
  title: string;
  journal: string;
  publishDate: string;
  authors: string[];
  institutionIds: number[];
  funderIds: number[];
  licenseType: 'CC BY' | 'CC BY-NC' | 'CC BY-ND' | 'CC BY-NC-ND' | 'Subscription';
  oaStatus: 'Hybrid' | 'Full OA' | 'Subscription';
  apcAmount: number;
  apcWaived: boolean;
  apcDiscount: number;
}

export interface DashboardStats {
  totalSubmissions: number;
  totalAccepted: number;
  totalOA: number;
  totalSubscription: number;
  totalAPCRevenue: number;
  totalWaivedAmount: number;
}
