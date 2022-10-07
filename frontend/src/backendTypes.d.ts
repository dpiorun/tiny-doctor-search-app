export interface Paginated<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  facility: string;
  city: string;
  areaOfExpertise: string;
}
