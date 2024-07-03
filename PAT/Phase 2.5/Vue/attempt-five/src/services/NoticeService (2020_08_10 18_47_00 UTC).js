import axios from 'axios';

export default {
  async getPending() {
    let res = await axios.get("http://localhost:3000/api/pending");
    return res.data;
  }
}
