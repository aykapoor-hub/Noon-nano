/** Resolve a public asset path respecting the deploy base (e.g. GitHub Pages subpath). */
export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`
