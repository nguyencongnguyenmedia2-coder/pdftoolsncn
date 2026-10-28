export type FeatureStatus = 'available' | 'requires_office' | 'requires_ocr' | 'beta' | 'coming_soon';

export type FeatureGroupId =
  | 'manage'
  | 'edit'
  | 'convert'
  | 'optimize'
  | 'security';

export interface FeatureItem {
  id: string;
  slug?: string;
  groupId: FeatureGroupId;
  groupName: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  status: FeatureStatus;
  statusLabel: string;
  dependencyNote?: string;
  highlights: string[];
  steps?: string[];
  mockPreviewType?: 'merge' | 'split' | 'organize' | 'compress' | 'convert' | 'watermark' | 'ocr' | 'security';
}

export interface ReleaseConfig {
  productName: string;
  publisher: string;
  version: string;
  releaseDate: string;
  installerUrl: string;
  fileSize: string;
  fileSizeBytes: number;
  supportedWindows: string;
  architecture: string;
  sha256: string;
  releaseNotesUrl: string;
  downloadAvailable: boolean;
  minimumRequirements: {
    os: string;
    cpu: string;
    ram: string;
    disk: string;
    runtime: string;
    optionalEngines: string[];
  };
  highlights: string[];
}

export interface FAQItem {
  id: string;
  category: 'general' | 'privacy' | 'features' | 'engines' | 'system';
  question: string;
  answer: string;
}

export interface GuideArticle {
  id: string;
  title: string;
  summary: string;
  icon: string;
  requirementBadge: string;
  steps: {
    title: string;
    detail: string;
  }[];
  tips?: string[];
}

export interface ChangelogRelease {
  version: string;
  date: string;
  badge: string;
  summary: string;
  added: string[];
  improved: string[];
  fixed: string[];
}

export interface UseCaseItem {
  id: string;
  role: string;
  icon: string;
  headline: string;
  description: string;
  tasks: string[];
  recommendedTools: string[];
  ctaText: string;
  ctaHref: string;
}

