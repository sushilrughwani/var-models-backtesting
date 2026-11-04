"use client";
/**
 * MOCK authentication.
 *
 * A role switcher (Guest / Student / Instructor) stores a fake session in localStorage.
 * There is NO real security here: route guards are client-side only.
 *
 * INTEGRATION: replace with a real auth provider (e.g. Auth.js / NextAuth, Clerk, Supabase Auth or
 * Firebase Auth). Sessions must be verified server-side (middleware + server components) and the
 * role must come from the database, never from the client.
 */
import { KEYS, storage } from "@/lib/storage";
import { useStored } from "@/lib/storage/useStored";

export type Role = "guest" | "student" | "instructor";

export interface Session {
  role: Role;
  name: string;
  email: string;
  signedInAt?: string;
}

export const GUEST: Session = { role: "guest", name: "Guest", email: "" };

export const DEMO_USERS: Record<Exclude<Role, "guest">, Session> = {
  student: { role: "student", name: "Demo Student", email: "student@example.com" },
  instructor: { role: "instructor", name: "[INSTRUCTOR NAME]", email: "instructor@example.com" },
};

export interface AuthProvider {
  getSession(): Session;
  signIn(role: Exclude<Role, "guest">, overrides?: Partial<Session>): Session;
  signOut(): void;
}

export const mockAuth: AuthProvider = {
  getSession: () => storage.get<Session>(KEYS.auth, GUEST),
  signIn(role, overrides) {
    // INTEGRATION: call the real sign-in flow (email magic link / OAuth / password) here.
    const s: Session = { ...DEMO_USERS[role], ...overrides, signedInAt: new Date().toISOString() };
    storage.set(KEYS.auth, s);
    return s;
  },
  signOut() {
    // INTEGRATION: revoke the server session / clear auth cookies.
    storage.set(KEYS.auth, GUEST);
  },
};

export function useSession(): Session {
  const [s] = useStored<Session>(KEYS.auth, GUEST);
  return s;
}

/** Instructors can see the student area too (to preview the learner experience). */
export function canAccess(role: Role, area: "student" | "instructor"): boolean {
  if (area === "instructor") return role === "instructor";
  return role === "student" || role === "instructor";
}
