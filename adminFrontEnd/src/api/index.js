import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
export const fetchSuppliesData = query => {
    return request({
        url: './suppliesData.json',
        method: 'get',
        params: query
    });
};
export const fetchApplyData = query => {
    return request({
        url: './applyData.json',
        method: 'get',
        params: query
    });
};
export const fetchSegregationData = query => {
    return request({
        url: './segregationData.json',
        method: 'get',
        params: query
    });
};

export const fetchResidentData = query => {
    axios.post('',{
        name:query.name,
        position:query.position,
        number:query.number
    },{
        responseData:"json"
    }).then((res)=>{
        return res;
    })
    // return request({
    //     url: './residentData.json',
    //     method: 'get',
    //     params: query
    // });
};
export const fetchAnnounceData = query => {
    return axios.get('/announcementData.json').data
    // return request({
    //     url: './announcementData.json',
    //     method: 'get',
    //     params: query
    // });
};
export const fetchHealthData = query => {
    return request({
        url: './healthData.json',
        method: 'get',
        params: query
    });
};
export const fetchData1 = query => {
    return request({
        url: './table1.json',
        method: 'get',
        params: query
    });
};
