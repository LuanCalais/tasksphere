export const formatRoute = (route: string) => {
  if (route) {
    return route.startsWith('/') ? route : `/${route}`;
  }
  return route;
};
