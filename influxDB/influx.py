import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS

bucket = "storage"
org = "youtube"
token = "pm1wQ2zfwhbzs3xyHsmrU0Lr_YUmWBi6TgDbNHKaTPuKMdpuOa2LvNz8kMF2OcLRkZxisquPnXDMVKzs6dRtbg=="
# Store the URL of your InfluxDB instance
url="http://localhost:8086"

client = influxdb_client.InfluxDBClient(
    url=url,
    token=token,
    org=org
)

# Write script
write_api = client.write_api(write_options=SYNCHRONOUS)
p = influxdb_client.Point("my_measurement").tag("location", "Prague").field("temperature", 25.3)
write_api.write(bucket=bucket, org=org, record=p)

# Query script
query_api = client.query_api()
query = 'from(bucket:"storage")\
|> range(start: -10m)\
|> filter(fn:(r) => r._measurement == "my_measurement")\
|> filter(fn:(r) => r.location == "Prague")\
|> filter(fn:(r) => r._field == "temperature")'
result = query_api.query(org=org, query=query)
results = []
for table in result:
    for record in table.records:
        results.append((record.get_field(), record.get_value()))

print(results)