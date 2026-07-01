export interface SnapshotMetadataDTO {
  title: string;
  slug: string;
  description: string | null;
  competitionType: string;
  visibility: string;
}

export interface SnapshotSectionDTO {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instructions: string | null;
  displayOrder: number;
  durationMinutes: number | null;
  totalQuestions: number;
  maximumMarks: number;
  passingMarks: number | null;
  isMandatory: boolean;
  allowNavigation: boolean;
}

export interface SnapshotQuestionDTO {
  id: string;
  originalQuestionId: string;
  sectionId: string | null;
  displayOrder: number;
  sectionOrder: number;
  marks: number;
  negativeMarks: number;
  questionWeight: number;
  difficultyOverride: string | null;
  timeLimitOverride: number | null;
  isOptional: boolean;
  isBonus: boolean;
  isMandatory: boolean;
  questionContent?: any;
}

export interface SnapshotRulesDTO {
  allowRetries: boolean;
  negativeMarkingEnabled: boolean;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
}

export interface SnapshotConfigDTO {
  economics: any;
  eligibility: any;
  certificates: any;
  rewards: any;
}

export interface CompetitionSnapshotDTO {
  metadata: SnapshotMetadataDTO;
  sections: SnapshotSectionDTO[];
  questions: SnapshotQuestionDTO[];
  rules: SnapshotRulesDTO;
  config: SnapshotConfigDTO;
}
