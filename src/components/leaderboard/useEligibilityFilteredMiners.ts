import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type MinerStats } from './types';

const ELIGIBLE_PARAM = 'eligible';

// Matches the `?eligible=true|false` param written by TopMinersTable so any
// sidebar surface stays in sync with the main table's eligibility filter.
export function useEligibilityFilteredMiners(
  miners: MinerStats[],
): MinerStats[] {
  const [searchParams] = useSearchParams();
  const eligibleParam = searchParams.get(ELIGIBLE_PARAM);

  return useMemo(() => {
    if (eligibleParam === 'true') {
      return miners.filter((m) => m.isEligible);
    }
    if (eligibleParam === 'false') {
      return miners.filter((m) => !m.isEligible);
    }
    return miners;
  }, [miners, eligibleParam]);
}
