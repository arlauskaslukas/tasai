import AxiosClient from "../utils/AxiosClient";

export default class DataFetchService {
  constructor() {
    this.apiBaseUrl = "http://127.0.0.1:8000/api";
  }
  async getTimetables() {
    const res = await AxiosClient.get(this.apiBaseUrl + "/course_timetables");
    return res.data;
  }
  async getCourseTopics(id) {
    const res = await AxiosClient.get(
      this.apiBaseUrl + `/courses/${id}/topics`
    );
    return res.data.topics;
  }
  async getTimetableiCalFileURI(id) {
    let res = await AxiosClient.get(
      this.apiBaseUrl + `/export_timetable/${id}`
    );
    if (res.data.response === "ok") return res.data.uri;
    else return null;
  }
  async getCourseTimetable(id) {
    let res = await AxiosClient.get(
      this.apiBaseUrl + `/course_timetable/${id}`
    );
    return res.data;
  }
  async generateANNModel(optimizer, loss, metrics, layers) {
    let res = await AxiosClient.post(this.apiBaseUrl + "/generate_model", {
      optimizer: optimizer,
      loss: loss,
      metrics: metrics,
      layers: layers,
    });
    console.log(res.data);
    return res.data;
  }
  async saveANNModel(title, optimizer, loss, metrics, layers) {
    let res = await AxiosClient.post(this.apiBaseUrl + "/save_model", {
      optimizer: optimizer,
      loss: loss,
      metrics: metrics,
      layers: layers,
      title: title,
      user_id: 1,
    });
    console.log(res);
    return res.data;
  }
  async checkIfUserParticipated(topic_id) {
    let res = await AxiosClient.post(
      this.apiBaseUrl + "/checkattendancestatus",
      {
        topic_id: topic_id,
      }
    );
    console.log(res.data.message);
    return res.data.message;
  }
}
