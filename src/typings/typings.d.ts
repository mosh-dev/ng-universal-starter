type DayOfTheWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
type WeekMap<T = number | string> = Partial<{ [day in DayOfTheWeek]: T }>;

export interface ObjectMap<T = any> {
  [key: string]: T;
}
