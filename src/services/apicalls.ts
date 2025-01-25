import axios from "axios";

async function axiosPost(url: string, body: object) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await axios.post(url, config, body);
    return response.data;
  } catch (error: any) {
    // console.error(error);
    return error;
  }
}

async function axiosGet(url: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await axios.get(url, config);
    return response.data;
  } catch (error: any) {
    return error;
  }
}

async function axiosDelete(url: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await axios.delete(url, config);
    return response.data;
  } catch (error: any) {
    // console.error(error);
    return error;
  }
}

export { axiosPost, axiosGet, axiosDelete };
