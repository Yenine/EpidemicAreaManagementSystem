import axios from 'axios';

class Users {
    static all() {
        return axios.post('/getApplyEquipment',JSON.stringify({adminID:111})).then(response => {
            console.log(response);
            let res=response.data;
            if(res.result=='0'){
                console.log(res.result);
            }
            if(res.result=='-2'){
                console.log(res.result);
            }
            if(res.result=='1001'){
                console.log(res.result);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export default Users;