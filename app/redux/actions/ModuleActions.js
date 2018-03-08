import { asyncFuncCreator } from '../utils';

export function index(key) {
  return asyncFuncCreator({
    constant: 'MODULE_INDEX',
    promise: (client) => client.request({ url: '/project/' + key + '/module' })
  });
}

export function create(key, values) {
  return asyncFuncCreator({
    constant: 'MODULE_CREATE',
    promise: (client) => client.request({ url: '/project/' + key + '/module', method: 'post', data: values })
  });
}

export function update(key, values) {
  return asyncFuncCreator({
    constant: 'MODULE_UPDATE',
    promise: (client) => client.request({ url: '/project/' + key + '/module/' + values.id, method: 'put', data: values })
  });
}

export function select(id) {
  return { type: 'MODULE_SELECT', id: id };
}

export function del(key, id) {
  return asyncFuncCreator({
    constant: 'MODULE_DELETE',
    id,
    promise: (client) => client.request({ url: '/project/' + key + '/module/' + id, method: 'delete' })
  });
}

export function setSort(key, values) {
  return asyncFuncCreator({
    constant: 'MODULE_SET_SORT',
    promise: (client) => client.request({ url: '/project/' + key + '/module/batch', method: 'post', data: values })
  });
}
