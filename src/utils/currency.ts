export function formatAxisCurrency(value: number): string {
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toLocaleString(undefined, { maximumFractionDigits: 1 })}B`
    if (value >= 1_000_000) return `$${(value / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M`
    if (value >= 1_000) return `$${(value / 1_000).toLocaleString(undefined, { maximumFractionDigits: 1 })}k`
    return `$${value.toLocaleString()}`
}
