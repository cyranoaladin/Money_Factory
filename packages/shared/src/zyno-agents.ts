// packages/shared/src/zyno-agents.ts

import { ProjectCanvas } from './zyno-data-models';

/**
 * Common Agent Input/Output interfaces
 */

// Risk Agent
export interface RiskAgentInput {
  agent: 'Risk';
  version: string;
  projectCanvas: ProjectCanvas;
  context?: {
    network?: 'solana-mainnet' | 'solana-testnet' | 'solana-devnet';
    projectStage?: 'idea' | 'prototype' | 'testnet' | 'mainnet';
    jurisdictionHint?: string;
  };
  constraints?: {
    maxItems?: number; // Default 20
    maxSeverity?: number; // 0-1 normalized, default 1.0
    [key: string]: any;
  };
}

export interface RiskAgentOutput {
  agent: 'Risk';
  version: string;
  summary: {
    overallSeverity: number; // Global normalized risk score 0-1
    technicalSeverity: number;
    marketSeverity: number;
    governanceSeverity: number;
    regulatorySeverity: number;
    operationalSeverity: number;
  };
  categories: Array<{
    category: 'technical' | 'market' | 'governance' | 'regulatory' | 'operational';
    severity: number;
    notes?: string;
  }>;
  items: Array<{
    id: string;
    category: 'technical' | 'market' | 'governance' | 'regulatory' | 'operational';
    title: string;
    description: string;
    severity: number; // Normalized 0-1
    likelihood: number; // 0-1 probability
    impact: 'low' | 'medium' | 'high' | 'critical';
    mitigation: string;
    relatedSections: Array<
      'overview' | 'architecture' | 'tokenomics' | 'governance' | 'gtm' | 'risk' | 'roadmap'
    >;
  }>;
  flags: {
    requiresExternalAudit: boolean;
    highRegulatoryUncertainty: boolean;
    needsLiquidityBackstop: boolean;
    suitableForRetail: boolean;
  };
}

// DAO Agent
export interface DAOAgentInput {
  agent: 'DAO';
  version: string;
  proposal: {
    proposalId: string;
    proposalType: 'funding' | 'parameter-change' | 'launch-approval' | 'tokenomics-change' | 'rwa-structure-change' | 'other';
    title: string;
    description: string;
    parameters: Record<string, any>; // Typed key/value depending on proposalType
    requestedAmountUsd?: number;
    targetTgeDate?: string; // ISO datetime
  };
  projectCanvas: ProjectCanvas;
  riskSummary?: RiskAgentOutput['summary'];
  voterProfile?: {
    stakeAmount: number;
    skillScore: number; // Aggregate score from Proof-of-Skill NFTs
    riskTolerance: 'low' | 'medium' | 'high';
    focusAreas?: Array<'defi' | 'rwa' | 'gaming' | 'infra' | 'education' | 'other'>;
  };
}

export interface DAOAgentOutput {
  agent: 'DAO';
  version: string;
  recommendation: {
    vote: 'yes' | 'no' | 'abstain' | 'conditional-yes';
    confidence: number; // 0-1 model confidence
  };
  reasoning: {
    summary: string; // Executive summary
    pros: string[];
    cons: string[];
    riskAlignment: string; // How decision aligns with RiskAgent assessment
    treasuryImpact: string; // Impact on treasury and long-term sustainability
  };
  amendments?: Array<{
    field: string; // e.g. 'parameters.treasuryAllocation'
    suggestedChange: string; // Human-readable description
    rationale: string;
    priority: 'low' | 'medium' | 'high';
  }>;
  governanceImpact: {
    changesQuorum: boolean;
    changesVotingWeights: boolean;
    introducesNewRole: boolean;
    notes?: string;
  };
}

// CFO Agent
export interface CFOAgentInput {
  agent: 'CFO';
  version: string;
  tokenomicsModel: {
    tokenSymbol: string;
    tokenName: string;
    decimals: number;
    network: 'solana-mainnet' | 'solana-testnet' | 'solana-devnet';
    totalSupply: number;
    tgePriceUsd?: number; // If provided, FDV will be calculated
    initialCirculatingSupply?: number;
    fdvAtTgeUsd?: number; // If not provided, calculated as totalSupply * tgePriceUsd
    liquidityPoolPlan: {
      initialDexLiquidityUsd: number;
      targetDexPairs: string[]; // e.g. 'TOKEN/SOL', 'TOKEN/USDC'
      mmProvider?: string; // Optional name of MM provider or 'internal'
    };
    allocations: Array<{
      category: 'team' | 'investors' | 'treasury' | 'community' | 'liquidity' | 'ecosystem' | 'airdrop' | 'advisors' | 'partners' | 'other';
      label?: string; // Optional display name (e.g. 'Seed investors', 'Strategic round')
      amount: number; // Raw token amount allocated to this bucket
      sharePercent: number; // Percentage of total supply for this bucket
      vesting: {
        type: 'immediate' | 'cliff-linear' | 'linear' | 'custom';
        tgeUnlockedPercent: number; // Percentage of this bucket unlocked at TGE
        cliffMonths?: number; // Cliff duration before any unlock (if applicable)
        vestingMonths?: number; // Total vesting duration after cliff
        customSchedule?: Array<{
          monthOffset: number;
          percentUnlocked: number;
        }>;
      };
    }>;
  };
  marketContext?: {
    projectStage?: 'idea' | 'prototype' | 'testnet' | 'mainnet';
    sector?: 'defi' | 'rwa' | 'gaming' | 'infrastructure' | 'nft' | 'social' | 'other';
    benchmarksFdvUsd?: number[]; // Optional FDV benchmarks for similar projects
    [key: string]: any;
  };
  constraints?: {
    maxFdvAtTgeUsd?: number;
    maxTeamSharePercent?: number;
    maxInvestorSharePercent?: number;
    minCommunitySharePercent?: number;
    minTeamCliffMonths?: number;
    minTeamVestingMonths?: number;
    maxTgeUnlockedPercentTeam?: number;
    minLiquidityUsdAtTge?: number;
    [key: string]: any;
  };
}

export interface CFOAgentOutput {
  agent: 'CFO';
  version: string;
  summary: {
    sustainabilityScore: number; // Global sustainability score (0-1)
    dilutionRiskScore: number; // Dilution risk for existing holders (0-1)
    liquidityAdequacyScore: number; // How adequate the liquidity plan is vs. FDV
    insiderConcentrationScore: number; // Concentration of supply among team/investors (1=high)
    retailFriendlinessScore: number; // How safe the structure is for non-professional participants
  };
  checks: Array<{
    id: string; // Stable identifier (e.g. 'FDV_CAP', 'TEAM_VESTING')
    type: 'fdv' | 'allocation' | 'vesting' | 'liquidity' | 'concentration' | 'other';
    status: 'pass' | 'warn' | 'fail';
    severity: number; // Importance of this check in the global evaluation
    message: string;
    details?: Record<string, number | string>; // Optional structured details
  }>;
  flags: {
    fdvTooHighForStage: boolean;
    teamShareTooHigh: boolean;
    investorShareTooHigh: boolean;
    communityShareTooLow: boolean;
    teamVestingTooShort: boolean;
    aggressiveTgeUnlocks: boolean;
    insiderConcentrationHigh: boolean;
    liquidityInsufficient: boolean;
  };
  notes?: {
    builderGuidance?: string; // Suggestions for the core team
    daoGuidance?: string; // How DAO should interpret these results
    growthGuidance?: string; // Implications for marketing/launch strategy
  };
}