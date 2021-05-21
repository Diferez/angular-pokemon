export function getGender(): string {
  let gender = Math.floor(Math.random() * 9) - 1;
  if(gender > 4) {
    return 'Female';
  }else if(gender > -1) {
    return 'Male';
  }
  return 'Genderless';
}