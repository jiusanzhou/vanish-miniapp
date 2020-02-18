// app storage
import { observable, action, computed } from 'mobx'

const mockApps =  [
    { name: 'checkin', icon: "time", title: "打卡签到" },
    { name: 'debugger', icon: "view", title: "JS调试" },
]

export class AppStore {
    @observable isLoading = false
    // we store app at here with id
    @observable appsRegistry = observable.map()

    @computed get apps() {
        // FIXME:
        return Array.from(this.appsRegistry.values())
    }

    @action loadApps() {
        this.isLoading = true

        this.appsRegistry.clear()

        // loads apps from server
        // store app at here or we need to extact some things like settings and routers?

        // store in registry, if then need call action
        mockApps.forEach(item => this.appsRegistry.set(item.name, {id: item.name, text: item.title, ...item}))

        this.isLoading = false
    }
}

export default new AppStore()