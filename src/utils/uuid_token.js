import { v4 as uuidv4 } from 'uuid'
// 获取uuid_token,先要生成uuid_token，再存储起来，要保证每次获取的uuid_token不能变
export const getUUID = () => {
    // 本地存储uuidtoken
    let uuid_token = localStorage.getItem('uuidtoken')
    if (!uuid_token) {
        uuid_token = uuidv4()
        // 本地存储
        localStorage.setItem('uuidtoken',uuid_token)
    }
    return uuid_token
}