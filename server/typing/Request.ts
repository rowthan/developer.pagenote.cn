import {VercelRequest} from "@vercel/node";

type ExtensionInfo = {
    auth_user_token: string
}
export type BasicRequest = VercelRequest & ExtensionInfo

