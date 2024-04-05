export type UpgradeType = 'one-time' | 'monthly';

export type VariantIdsByType = {
  [key in UpgradeType]: string;
};
