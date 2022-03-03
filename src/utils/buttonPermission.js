import store from '../store/index'

export function buttonPermission(permission){
    //console.log('permission',permission)
    const button = store.getters['app/buttonPermission'];
    return button.indexOf(permission) != -1
}