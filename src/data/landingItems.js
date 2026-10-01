const etiquetasEnv = process.env.NEXT_PUBLIC_ETIQUETAS || "";

export const ETIQUETAS = etiquetasEnv
  ? etiquetasEnv.split(',').map(label => ({ label: label.trim() }))
  : [];

export const LANDING_ITEMS = ETIQUETAS;

export function getEtiquetasForFilter() {
  return ETIQUETAS.map((item, idx) => ({
    codigo: idx + 1,
    nombre: item.label,
    nombreUnicode: item.label,
  }));
}
