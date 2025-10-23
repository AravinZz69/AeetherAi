// Authorized admin email addresses
export const ADMIN_EMAILS = [
  'aravindz9790@gmail.com',
  'deekshithabonthu15@gmail.com',
  'anuradhazzz@gmail.com', // Note: lowercase for consistency
] as const;

export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase() as any);
};
