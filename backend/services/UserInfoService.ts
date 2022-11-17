/**
 * todo: all
 */

import prisma from "../prisma"
import {User, UserInfo} from "@prisma/client"

export default class UserInfoService{
    public static async getUserInfoByUserId(user_id: number): Promise<UserInfo> {
        const userInfo = await prisma.userInfo.findUnique({
            where: {
                user_id: user_id,
            }
        });
        if (userInfo !== null){
            return userInfo;
        }
        return await prisma.userInfo.create({
            data: {
                user_id: user_id,
            }
        })
    }

    public static async setUserInfo(user_id : number, data : object): Promise<UserInfo>{
        if (await this.getUserInfoByUserId(user_id) !== null){
            return await prisma.userInfo.update({
                where: {
                    user_id: user_id,
                },
                data: data
            })
        }
        else {
            return await prisma.userInfo.create({
                data: {
                    user_id: user_id,
                    ...data,
                }
            })
        }
    }
}