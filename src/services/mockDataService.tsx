
import { Institution, Funder, Article, DashboardStats } from "@/types/dashboard";
import { calculateInstitutionScore, calculateFunderScore } from "@/utils/opportunityScoring";

// Raw institution data without scores
const institutionsData = [
  {
    id: 1,
    name: "University of Cambridge",
    country: "UK",
    submissionCount: 1245,
    acceptedCount: 982,
    oaCount: 675,
    subscriptionCount: 307,
    apcSpend: 1350000,
    hasExistingDeal: true,
  },
  {
    id: 2,
    name: "Stanford University",
    country: "USA",
    submissionCount: 1102,
    acceptedCount: 876,
    oaCount: 523,
    subscriptionCount: 353,
    apcSpend: 1120000,
    hasExistingDeal: true,
  },
  {
    id: 3,
    name: "Max Planck Society",
    country: "Germany",
    submissionCount: 987,
    acceptedCount: 812,
    oaCount: 704,
    subscriptionCount: 108,
    apcSpend: 1405000,
    hasExistingDeal: true,
  },
  {
    id: 4,
    name: "University of Tokyo",
    country: "Japan",
    submissionCount: 865,
    acceptedCount: 701,
    oaCount: 342,
    subscriptionCount: 359,
    apcSpend: 684000,
    hasExistingDeal: false,
  },
  {
    id: 5,
    name: "ETH Zurich",
    country: "Switzerland",
    submissionCount: 743,
    acceptedCount: 598,
    oaCount: 402,
    subscriptionCount: 196,
    apcSpend: 804000,
    hasExistingDeal: false,
  },
  {
    id: 6,
    name: "National University of Singapore",
    country: "Singapore",
    submissionCount: 621,
    acceptedCount: 512,
    oaCount: 287,
    subscriptionCount: 225,
    apcSpend: 574000,
    hasExistingDeal: false,
  }
];

// Raw funder data without scores
const fundersData = [
  {
    id: 1,
    name: "Wellcome Trust",
    country: "UK",
    type: "NGO" as const,
    totalFundedArticles: 1580,
    oaArticles: 1432,
    subscriptionArticles: 148,
    totalSpend: 2864000,
    hasExistingDeal: true,
  },
  {
    id: 2,
    name: "National Science Foundation",
    country: "USA",
    type: "Government" as const,
    totalFundedArticles: 2345,
    oaArticles: 1623,
    subscriptionArticles: 722,
    totalSpend: 3246000,
    hasExistingDeal: false,
  },
  {
    id: 3,
    name: "European Research Council",
    country: "EU",
    type: "Government" as const,
    totalFundedArticles: 1876,
    oaArticles: 1652,
    subscriptionArticles: 224,
    totalSpend: 3304000,
    hasExistingDeal: true,
  },
  {
    id: 4,
    name: "Bill & Melinda Gates Foundation",
    country: "USA",
    type: "Private" as const,
    totalFundedArticles: 964,
    oaArticles: 964,
    subscriptionArticles: 0,
    totalSpend: 1928000,
    hasExistingDeal: true,
  },
  {
    id: 5,
    name: "Japan Society for the Promotion of Science",
    country: "Japan",
    type: "Government" as const,
    totalFundedArticles: 1245,
    oaArticles: 743,
    subscriptionArticles: 502,
    totalSpend: 1486000,
    hasExistingDeal: false,
  }
];

// Calculate opportunity scores and create final institutions array
export const institutions: Institution[] = institutionsData.map(inst => ({
  ...inst,
  opportunityScore: calculateInstitutionScore(
    inst.submissionCount,
    inst.acceptedCount,
    inst.oaCount,
    inst.subscriptionCount,
    inst.apcSpend
  )
}));

// Calculate opportunity scores and create final funders array
export const funders: Funder[] = fundersData.map(funder => ({
  ...funder,
  opportunityScore: calculateFunderScore(
    funder.totalFundedArticles,
    funder.oaArticles,
    funder.subscriptionArticles,
    funder.totalSpend
  )
}));

// Dashboard stats
export const dashboardStats: DashboardStats = {
  totalSubmissions: 42567,
  totalAccepted: 32154,
  totalOA: 18934,
  totalSubscription: 13220,
  totalAPCRevenue: 37868000,
  totalWaivedAmount: 12450000
};

// Simulated API services
export const fetchInstitutions = async (): Promise<Institution[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(institutions);
    }, 300);
  });
};

export const fetchFunders = async (): Promise<Funder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(funders);
    }, 300);
  });
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboardStats);
    }, 300);
  });
};

// License distribution data for charts
export const getLicenseDistribution = () => {
  return [
    { name: "CC BY", value: 65 },
    { name: "CC BY-NC", value: 20 },
    { name: "CC BY-ND", value: 8 },
    { name: "CC BY-NC-ND", value: 7 }
  ];
};

// Journal type distribution data for charts
export const getJournalTypeDistribution = () => {
  return [
    { name: "Full OA", value: 42 },
    { name: "Hybrid", value: 58 }
  ];
};

// APC spend trend data for charts
export const getAPCTrendData = () => {
  return [
    { month: "Jan", amount: 2400 },
    { month: "Feb", amount: 1398 },
    { month: "Mar", amount: 9800 },
    { month: "Apr", amount: 3908 },
    { month: "May", amount: 4800 },
    { month: "Jun", amount: 3800 },
    { month: "Jul", amount: 4300 }
  ];
};
