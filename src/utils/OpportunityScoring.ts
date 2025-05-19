
/**
 * Utility for calculating opportunity scores for institutions and funders
 * based on various factors that indicate potential value for transformative agreements
 */

// Weights for different factors in institution scoring
const INSTITUTION_WEIGHTS = {
  submissionCount: 0.25,   // Number of submissions indicates research volume
  oaRatio: 0.20,           // Ratio of OA to total accepted articles
  apcSpend: 0.30,          // Total spending on APCs
  acceptanceRate: 0.15,    // Acceptance rate indicates quality
  nonOaVolume: 0.10        // Volume of non-OA articles that could be converted
};

// Weights for different factors in funder scoring
const FUNDER_WEIGHTS = {
  totalFundedArticles: 0.25,  // Total research volume
  oaRatio: 0.20,              // Current OA adoption
  totalSpend: 0.30,           // Financial capacity
  subscriptionVolume: 0.25    // Potential for conversion to OA
};

/**
 * Calculate opportunity score for an institution
 * 
 * @param submissionCount Total number of submissions
 * @param acceptedCount Number of accepted articles
 * @param oaCount Number of open access articles
 * @param subscriptionCount Number of subscription articles
 * @param apcSpend Total APC spend
 * @returns A score from 0-100 representing opportunity value
 */
export const calculateInstitutionScore = (
  submissionCount: number,
  acceptedCount: number,
  oaCount: number,
  subscriptionCount: number,
  apcSpend: number
): number => {
  // Calculate normalized metrics (0-100 scale)
  
  // Volume metrics - using log scale to handle varied magnitudes
  const submissionScore = Math.min(100, 20 * Math.log10(submissionCount + 1));
  
  // Acceptance rate (quality indicator)
  const acceptanceRate = acceptedCount / submissionCount;
  const acceptanceScore = Math.min(100, acceptanceRate * 100 * 1.2); // Slight boost to acceptance
  
  // OA adoption metrics
  const oaRatio = oaCount / acceptedCount;
  const oaScore = oaRatio * 100;
  
  // Financial commitment
  const apcScore = Math.min(100, 15 * Math.log10(apcSpend + 1));
  
  // Potential for conversion 
  const nonOaScore = Math.min(100, 20 * Math.log10(subscriptionCount + 1));
  
  // Calculate weighted score
  const weightedScore = 
    INSTITUTION_WEIGHTS.submissionCount * submissionScore +
    INSTITUTION_WEIGHTS.acceptanceRate * acceptanceScore +
    INSTITUTION_WEIGHTS.oaRatio * oaScore +
    INSTITUTION_WEIGHTS.apcSpend * apcScore +
    INSTITUTION_WEIGHTS.nonOaVolume * nonOaScore;
  
  return Math.round(weightedScore);
};

/**
 * Calculate opportunity score for a funder
 * 
 * @param totalFundedArticles Total number of funded articles
 * @param oaArticles Number of open access articles
 * @param subscriptionArticles Number of subscription articles
 * @param totalSpend Total spending
 * @returns A score from 0-100 representing opportunity value
 */
export const calculateFunderScore = (
  totalFundedArticles: number,
  oaArticles: number,
  subscriptionArticles: number,
  totalSpend: number
): number => {
  // Calculate normalized metrics (0-100 scale)
  
  // Volume metrics
  const volumeScore = Math.min(100, 20 * Math.log10(totalFundedArticles + 1));
  
  // OA adoption metrics
  const oaRatio = oaArticles / totalFundedArticles;
  const oaScore = oaRatio * 100;
  
  // Financial capacity
  const spendScore = Math.min(100, 15 * Math.log10(totalSpend + 1));
  
  // Conversion potential
  const subscriptionScore = Math.min(100, 20 * Math.log10(subscriptionArticles + 1));
  
  // Calculate weighted score
  const weightedScore = 
    FUNDER_WEIGHTS.totalFundedArticles * volumeScore +
    FUNDER_WEIGHTS.oaRatio * oaScore +
    FUNDER_WEIGHTS.totalSpend * spendScore + 
    FUNDER_WEIGHTS.subscriptionVolume * subscriptionScore;
  
  return Math.round(weightedScore);
};
