import {NextResponse} from "next/server";

// Rabbinic scholarship is welcome as historical evidence, but the public
// endpoint must never proxy arbitrary, unreviewed external commentary.
// Only individually approved, attributed, licensed excerpts may be enabled.
export async function GET(){
 return NextResponse.json(
  {error:"Curated rabbinic excerpts are awaiting source and editorial approval. Scripture study remains available."},
  {status:410,headers:{"Cache-Control":"no-store"}}
 );
}
