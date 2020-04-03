import moment from 'moment';
class tools{
    date2week(date){
        let  weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        let myweek=new Date(date).getDay();
        if(moment().format('YYYY-MM-DD')==moment(date).format('YYYY-MM-DD')){
            return "今天";
        }
        else {
            return weekArray[myweek]
        }
    }
}
export default tools;