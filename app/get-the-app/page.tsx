import {redirect} from "next/navigation";

// Keep older Get the App links working while maintaining one install experience.
export default function GetTheApp(){
  redirect("/get-app");
}
