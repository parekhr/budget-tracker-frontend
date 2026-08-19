const CATEGORY_COLORS: Record<string, string> = {
    pink: "bg-pink-500/20 text-pink-300",
    green: "bg-green-500/20 text-green-300",
    blue: "bg-blue-500/20 text-blue-300",
    purple: "bg-purple-500/20 text-purple-300",
    orange: "bg-orange-500/20 text-orange-300",
};

const DEFAULT_COLOR = "bg-white/10 text-gray-300";

export function getCategoryBadgeClasses(color: string): string {
    return CATEGORY_COLORS[color] ?? DEFAULT_COLOR;
}