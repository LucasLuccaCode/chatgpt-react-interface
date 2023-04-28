export const getNameInitials = (fullName: string) => {
  const names = fullName.split(" ");

  if (names.length === 1) {
    return names[0][0];
  }
  
  const firstName = names[0];
  const lastName = names[names.length - 1];
  const initials = `${firstName[0]}${lastName[0]}`;
  return initials.toUpperCase();
}