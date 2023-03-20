

const { InfluxDB, Point } = require('@influxdata/influxdb-client');

/** Environment variables **/
const url = 'http://localhost:8086';
const token = "2Tg8hyqla_kX02IsL-tPqBg-dTZl9YCiDGKWBS1S6Bm9Y0ci7Gpc4FZfgsjbnkCErH-oU2q9kJy3bDjgiPZ9Lg==";
const org = "new";
const bucket = "storageYoutube";

const influxDB = new InfluxDB({ url, token })
const queryApi = influxDB.getQueryApi(org)

const fluxQuery = `from(bucket:"storageYoutube") |> range(start: 0) |> filter(fn: (r) => r._measurement == "pressure")`


const myQuery = async () => {
    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values)
      console.log(
        `${o._time} ${o._measurement} (${o.sensor_id}): ${o._field}=${o._value}`
      )
    }
  }
  
  /** Execute a query and receive line table metadata and rows. */
  myQuery()
  