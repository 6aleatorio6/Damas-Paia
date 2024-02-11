import optionsAuth from "@/lib/auth";
import nextAuth from "next-auth";

const handler = nextAuth(optionsAuth);

export { handler as GET, handler as POST };
