export const fetchEvents = async () => {
    try {
      const response = await fetch("/data.json");
      return await response.json();
    } catch (error) {
      throw new Error("Error fetching events",error);
    }
  };
  