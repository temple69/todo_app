//Function to convert 24 hour time to 12 hour time
export function convertTo12HourFormat(time24: string): string {
  // Split the input time string into hours and minutes
  const [hours, minutes] = time24.split(":").map(Number);

  // Determine if it's AM or PM
  const period = hours < 12 ? "am" : "pm";

  // Convert hours to 12-hour format
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;

  // Create the 12-hour time string
  const time12 = `${hours12}:${minutes.toString().padStart(2, "0")}${period}`;

  return time12;
}
//Function to get current date
export function getCurrentDate(): string {
  const currentDate: Date = new Date();
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth() + 1; // Months are zero-based
  const day: number = currentDate.getDate();

  // Pad single-digit months and days with a leading zero
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  // Return the current date in the format "YYYY-MM-DD"
  return `${year}-${formattedMonth}-${formattedDay}`;
}
//Function to convert ISO date to yyyy-mm-dd
export function convertISODateToYYYYMMDD(isoDate: string): string {
  const dateObj = new Date(isoDate);
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObj.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
