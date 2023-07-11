/**
 * POST /sch_npc/senior
 */

interface Seat {
  seat: string;
}

export interface TransactionFormProps {
  seat: Seat[];
}
