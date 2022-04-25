export class LocalStorageService {
  public static get<T>(key: string): T {
    const data = localStorage.getItem(key);

    return JSON.parse(data);
  }

  public static save(key: string, value: unknown): void {
    console.log('SAVE', value)
    console.log('SAVE', JSON.stringify(value))
    return localStorage.setItem(key, JSON.stringify(value));
  }

  public static remove(key: string): void {
    return localStorage.removeItem(key);
  }

  public static clearAll(): void {
    return localStorage.clear();
  }
}