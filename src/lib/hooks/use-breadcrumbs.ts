"use client"

import {usePathname} from "next/navigation"
import {RouteItem, routes} from "@/lib/constants/routes"

export type Crumb = {
    href: string
    label: string
    isLast: boolean
}

function matchPath(pathname: string, routePath: string): boolean {
    if (routePath.includes("[")) {
        const base = routePath.split("/[")[0]
        return pathname.startsWith(base)
    }
    return pathname === routePath
}

function findRoutePath(routes: RouteItem[], pathname: string): RouteItem[] {
    for (const route of routes) {
        if (matchPath(pathname, route.path)) return [route]
        if (route.children) {
            const childPath = findRoutePath(route.children, pathname)
            if (childPath.length) return [route, ...childPath]
        }
    }
    return []
}

export function useBreadcrumbs(): Crumb[] {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)
    const matchedRoutes = findRoutePath(routes, pathname) || []

    const hasHome = matchedRoutes.some(r => r.path === "/")

    return [
        ...(!hasHome ? [{href: "/", label: "Trang chủ", isLast: matchedRoutes.length === 0}] : []),
        ...matchedRoutes.map((route, index) => {
            let label = route.label
            let href = route.path

            if (route.path.includes("[id]") || route.path.includes("[slug]")) {
                label = segments[segments.length - 1]
                href = pathname
            }

            return {
                href,
                label,
                isLast: index === matchedRoutes.length - 1,
            }
        }),
    ]
}
