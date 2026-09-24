export type SanctuaryTab = 
  | 'matcher'
  | 'microtools'
  | 'sisterhood'
  | 'specialists'
  | 'packages'
  | 'map'
  | 'vault';

export interface EmotionOption {
  id: string;
  label: string;
  subtitle: string;
  category: 'burnout' | 'anxiety' | 'grief' | 'motherhood' | 'career' | 'safety';
  iconName: string;
  color: string;
  borderColor: string;
  recommendedPackageId: string;
  recommendedTool: 'breathing' | 'grounding' | 'boundaries';
}

export interface PeerBuddy {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
  badge: string;
  experience: string;
  bio: string;
  verifiedOrg: string;
  location: string;
  available: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  slidingScale: string;
  telehealth: boolean;
  inPerson: boolean;
  location: string;
  bio: string;
  languages: string[];
  contactEmail: string;
}

export interface CrisisLine {
  id: string;
  name: string;
  country: string;
  callNumber: string;
  textNumber?: string;
  description: string;
  hours: string;
  freeConfidential: boolean;
}

export interface BoundaryScript {
  id: string;
  category: string;
  scenario: string;
  script: string;
  gentleVersion: string;
  firmVersion: string;
  contextNote: string;
}

export interface CarePackage {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  badgeColor: string;
  steps: {
    phase: string;
    action: string;
    details: string;
  }[];
  keyTakeaway: string;
}

export interface SanctuaryLocation {
  id: string;
  name: string;
  type: 'Clinic' | 'Shelter' | 'Legal Aid' | 'Community Center';
  address: string;
  city: string;
  state?: string;
  stateCode?: string;
  cityName?: string;
  country?: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  services: string[];
  confidential: boolean;
  cost: string;
  accessStatus: 'Open Access (Walk-ins Welcome)' | 'Free Crisis Intake (No Referral)' | '24/7 Confidential Safe Bed' | 'Free Legal Consult (By Phone or Walk-in)';
  accessGuarantees: string[];
  directionsUrl?: string;
}

export interface CarePlanResult {
  emotionalSummary: string;
  primaryReliefStep: string;
  recommendedTool: {
    id: 'breathing' | 'grounding' | 'boundaries';
    title: string;
    instructions: string;
  };
  matchedBuddy: PeerBuddy;
  matchedPackage: CarePackage;
  specialistOrHelpline: string;
  gentleAffirmation: string;
}

export interface JournalNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
}

export interface AdviceNode {
  id: string;
  title: string;
  domain: 'safety' | 'somatic' | 'relationships' | 'maternal' | 'career' | 'legal' | 'financial';
  domainLabel: string;
  iconName: string;
  badge: string;
  summary: string;
  xPercent: number; // For map canvas coordinates
  yPercent: number; // For map canvas coordinates
  coreAnchor: string;
  immediateStep: string;
  script?: string;
  warningSigns?: string[];
  recommendedAction: string;
  lifelineOrResource?: string;
  relatedPackageId?: string;
}
