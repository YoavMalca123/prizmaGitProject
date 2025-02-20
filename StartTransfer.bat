@echo off
REM Get the current directory where the script is located
set SCRIPT_DIR=%CD%

REM Step 1: Start npm in the first directory
cd "%SCRIPT_DIR%\yoavproject"
start "yoavproject" cmd /k "title yoavproject && npm start"

REM Step 2: Run Docker command to start Kafka broker
cd "%SCRIPT_DIR%"
docker run -d -v "%SCRIPT_DIR%\kafkaStorage:/var/lib/kafka/data" -p 9092:9092 --name broker apache/kafka:latest

REM Step 3: Open two CMDs named cmd1 and cmd2 and execute Kafka shell commands
start "cmd1" cmd /k "title cmd1 && docker exec --workdir /opt/kafka/bin/ -it broker sh"
start "cmd2" cmd /k "title cmd2 && docker exec --workdir /opt/kafka/bin/ -it broker sh"

REM Pause to ensure Kafka broker starts properly before creating topics
timeout /t 10 > nul

REM Step 4: In cmd1, create Kafka topics
start "cmd1" cmd /k "title cmd1 && docker exec --workdir /opt/kafka/bin/ -it broker sh -c './kafka-topics.sh --bootstrap-server localhost:9092 --create --topic test-topic1 && ./kafka-topics.sh --bootstrap-server localhost:9092 --create --topic test-topic2'"

REM Step 5: Start Kafka consumers in cmd1 and cmd2
start "cmd1" cmd /k "title cmd1 && docker exec --workdir /opt/kafka/bin/ -it broker sh -c './kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test-topic1 --from-beginning'"
start "cmd2" cmd /k "title cmd2 && docker exec --workdir /opt/kafka/bin/ -it broker sh -c './kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test-topic2 --from-beginning'"

timeout /t 10 > nul

REM Step 6: Start Kafka feeder
cd "%SCRIPT_DIR%\kafkaFeeder"
start "kafkaFeeder" cmd /k "title kafkaFeeder && npm start"

timeout /t 10 > nul

REM Step 7: Create a third CMD named cmd3 and run Redis
start "cmd3" cmd /k "title cmd3 && docker run --name redis -p 6379:6379 -d redis"

REM Step 8: Start Kafka to Redis feeder
cd "%SCRIPT_DIR%\kafka-redis-feeder"
start "kafkaRedisFeeder" cmd /k "title kafkaRedisFeeder && npm start"

REM Step 9: Start GraphQL Redis server
cd "%SCRIPT_DIR%\graphql-redis-server"
start "graphqlServer" cmd /k "title graphqlServer && npx ts-node-dev src/index.ts"
