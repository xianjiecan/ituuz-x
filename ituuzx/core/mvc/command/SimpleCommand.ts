/**
 * 命令基类
 * @author ituuz
 */
import BaseCommand from "../base/BaseCommand";
import BaseModel from "../base/BaseModel";
import {Facade} from "../Facade";
import CommandManager from "../manager/CommandManager";
import NotificationManager from "../manager/NotificationManager";

export default abstract class SimpleCommand extends BaseCommand {

    /**
     * 执行命令接口
     * @param {Object} body 命令参数
     */
    public abstract execute(body?: any): void;

    /**
     * 撤销命令接口
     * @param {Object} body 命令参数
     */
    public abstract undo(body?: any): void;

    /**
     * 获取model对象
     * @param {{new (): BaseModel}} model
     */
    public getModel<T extends BaseModel>(model: new () => T): T {
        return Facade.getInstance().getModel(model);
    }

    /**
     * 执行命令
     * @param {{new (): BaseCommand}} command 命令对象
     * @param {Object} body 命令参数
     */
    public sendCmd(command: new () => BaseCommand, body?: any): void {
        CommandManager.getInstance().__executeCommand__(command, body);
    }

    /**
     * 撤销命令
     * @param {{new (): BaseCommand}} command 命令对象
     * @param {Object} body 命令参数
     */
    public undoCmd(command: new () => BaseCommand, body?: any): void {
        Facade.getInstance().__undoCommand__(command, body);
    }

    /**
     * 发送消息通知, 框架使用，外部不得调用。
     * @param {string} noti 通知key值
     * @param {Object} body 消息传递的参数
     * @private
     */
    public sendNoti(noti: string | number, body?: any): void {
        NotificationManager.getInstance().__sendNotification__(noti, body);
    }
}
