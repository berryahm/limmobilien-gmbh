import { NextResponse } from "next/server";
import { valuate, valuateWithPriceHubble, type ValuationInput } from "@/lib/valuation";

export async function POST(req: Request) {
  const body = (await req.json()) as ValuationInput;
  // Versuche zuerst PriceHubble (falls API-Key gesetzt), sonst Hedonik.
  const ph = await valuateWithPriceHubble(body);
  const result = ph ?? valuate(body);
  return NextResponse.json(result);
}
