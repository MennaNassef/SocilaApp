export function calculateAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);

    const currentYear = today.getFullYear();

    const thisYearBirthday = new Date(
    currentYear,
    birthDate.getMonth(),
    birthDate.getDate()
    );

    let age = currentYear - birthDate.getFullYear();
    if (today < thisYearBirthday) {
    age--;
    }

    return age;
}
