import { redirect, json } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface tokenResponse {
  token: string;
};

export function tokenLoader(): Response {
  const token = getAuthToken();
  if (!token) return redirect('/Authentification?mode=login');
  if (token === 'EXPIRED') return redirect('/Authentification?mode=login');
  return json({ token });
}

export function getAuthToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration <= 0) {
    return 'EXPIRED';
  }
  return token;
}

interface jwt {
  dataValues: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    photo: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function getId(): string | null {
  const token = getAuthToken();
  if (!token) return null;

  const decodedToken = jwtDecode<jwt>(token);
  return decodedToken.dataValues.id || null;
}

function getTokenDuration(): number {
  const storedExpiration = localStorage.getItem('expiration');
  let duration = -1;
  if (storedExpiration !== null) {
    const expirationDate = new Date(storedExpiration);
    const now = new Date();
    duration = expirationDate.getTime() - now.getTime();
  }
  return duration;
}