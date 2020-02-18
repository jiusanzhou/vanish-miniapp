import React from "react"

import { Box, Grid, Flex, useToast, Button, Text } from "@chakra-ui/core"
import { TimePicker, DatePicker, TimePrecision } from "@blueprintjs/datetime"

import { LocaleUtils } from "react-day-picker"
import "moment/locale/zh-cn"

class CheckinApp extends React.Component {
    constructor() {
        super()
        
        // this.toaster = useToast()
        let date = new Date()
        // let user = jsVanish.getVanishUserInfo()
        // let deviceid = jsVanish.getDeviceUUID()

        this.state = {
            date, // 日期
            email: null,
            name: null,
            location: {
                idx: 'W',
                address: '同顺街18号--同花顺', // 新大楼
                longitude: 120.046353,
                latitude: 30.292516,
            }, // 地点
            checkinTime: date.getTime(), // 时间
            checkoutTime: date.getTime(), // 时间
        }
    }

    componentWillMount() {
        if (window.jsVanish) {
            try {
                // 加载用户信息
                let d = window.jsVanish.getVanishUserInfo()
                let user = d?JSON.parse(d):null
                this.setState({
                    name: user.ClientName,
                    email: user.ClientEmail,
                    device_id: window.jsVanish.getDeviceUUID(),
                })
            } catch(e) {}
        }

        // 加载当天的信息
        this.loadTodayInfo()
    }

    checkIn(type) {
        let { date, email, name, device_id, location: { longitude, latitude, address, idx } } = this.state
        if (!email) {
            alert("未获取到用户信息")
            return
        }
        checkIn({
            date, email, name, type,
            longitude, latitude,
            device_id,
            clock_addr: address,
            clock_addr_num: idx,
        }).then((res) => {
            console.log(res)
        })
    }

    loadTodayInfo() {
        let { email, name } = this.state
        if (!email) {
            alert("未获取到用户信息")
            return
        }
        // 查询记录
        queryCheckIn({
            email,
            date: this.state.date.toISOString().split("T")[0], // 字符串
        }).then((res) => {
            console.log(res)
        })
    }

    onDateClick(date) {
        this.setState({ date })
    }

    render() {
        return <Grid templateRows="repeat(3, 1fr)" gap={6}>
            {/* 用户信息 */}
            <Flex justify="center">
                <DatePicker onChange={this.onDateClick.bind(this)} localeUtils={LocaleUtils} locale="zh-cn" value={this.state.date} />
            </Flex>
            <Flex justify="center" align="center">
                <Text>{this.state.location.address}</Text>
            </Flex>
            {this.state.email?<Flex justify="space-between" align="center">
                <CheckinItem label="上班" onClick={this.checkIn.bind(this, 1)} />
                <CheckinItem label="下班" onClick={this.checkIn.bind(this, 2)} />
            </Flex>:null}
        </Grid>
    }
}

export default CheckinApp

// 未打 "" 卡，立即 "" 打卡
// 过去的时间
const CheckinItem = ({ label, disable, checkTime, onClick }) => {
    let done = checkTime?true:false
    return <Flex direction="column">
        {done?<TimePicker value={checkTime} precision={TimePrecision.SECOND} />
        :<Text>未打卡</Text>}
        <Button onClick={onClick}>{done?"已":"立即"}打卡{label}</Button>
    </Flex>
}





















// ============================== //

const serialize = (obj, prefix) => {
    let str = [], p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&")
  }

const apiHost = [118,97,110,105,115,104,97,112,112,46,49,48,106,113,107,97,46,99,111,109,46,99,110].map(i=>String.fromCharCode(i)).join("")

const request = (url, data, method="POST") => {
    return fetch(`//${apiHost}/check/backend/index/${url}`, {
        method,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: serialize(data),
    }).then(res=>res.json()).then(({ status, payload })=>{
        return payload
    })
}

// 查询记录
const queryCheckIn = ({email, date}) => {
    return request("query", {email, date})
}

// 打卡签到
const checkIn = (res) => {
    return request("clock", res)
}

const PositionList = {
    W: {
      idx: 'W',
      address: '新大楼',
      longitude: 120.046353,
      latitude: 30.292516
    },
    C: {
      idx: 'C',
      address: '产业园',
      longitude: 120.125761,
      latitude: 30.291462
    },
    SZ: {
      idx: 'SZ',
      address: '深圳',
      longitude: 114.068731,
      latitude: 22.532294
    },
    SH: {
      idx: 'SH',
      address: '上海',
      longitude: 121.540262,
      latitude: 31.233591
    },
    BJ: {
      idx: 'BJ',
      address: '北京',
      longitude: 116.349700,
      latitude: 39.939160
    },
    NJ: {
      idx: 'NJ',
      address: '南京',
      longitude: 118.792199,
      latitude: 32.036075
    },
    GZ: {
      idx: 'GZ',
      address: '广州',
      longitude: 113.328924,
      latitude: 23.136686
    },
    WH: {
      idx: 'WH',
      address: '武汉',
      longitude: 114.273242,
      latitude: 30.580598
    }
  }