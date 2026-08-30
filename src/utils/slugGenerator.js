/**
 * Genera un slug SEO-friendly a partir del nombre de un producto
 * @param {string} nombre - El nombre del producto
 * @returns {string} - El slug generado
 */
export function generateSlug(nombre) {
    if (!nombre) return '';

    return nombre
        .toLowerCase()
        .trim()
        // Reemplazar espacios con guiones
        .replace(/\s+/g, '-')
        // Remover caracteres especiales excepto guiones
        .replace(/[^a-z0-9\-]/g, '')
        // Reemplazar múltiples guiones consecutivos con uno solo
        .replace(/-+/g, '-')
        // Remover guiones al inicio y final
        .replace(/^-+|-+$/g, '');
}

/**
 * Genera la URL completa del producto con slug para usar en href
 * @param {string} codigo - El código del producto
 * @param {string} nombre - El nombre del producto
 * @returns {string} - La URL completa para href (ej: "/Productos/P323/sello-s-842-3x4")
 */
export function getProductHref(codigo, nombre) {
    if (!codigo) return '/Productos';
    if (!nombre) return `/Productos/${codigo}`;

    const slug = generateSlug(nombre);
    return `/Productos/${codigo}/${slug}`;
}
