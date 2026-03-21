export const formatDate = (date?: string | null) => {
  if (!date) return 'Nunca'

  const d = new Date(date)
  if (isNaN(d.getTime())) return 'Fecha inválida'

  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}
