import { WorkOS } from "@workos-inc/node";

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const workosClientId = process.env.WORKOS_CLIENT_ID;

export default workos;
export { workosClientId };
