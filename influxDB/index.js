
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

/** Environment variables **/
const url = 'http://localhost:8086';
const token = "2Tg8hyqla_kX02IsL-tPqBg-dTZl9YCiDGKWBS1S6Bm9Y0ci7Gpc4FZfgsjbnkCErH-oU2q9kJy3bDjgiPZ9Lg==";
const org = "new";
const bucket = "storageYoutube";

const influxDB = new InfluxDB({ url, token })

const writeApi = influxDB.getWriteApi(org, bucket)

const point1 = new Point('temperature')
  .tag('sensor_id', 'TLM01')
  .floatField('value', 24.0)
console.log(` ${point1}`)

const point2 = new Point('pressure')
  .tag('sensor_id', 'P01')
  .floatField('value', 1000)
console.log(` ${point2}`)

writeApi.writePoint(point1)
writeApi.writePoint(point2)


/**
 * Flush pending writes and close writeApi.
 **/
writeApi.close().then(() => {
  console.log('WRITE FINISHED')
})


