import type { CSSProperties } from "react";

export function getCategoryColorStyle(color: string): CSSProperties {
    return {
        backgroundColor: `${color}33`,
        color,
    };
}
