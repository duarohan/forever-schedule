const cron = require("node-cron");
const cronSchedule = require('./schedule');

let crons = []

exports.startCron =  async ()=>{
            const cronsList = cronSchedule.filter(el=>el.status === 'ACTIVE') 
            crons = cronsList.map(el=>{
                cron.id = el.id
                return cron.schedule(el.cronTab,async() =>{
                    const script = require(`./${el.script}.js`)
                    await script()
                },{
                    scheduled: false
              })
            })

            crons.map(el=>{
                el.start()
            })
}

exports.stopCron =  async ()=>{
    crons.map(el=>{
        el.destroy()
    })
}

exports.destroyCron =  async ()=>{
    crons.map(el=>{
        el.destroy()
    })
}

exports.restartCron =  async ()=>{
    this.destroyCron()
    this.startCron()
}
