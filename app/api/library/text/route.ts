import {NextResponse} from "next/server";

// External, unrestricted rabbinic text retrieval is intentionally disabled.
// Restore only after individual sources receive founder doctrinal approval.
export async function GET(){
 return NextResponse.json(
  {error:"This external text library is unavailable. Explore our Messianic Scripture studies instead."},
  {status:410,headers:{"Cache-Control":"no-store"}}
 );
}
