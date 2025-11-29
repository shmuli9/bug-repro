export interface User {
  id: string;
  name: string;
  email: string;
}

export function createUser(name: string, email: string): User {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
  };
}

export function formatUserName(user: User): string {
  return `${user.name} <${user.email}>`;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}