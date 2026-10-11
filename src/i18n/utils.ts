import { translations, type Language } from "./translations";

export const languages = ["es", "en", "fr"] as const;
export const defaultLang: Language = "es";

// BASE_URL sin barra final ("" en Netlify, "/viktor-portfolio" en GitHub Pages)
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const isLang = (value: string | undefined): value is Language =>
    !!value && (languages as readonly string[]).includes(value);

/** Quita el base y devuelve la ruta interna: "/en/projects/3D-gallery/" */
const stripBase = (pathname: string) =>
    pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;

/** Idioma según el primer segmento de la URL (/es, /en, /fr). */
export function getLangFromUrl(url: URL): Language {
    const seg = stripBase(url.pathname).split("/")[1];
    return isLang(seg) ? seg : defaultLang;
}

/** Textos del idioma de la URL actual. */
export const useTranslations = (url: URL) => translations[getLangFromUrl(url)];

/** localePath("en", "/projects/3D-gallery/") -> "/en/projects/3D-gallery/" */
export function localePath(lang: Language, path = "/") {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `${base}/${lang}${clean}`;
}

/** Misma página en otro idioma: switchLangPath(Astro.url, "fr") */
export function switchLangPath(url: URL, lang: Language) {
    const [, first, ...rest] = stripBase(url.pathname).split("/");
    const tail = isLang(first) ? `/${rest.join("/")}` : stripBase(url.pathname);
    return localePath(lang, tail);
}
