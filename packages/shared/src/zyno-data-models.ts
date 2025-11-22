// packages/shared/src/zyno-data-models.ts

/**
 * Journey Context
 */
export interface JourneyContext {
  userId: string;
  journeyId: string;
  currentPhase: 'learn' | 'build' | 'govern' | 'launch';
  completedSteps: string[];
  userSkills: string[];
  xp: number;
  profile: {
    persona: 'web2-entrepreneur' | 'web3-builder' | 'learner' | 'investor' | 'agency';
    goals: string[];
  };
  metadata?: {
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Generic UIBlock
 */
export interface UIBlock {
  type: 'TextBlock' | 'QuizBlock' | 'MissionBlock' | 'CanvasBlock' | 'TableBlock' | 'CodeBlock';
  id: string;
  title: string;
  payload: any;
  metadata: {
    phase: 'learn' | 'build' | 'govern' | 'launch';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags?: string[];
  };
}

export interface TextBlockPayload {
  markdown: string;
}

export interface QuizBlockPayload {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface MissionBlockPayload {
  description: string;
  steps: string[];
  expectedEvidence: string[];
}

export interface CanvasBlockPayload {
  section: string;
  data: any;
}

export interface TableBlockPayload {
  columns: string[];
  rows: any[][];
}

export interface CodeBlockPayload {
  language: string;
  code: string;
}

/**
 * Project Canvas Model
 */
export interface ProjectCanvas {
  projectId: string;
  ownerUserId: string;
  title: string;
  shortDescription: string;
  chain: 'solana';
  category: 'dex' | 'lending' | 'rwa' | 'gaming' | 'infra' | 'other';
  sections: {
    overview: {
      problem: string;
      solution: string;
      valueProposition: string;
      targetUsers: string[];
    };
    architecture: {
      highLevelDiagram: string; // markdown-or-diagram-ref
      smartContracts: string[];
      externalProtocols: string[];
    };
    tokenomics: {
      supply: number;
      ticker: string;
      allocations: Array<{
        name: string;
        percentage: number;
        tokens: number;
      }>;
      vesting: Array<{
        group: string;
        cliffMonths: number;
        vestingMonths: number;
      }>;
      bondingCurve?: {
        enabled: boolean;
        reserveRatio: number;
        initialReserveUsd: number;
      };
    };
    governance: {
      daoModel: 'token-weighted' | 'quadratic' | 'soulbound-weighted' | 'hybrid';
      quorum: number;
      approvalThreshold: number;
      timelockHours: number;
    };
    gtm: {
      channels: string[];
      launchPhases: string[];
      keyMetrics: string[];
    };
    risk: {
      technicalRisks: string[];
      marketRisks: string[];
      regulatoryRisks: string[];
    };
    roadmap: {
      milestones: Array<{
        name: string;
        targetDate: string;
      }>;
    };
  };
  status: 'draft' | 'submitted-to-dao' | 'approved' | 'rejected';
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Generic Agent Envelope
 */
export interface AgentEnvelope<TInput, TOutput> {
  agentName: string;
  agentVersion: string;
  requestId?: string;
  input?: TInput;
  output?: TOutput;
  meta?: AgentMeta;
}

export interface AgentMeta {
  timestamp: string;
  latencyMs?: number;
  source: 'api' | 'simulator-journey' | 'batch-test' | 'internal' | 'other';
  userId?: string;
  journeyId?: string;
}