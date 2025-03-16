import { createAuth0Client } from '@auth0/auth0-spa-js';

const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE
  },
  cacheLocation: 'localstorage'
};

let auth0Client;

export const initAuth0 = async () => {
  auth0Client = await createAuth0Client(auth0Config);
  return auth0Client;
};

export const login = async () => {
  try {
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin + '/home.html'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await auth0Client.logout({
      logoutParams: {
        returnTo: window.location.origin + '/login.html'
      }
    });
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) {
      return null;
    }
    return await auth0Client.getUser();
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

export const getToken = async () => {
  try {
    return await auth0Client.getTokenSilently();
  } catch (error) {
    console.error('Get token error:', error);
    throw error;
  }
};