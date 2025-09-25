'use server'

import { cookies } from "next/headers"

export async function getAuthToken() {
    const cookieStore = await cookies()
    const key = process.env.CPS_TK ?? "cps_p_tk"
    const authToken = cookieStore.get(key)?.value
    return { authToken }
}
