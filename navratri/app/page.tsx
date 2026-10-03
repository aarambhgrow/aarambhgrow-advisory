import { redirect } from "next/navigation";

/** The project is a single experiment, so the root simply opens it. */
export default function Home() {
  redirect("/navratri-demo");
}
