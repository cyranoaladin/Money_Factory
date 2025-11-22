// packages/shared/src/zyno-error-types.ts

export type ZynoErrorSeverity = 'error' | 'warning';

export type ZynoErrorDomain = 'cfo' | 'risk' | 'dao';

/**
 * CFO-specific policy error codes (déjà défini précédemment).
 */
export enum CfoPolicyErrorCode {
  MAX_FDV_EXCEEDED = 'MAX_FDV_EXCEEDED',
  MIN_FDV_NOT_MET = 'MIN_FDV_NOT_MET',

  MAX_TEAM_SHARE_EXCEEDED = 'MAX_TEAM_SHARE_EXCEEDED',
  MIN_TEAM_SHARE_NOT_MET = 'MIN_TEAM_SHARE_NOT_MET',

  MIN_COMMUNITY_SHARE_NOT_MET = 'MIN_COMMUNITY_SHARE_NOT_MET',
  MAX_INVESTOR_SHARE_EXCEEDED = 'MAX_INVESTOR_SHARE_EXCEEDED',

  LOW_LIQUIDITY_AT_TGE = 'LOW_LIQUIDITY_AT_TGE',
  SHORT_TEAM_VESTING = 'SHORT_TEAM_VESTING',

  INVALID_PROFILE_ID = 'INVALID_PROFILE_ID',
  INVALID_TOKENOMICS_MODEL = 'INVALID_TOKENOMICS_MODEL'
}

/**
 * Risk-specific policy error codes.
 * Convention i18n : "errors.risk.<CODE>"
 */
export enum RiskPolicyErrorCode {
  INSUFFICIENT_AUDIT_COVERAGE = 'INSUFFICIENT_AUDIT_COVERAGE',
  NO_PAUSE_MECHANISM = 'NO_PAUSE_MECHANISM',
  SINGLE_ORACLE_DEPENDENCY = 'SINGLE_ORACLE_DEPENDENCY',
  HIGH_LTV_THRESHOLD = 'HIGH_LTV_THRESHOLD',
  PRIVILEGED_ROLE_RISK = 'PRIVILEGED_ROLE_RISK',
  NO_BUG_BOUNTY_PROGRAM = 'NO_BUG_BOUNTY_PROGRAM',
  MISSING_MONITORING_ALERTS = 'MISSING_MONITORING_ALERTS'
}

/**
 * DAO-specific policy error codes.
 * Convention i18n : "errors.dao.<CODE>"
 */
export enum DaoPolicyErrorCode {
  LOW_QUORUM_THRESHOLD = 'LOW_QUORUM_THRESHOLD',
  LOW_PROPOSAL_THRESHOLD = 'LOW_PROPOSAL_THRESHOLD',
  SHORT_TIMELOCK_DURATION = 'SHORT_TIMELOCK_DURATION',
  TREASURY_SINGLE_SIGNER = 'TREASURY_SINGLE_SIGNER',
  CONCENTRATED_VOTING_POWER = 'CONCENTRATED_VOTING_POWER',
  DELEGATION_DISABLED = 'DELEGATION_DISABLED',
  MISSING_EMERGENCY_SHUTDOWN = 'MISSING_EMERGENCY_SHUTDOWN'
}

/**
 * Union globale de tous les codes "policy".
 */
export type ZynoPolicyErrorCode =
  | CfoPolicyErrorCode
  | RiskPolicyErrorCode
  | DaoPolicyErrorCode;

/**
 * Issue standardisée, réutilisable par CFO / Risk / DAO.
 */
export interface ZynoPolicyIssue {
  domain: ZynoErrorDomain;           // "cfo" | "risk" | "dao"
  code: ZynoPolicyErrorCode;        // ex: CfoPolicyErrorCode.MAX_FDV_EXCEEDED
  field?: string;                   // ex: "riskConfig.ltvMax"
  severity: ZynoErrorSeverity;      // "error" ou "warning"
  i18nKey: string;                  // ex: "errors.risk.HIGH_LTV_THRESHOLD"
  params?: Record<string, number | string>;
  message?: string;                 // fallback (anglais)
}