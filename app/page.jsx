import { redirect } from "next/navigation";
/* Homepage redirects to login page */
export default function Home() {
  return redirect("/login");
}
