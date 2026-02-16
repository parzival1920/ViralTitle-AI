export interface TitleResult {
  title: string;
  ctrScore: number;
  tags?: string[];
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  results: TitleResult[];
}