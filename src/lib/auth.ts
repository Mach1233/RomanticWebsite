import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('romantic-love-secret-key-2024-houda-special');
const COOKIE_NAME = 'love_session';

export interface SessionData {
  username: string;
  isAuthenticated: boolean;
}

// Valid credentials (stored securely on server)
const VALID_CREDENTIALS = {
  username: 'houda',
  password: '30072020'
};

export async function createSession(username: string): Promise<string> {
  const session: SessionData = {
    username,
    isAuthenticated: true
  };

  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET_KEY);

  return token;
}

export async function verifySession(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as SessionData;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  
  if (!token) return null;
  
  return verifySession(token);
}

export async function login(username: string, password: string): Promise<{ success: boolean; message: string; token?: string }> {
  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    const token = await createSession(username);
    return { 
      success: true, 
      message: 'Welcome to our love story, my dear...', 
      token 
    };
  }
  
  return { 
    success: false, 
    message: 'This heart beats only for one special person...' 
  };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export { COOKIE_NAME };
