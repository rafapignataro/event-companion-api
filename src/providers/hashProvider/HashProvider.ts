export interface HashProvider {
  create: (string: string) => Promise<string>;
  compare: (string: string, hash: string) => Promise<boolean>;
}
