const checkPlural = (number: number) => number > 1 ? 's' : ''

export const calculateDiferenceData = (dataIso: Date) => {
  const date = Date.now();
  const dataPost = new Date(dataIso).getTime();

  const diffInMilliseconds = date - dataPost;
  const diffInWeeks = Math.floor(diffInMilliseconds / 604800000);
  if (diffInWeeks >= 1) {
    return `${diffInWeeks} semana${checkPlural(diffInWeeks)}`;
  }

  const diffInDays = Math.floor(diffInMilliseconds / 86400000);
  if (diffInDays >= 1) {
    return `${diffInDays} d`;
  }

  const diffInHours = Math.floor(diffInMilliseconds / 3600000);
  if (diffInHours >= 1) {
    return `${diffInHours} h`;
  }

  const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
  if (diffInMinutes >= 1) {
    return `${diffInMinutes} min`;
  }

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  return `${diffInSeconds} s`;
}