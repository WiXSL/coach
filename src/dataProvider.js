//import qs from 'qs';
//import {fetchUtils} from 'react-admin';
import jsonServerProvider from "ra-data-json-server";

const myId = 'id';
const dbProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const getData = serverData =>
  serverData.map(record => {
      const { [myId]: id, ...restRecord } = record;

      return { id, ...restRecord };
  });

/*const getSubmitData = data => {
    const formData = new FormData();

    Object.keys(data).forEach(field => {
        const _data = data[field];
        Array.isArray(_data) ?
          _data.forEach((file, index) => {
              const name = _data.length === 1 ? field : field + index;
              formData.append(name, file?.rawFile ? file.rawFile : file);
          }) :
          formData.append(field, _data);
    });

    return formData;
};*/

const dataProvider = {
    getOne: (resource, params) => {
        return dbProvider.getOne(resource, params)
              .then(({data}) => ({data: {id: params.data.id, ...data}}));
    },
    getList: (resource, params) => {
        return dbProvider.getList(resource, params)
              .then(({data, total}) => {
                  return ({data: getData(data), total});
              });
    },
    getMany: (resource, params) => {
        return dbProvider.getMany(resource, params)
               .then(({data, total}) => ({data: getData(data), total}));
    },
    getManyReference: (resource, params) => {
        return dbProvider.getManyReference(resource, params)
               .then(({data, total}) => ({data: getData(data), total}));
    },
    create: (resource, params) => {
        /*const {fetchJson} = fetchUtils;
        return fetchJson(API_URL, {
            method: 'POST',
            body: getSubmitData(params.data),
            credentials: 'include'
        });*/

        return dbProvider.create(resource, params)
               .then(() => ({data: {id: params.data.id, ...params.data}}));
    },
    update: (resource, params) => {
        /*const {fetchJson} = fetchUtils;
        return fetchJson(API_URL, {
            method: 'POST',
            body: getSubmitData(params.data),
            credentials: 'include'
        });*/

        return dbProvider.update(resource, params)
               .then(() => ({data: {id: params.data.id, ...params.data}}));
    },
    updateMany: (resource, params) => {
        return dbProvider.updateMany(resource, params)
               .then(({data, total}) => ({data, total}));
    },
    delete: (resource, params) => {
        return dbProvider.deleteMany(resource, params)
               .then(() => ({data: {id: params.data.id, ...params.data}}));
    },
    deleteMany: (resource, params) => {
        return dbProvider.deleteMany(resource, params)
               .then(({data, total}) => ({data, total}));
    }
};

//export default cacheDataProviderProxy(dataProvider, 60 * 60 * 1000);
export default dataProvider;
