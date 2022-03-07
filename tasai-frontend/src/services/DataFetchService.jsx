import AxiosClient from "../utils/AxiosClient";

export default class DataFetchService {
    constructor()
    {
        this.apiBaseUrl = "http://127.0.0.1:8000/api";
    }
    async getTimetables()
    {
        const res = await AxiosClient.get(this.apiBaseUrl+"/course_timetables");
        return res.data;
    }
    async getCourseTopics(id)
    {
        const res = await AxiosClient.get(this.apiBaseUrl+`/courses/${id}/topics`);
        return res.data.topics;
    }
    async getTimetableiCalFileURI(id)
    {
        let res = await AxiosClient.get(this.apiBaseUrl+`/export_timetable/${id}`);
        if(res.data.response==="ok") return res.data.uri;
        else return null;
    }
    async getCourseTimetable(id){
        console.log("lol");
        let res = await AxiosClient.get(this.apiBaseUrl+`/course_timetable/${id}`);
        return res.data;
    }

}