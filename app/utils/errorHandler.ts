import axios from 'axios';

export const handleAxiosError = (error: any): never => {
  if (axios.isAxiosError(error) && error.response) {
    console.error('Server responded with an error:', error.response.data);
    throw new Error(error.response.data.message || 'Operation failed.');
  } else if (axios.isAxiosError(error) && error.request) {
    console.error('No response received from server:', error.request);
    throw new Error('Network error: No response received from the server. Please check your connection.');
  } else {
    const err = error as Error;
    console.error('Error during request:', err.message);
    throw new Error('Unexpected error: ' + err.message);
  }
};
