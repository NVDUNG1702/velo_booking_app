export const isValidUrl = (url: string | undefined | null) => {
    if (!url || typeof url !== 'string') return false;
    try {
      return Boolean(new URL(url));
    } catch (error) {
      return false;
    }
  };